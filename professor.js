document.addEventListener('DOMContentLoaded', () => {
    const materialsForm = document.getElementById('materials-form');
    const assessmentForm = document.getElementById('assessment-form');
    const addQuestionBtn = document.getElementById('add-question');
    const questionsContainer = document.getElementById('questions-container');
    const submissionsContainer = document.getElementById('submissions-container');

    let questionCount = 0;

    // Carregar materiais e avaliações do localStorage
    const materials = JSON.parse(localStorage.getItem('materials')) || [];
    const assessments = JSON.parse(localStorage.getItem('assessments')) || [];

    // Salvar material de aula
    materialsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('material-title').value;
        const content = document.getElementById('material-content').value;

        materials.push({ title, content });
        localStorage.setItem('materials', JSON.stringify(materials));
        alert('Material salvo com sucesso!');
        materialsForm.reset();
    });

    // Adicionar nova pergunta ao formulário de avaliação
    addQuestionBtn.addEventListener('click', () => {
        questionCount++;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <hr>
            <label for="q${questionCount}-text">Texto da Pergunta ${questionCount}:</label>
            <input type="text" id="q${questionCount}-text" required>
            <br><br>
            <label>Opções de Resposta:</label>
            <br>
            <input type="text" name="q${questionCount}-options" placeholder="Opção 1" required>
            <input type="text" name="q${questionCount}-options" placeholder="Opção 2" required>
            <input type="text" name="q${questionCount}-options" placeholder="Opção 3" required>
            <input type="text" name="q${questionCount}-options" placeholder="Opção 4" required>
            <br><br>
            <label for="q${questionCount}-correct">Resposta Correta (índice da opção, de 0 a 3):</label>
            <input type="number" id="q${questionCount}-correct" min="0" max="3" required>
            <br><br>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    // Salvar avaliação
    assessmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('assessment-title').value;
        const questions = [];
        const questionElements = document.querySelectorAll('.question');

        questionElements.forEach((q, index) => {
            const text = q.querySelector(`#q${index + 1}-text`).value;
            const options = Array.from(q.querySelectorAll(`input[name="q${index + 1}-options"]`)).map(opt => opt.value);
            const correct = q.querySelector(`#q${index + 1}-correct`).value;
            questions.push({ text, options, correct });
        });

        assessments.push({ title, questions });
        localStorage.setItem('assessments', JSON.stringify(assessments));
        alert('Avaliação salva com sucesso!');
        assessmentForm.reset();
        questionsContainer.innerHTML = '';
        questionCount = 0;
    });

    // Carregar submissões para correção (simulação)
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    if (submissions.length > 0) {
        submissionsContainer.innerHTML = '<h3>Submissões Recebidas:</h3>';
        submissions.forEach(sub => {
            const subDiv = document.createElement('div');
            subDiv.innerHTML = `
                <h4>Avaliação: ${sub.assessmentTitle}</h4>
                <p>Aluno: ${sub.studentName}</p>
                <ul>
                    ${sub.answers.map((ans, i) => `<li>Pergunta ${i + 1}: ${ans}</li>`).join('')}
                </ul>
                <form class="grading-form" data-submission-id="${sub.id}">
                    <label for="grade-${sub.id}">Nota:</label>
                    <input type="number" id="grade-${sub.id}" min="0" max="10" step="0.1" required>
                    <button type="submit">Salvar Nota</button>
                </form>
                <hr>
            `;
            submissionsContainer.appendChild(subDiv);
        });
    } else {
        submissionsContainer.innerHTML = '<p>Nenhuma submissão para corrigir no momento.</p>';
    }
});
