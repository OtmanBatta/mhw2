/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const URL_IMAGE_CHECKED = "./images/checked.png"
const URL_IMAGE_UNCHECKED = "./images/unchecked.png"

const Answers = document.querySelectorAll('.choice-grid div');
let CompletedQuiz = false;
const UserAnswers = [];

for (const answer of Answers) {
    answer.addEventListener('click', CheckAnswer);
}

function CheckAnswer(event) {
    if (!CompletedQuiz) {
        const element = event.currentTarget;
        if (element instanceof HTMLElement) {
            uncheckother(element);
            const img = element.querySelector('img.checkbox');
            element.style.backgroundColor = '#cfe3ff';
            element.style.opacity = 1;
            img.src = URL_IMAGE_CHECKED;
            AddAnswer(element);
            CheckQuizCompleted();
        }
    }
}

function uncheckother(element) {

    const OtherAnswer = document.querySelectorAll("[data-question-id=" + element.dataset.questionId + "]");

    for (const answer of OtherAnswer) {
        const img = answer.querySelector('img.checkbox');
        img.src = URL_IMAGE_UNCHECKED;
        if (answer instanceof HTMLElement) {
            answer.style.opacity = 0.6;
            answer.style.backgroundColor = '#f4f4f4';
        }
    }

    /*for (const answer of Answers) {
        if (element.dataset.questionId==answer.dataset.questionId ) {
            const img = answer.querySelector('img.checkbox');
            img.src = URL_IMAGE_UNCHECKED;
            if (answer instanceof HTMLElement) {
                answer.style.opacity = 0.6;
                answer.style.backgroundColor = '#f4f4f4';
            }
        }
    }*/
}

function AddAnswer(element) {
    switch (element.dataset.questionId) {
        case 'one':
            UserAnswers[0] = element.dataset.choiceId;
            break;
        case 'two':
            UserAnswers[1] = element.dataset.choiceId;
            break;
        case 'three':
            UserAnswers[2] = element.dataset.choiceId;
            break;
        default:
    }
}

function CheckQuizCompleted() {
    if (UserAnswers.length == 3 && AllAnswer()) {
        CompletedQuiz = true;
    }
}

function AllAnswer() {
    let AllAnswered = true;
    for (const risposta of UserAnswers) {
        if (risposta == undefined) {
            AllAnswered = false;
        }
    }
    return AllAnswered;
}