let questions = [
    {
        "question": "Wer ist der Eigentümer von TESLA ?",
        "answer_1": "Geroge W. Bush",
        "answer_2": "Recep Tayyip Erdogan",
        "answer_3": "Donald Trump",
        "answer_4": "Elon Musk",
        "right_answer": 4,
    },
    {
        "question": "Welcher Berg ist der höchste Berg der Welt?",
        "answer_1": "Mount Everest",
        "answer_2": "Kangchendzönga (Kangchenjunga)",
        "answer_3": "Lhotse",
        "answer_4": "K2 (chinesisch Qogir) ",
        "right_answer": 1,
    },
    {
        "question": "Wofür stehen die olympischen Ringe?",
        "answer_1": "Für die 5 Hauptspiele",
        "answer_2": "Für Spaß und Freude",
        "answer_3": "Für die 5 Kontinente",
        "answer_4": "Für die Welt",
        "right_answer": 3,
    },
    {
        "question": "Wie viele Bundesländer hat Deutschland?",
        "answer_1": "14",
        "answer_2": "16",
        "answer_3": "11",
        "answer_4": "19",
        "right_answer": 2,
    },
    {
        "question": "Welcher Planet ist der Sonne am nächsten?",
        "answer_1": "Jupiter",
        "answer_2": "Erde",
        "answer_3": "Saturn",
        "answer_4": "Merkur",
        "right_answer": 4,
    },
];
let rightCounter = 0; // damit können wir den Wert immer bei einer Bedingung um eins erhöhen.
let currentStart = 0; //damit wir erst immer den Array auswählen, wird hier einfach eine variable mit dem Wert 0 gespeichert. 

let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio ('audio/wrong.mp3');

function init() //sieht die Funktion, dass beim Laden der Webseite von hier gestartet wird wie ein Render. 
{
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestionAndAnswers();
}

function showQuestionAndAnswers()
{
    if (gameIsOver()) 
    {   
        showEndScreen();
    }
    else
    {   
        updateProgressBar();
        showNextQuestions();
    }
}

function answer(selection)
{   
    let question = questions[currentStart]; //da wir die hier auf die erste Array Feld zugreifen wollen, kopieren wir uns den bereits erstellten Code der den Wert 0 hat. 
    let selectedQuestionNumber = selection.slice(-1); // eine neue Variable erstellt. Hier wird die Nummer aus dem String genommen damit wir was zum vergleichen haben. z.B (3 == 3)?  
    let idOfRightAnswer = `answer_${question['right_answer']}`; //variable wird erstellt, damit der Wert sich variable verhält und nicht nur immer die 1 Nummer als richtig hat, fügt man erst den Namen der richtigen Name rein ohne die Nummer. Danach gibt man als variable die ${question['right_answer']} rein um nur die Zahl aus dem Array zu holen. 

    if (selectedQuestionNumber == question['right_answer'] ) // nachdem wir jetzt 2 Zahlen vergleichen können, wird das per IF abgefragt. in dem Fall das angeklickte Feld daraus der String und aus dem String die Nummer zum Schluss. Das wird mit dem aus array entnommene "right_Answer = 4" verglichen. 
        {
            document.getElementById(selection).classList.add('bg-success');
            rightCounter ++;
            AUDIO_SUCCESS.play();
    }else
        {
            document.getElementById(selection).classList.add('bg-danger');
            document.getElementById(idOfRightAnswer).classList.add('bg-success');
            AUDIO_WRONG.play();
        }
    document.getElementById('nextButton').disabled = false; // somit kann man ein Button erst aktivieren lassen, wenn z.b die Frage beantwortet wurde. 
}

function nxtQuestion()
{
    currentStart++; // Wert wird somit um 1 erhöht. Damit das nächste Array aufgerufen wird. 
    document.getElementById('nextButton').disabled = true; // somit kann man ein Button erst aktivieren lassen, wenn z.b die Frage beantwortet wurde.
    resetAnswerButtons();
    showQuestionAndAnswers();
}

function resetAnswerButtons()
{
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
}

function restartGame()
{
    rightCounter = 0; 
    currentStart = 0;
    document.getElementById('questionBody').style = "width: 500px; height: 550px; 'display: ' ";
    document.getElementById('endScreen').style = 'display: none';
    init();
}

function gameIsOver()
{
    return currentStart >= questions.length;
}

function showEndScreen()
{
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('allQuestionsEnd').innerHTML = questions.length;
    document.getElementById('rightAnswered').innerHTML = rightCounter;
}

function showNextQuestions()
{
    let question = questions[currentStart]; // neue variable wird erstellt und dem wird dann erst unser ArrayName zugewiesen und dann die variable die den Wert 0 hat. Damit wird immer auf das erste Array zugegriffen. 
    document.getElementById('currentQuestion').innerHTML = currentStart +1;
    document.getElementById('questionID').innerHTML = question['question']; //hier wird einmal der name vom Array und dann das Objekt innere ausgewählt. 
    document.getElementById('answer_1').innerHTML = question['answer_1'];  //hier wird einmal der name vom Array und dann das Objekt innere ausgewählt. 
    document.getElementById('answer_2').innerHTML = question['answer_2'];  //hier wird einmal der name vom Array und dann das Objekt innere ausgewählt. 
    document.getElementById('answer_3').innerHTML = question['answer_3'];  //hier wird einmal der name vom Array und dann das Objekt innere ausgewählt. 
    document.getElementById('answer_4').innerHTML = question['answer_4'];  //hier wird einmal der name vom Array und dann das Objekt innere ausgewählt. 
}

function updateProgressBar()
{
    let percent = (currentStart +1) / questions.length;
    percent = percent * 100;
    document.getElementById('percentCounter').innerHTML = `${percent}%`;
    document.getElementById('percentCounter').style.width = `${percent}%`;
}