/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const URL_IMAGE_CHECKED = "./images/checked.png"
const URL_IMAGE_UNCHECKED = "./images/unchecked.png"

const Answers = document.querySelectorAll('.choice-grid div');
const RicoBTN = document.querySelector('.Ricomincia');
RicoBTN.addEventListener('click', Reset);
let CompletedQuiz = false;
let UserAnswers = [];
let name = [];

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
        ShowResult();
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

function Reset(event) {
    const parent = event.currentTarget.parentElement; 
    console.log(parent);
    if (parent instanceof HTMLElement) {
        parent.style.display="none";
    }
    UncheckALL();
    UserAnswers = [];
    CompletedQuiz = false;
}

function UncheckALL(){
    for (const answer of Answers) {
        const image = answer.querySelector("img.checkbox");
        image.src = URL_IMAGE_UNCHECKED;
        answer.style.opacity = 1;
        answer.style.backgroundColor = '#f4f4f4';
    }
}



function ShowResult() {
    const Result = document.querySelector(".Risultato")
    let vincitore = false;
    let personalita;

    for (let i=0; i < UserAnswers.length; i++) {
        for (let j = i + 1; j < UserAnswers.length; j++) {
            if (UserAnswers[i] == UserAnswers[j]) {
                vincitore = true;
                personalita = UserAnswers[i];
            }
        }
    }

    if (vincitore) {
        Result.querySelector("p4").innerHTML = RESULTS_MAP[personalita].title;
        Result.querySelector("h3").innerHTML = RESULTS_MAP[personalita].contents;
    } else {
        Result.querySelector("p4").innerHTML = RESULTS_MAP[UserAnswers[0]].title;
        Result.querySelector("h3").innerHTML = RESULTS_MAP[UserAnswers[0]].contents;
    }

    Result.style.display="flex";   
}

