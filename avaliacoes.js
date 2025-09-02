document.addEventListener('DOMContentLoaded', () => {
    const assessmentsList = document.getElementById('assessments-list');
    const assessments = JSON.parse(localStorage.getItem('assessments')) || [];

    if (assessments.length > 0) {
        assessments.forEach((assessment, index) => {
            const assessmentDiv = document.createElement('div');
            assessmentDiv.classList.add('assessment-item');
            assessmentDiv.innerHTML = `
                <h3>${assessment.title}</h3>
                <form id="assessment-form-${index}">
                    ${assessment.questions.map((q, qIndex) => `
                        <div class="question">
                            <p><strong>${qIndex + 1}. ${q.text}</strong></p>
                            ${q.options.map((opt, optIndex) => `
                                <label>
                                    <input type="radio" name="q${qIndex}" value="${optIndex}" required>
                                    ${opt}
                                </label>
                                <br>
                            `).join('')}
                        </div>
                    `).join('<br>')}
                    <br>
                    <button type="submit">Enviar Respostas</button>
                </form>
                <hr>
            `;
            assessmentsList.appendChild(assessmentDiv);

            const form = document.getElementById(`assessment-form-${index}`);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const studentName = prompt('Por favor, digite seu nome completo:');
                if (!studentName) {
                    alert('O nome é obrigatório para enviar a avaliação.');
                    return;
                }

                const answers = [];
                assessment.questions.forEach((q, qIndex) => {
                    const selectedOption = form.querySelector(`input[name="q${qIndex}"]:checked`);
                    if (selectedOption) {
                        answers.push(selectedOption.value);
                    }
                });

                const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
                const newSubmission = {
                    id: Date.now(),
                    assessmentTitle: assessment.title,
                    studentName: studentName,
                    answers: answers,
                    grade: null
                };

                submissions.push(newSubmission);
                localStorage.setItem('submissions', JSON.stringify(submissions));
                alert('Avaliação enviada com sucesso!');
                form.style.display = 'none';
            });
        });
    } else {
        assessmentsList.innerHTML = '<p>Nenhuma avaliação disponível no momento.</p>';
    }
});
