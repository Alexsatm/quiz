const questions = [
    // 1
    {
        question: 'Самая большая страна по территории в мире?',
        answers: [
            {text: 'Канада', correct: false},
            {text: 'Россия', correct: true},
            {text: 'США', correct: false},
            {text: 'Китай', correct: false},
        ]
    },
    // 2
    {
        question: 'сколько всего в мире океанов?',
        answers: [
            {text: '4', correct: false},
            {text: '6', correct: false},
            {text: '5', correct: true},
            {text: '7', correct: false},
        ]
    },
    // 3
    {
        question: 'Самый большой материк?',
        answers: [
            {text: 'Евразия', correct: true},
            {text: 'Австралия', correct: false},
            {text: 'Африка', correct: false},
            {text: 'Антарктида', correct: false},
        ]
    },
    //4
    {
        question: 'Самое быстрое животное?',
        answers: [
            {text: 'Леопард', correct: false},
            {text: 'Гепард', correct: true},
            {text: 'Тигр', correct: false},
            {text: 'Лев', correct: false},
        ]
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')


let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Следующее';
    showQuestion();
}

const showQuestion = () => {
    //сбросить предыд. вопрос и ответ на него
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    //номер вопроса и текущий вопрос с текстом вопроса
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //текущие ответы
    //на эране в кнопке отобразится вопрос с номером вопросом и ответ на него

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.append(button);

        if (answer.correct) {
            button.dataset.correct =  answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

const resetState = () => {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

const selectAnswer = (e) => {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectBtn.classList.add('correct');
        score++
    } else {
        selectBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block'
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `Вы набрали ${score} из ${questions.length}!`;
    nextButton.innerHTML = 'Играть Снова';
    nextButton.style.display = 'block'
}

