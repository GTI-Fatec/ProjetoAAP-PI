document.addEventListener('DOMContentLoaded', function () {
    const quizData = {
        marketing: {
            title: 'Quiz de Marketing',
            questions: [
                {
                    question: 'O que é Marketing?',
                    options: ['Vender produtos', 'Um conjunto de atividades que visam entender e atender às necessidades e desejos dos clientes', 'Fazer propaganda', 'Gerenciar as finanças da empresa'],
                    answer: 'Um conjunto de atividades que visam entender e atender às necessidades e desejos dos clientes'
                },
                {
                    question: 'Quais são os 4 Ps do Marketing?',
                    options: ['Produto, Preço, Praça e Promoção', 'Pessoas, Processos, Paixão e Performance', 'Planejamento, Produção, Publicidade e Pós-venda', 'Previsão, Pessoal, Pagamento e Pacote'],
                    answer: 'Produto, Preço, Praça e Promoção'
                }
            ]
        },
        'gestao-de-pessoas': {
            title: 'Quiz de Gestão de Pessoas',
            questions: [
                {
                    question: 'O que é Gestão de Pessoas?',
                    options: ['Contratar e demitir funcionários', 'Um conjunto de políticas e práticas para gerenciar o comportamento humano na organização', 'Pagar salários', 'Controlar o ponto dos funcionários'],
                    answer: 'Um conjunto de políticas e práticas para gerenciar o comportamento humano na organização'
                },
                {
                    question: 'Qual a importância do feedback na Gestão de Pessoas?',
                    options: ['Apenas para apontar erros', 'Para orientar e desenvolver os colaboradores', 'Não tem importância', 'Para constranger o funcionário'],
                    answer: 'Para orientar e desenvolver os colaboradores'
                }
            ]
        }
        // Adicione mais quizzes aqui para as outras matérias
    };

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');

    const quizContainer = document.getElementById('quiz-container');
    const quizTitle = document.getElementById('quiz-title');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');

    if (subject && quizData[subject]) {
        const currentQuiz = quizData[subject];
        quizTitle.textContent = currentQuiz.title;
        loadQuiz(currentQuiz.questions);
    } else {
        quizContainer.innerHTML = '<p>Quiz não encontrado. Por favor, selecione um quiz em uma das páginas de matéria.</p>';
        submitBtn.style.display = 'none';
    }

    function loadQuiz(questions) {
        let quizHTML = '';
        questions.forEach((q, index) => {
            quizHTML += `<div class="question">`;
            quizHTML += `<p>${index + 1}. ${q.question}</p>`;
            q.options.forEach(option => {
                quizHTML += `<label><input type="radio" name="question${index}" value="${option}"> ${option}</label><br>`;
            });
            quizHTML += `</div>`;
        });
        quizContainer.innerHTML = quizHTML;
    }

    submitBtn.addEventListener('click', function () {
        const questions = quizData[subject].questions;
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        resultsContainer.innerHTML = `<h3>Você acertou ${score} de ${questions.length} perguntas.</h3>`;
    });
});
