document.addEventListener('DOMContentLoaded', () => {
    const gradesList = document.getElementById('grades-list');
    const studentName = prompt('Por favor, digite seu nome completo para ver suas notas:');

    if (!studentName) {
        gradesList.innerHTML = '<p>Você precisa digitar seu nome para ver suas notas.</p>';
        return;
    }

    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const studentSubmissions = submissions.filter(sub => sub.studentName.toLowerCase() === studentName.toLowerCase());

    if (studentSubmissions.length > 0) {
        gradesList.innerHTML = `<h3>Notas para ${studentName}:</h3>`;
        studentSubmissions.forEach(sub => {
            const gradeDiv = document.createElement('div');
            gradeDiv.classList.add('grade-item');
            const grade = localStorage.getItem(`grade-${sub.id}`);
            gradeDiv.innerHTML = `
                <h4>Avaliação: ${sub.assessmentTitle}</h4>
                <p><strong>Nota:</strong> ${grade ? grade : 'Aguardando correção'}</p>
                <hr>
            `;
            gradesList.appendChild(gradeDiv);
        });
    } else {
        gradesList.innerHTML = `<p>Nenhuma avaliação encontrada para ${studentName}.</p>`;
    }
});
