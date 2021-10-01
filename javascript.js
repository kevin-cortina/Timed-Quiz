var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var highScoreButton = document.getElementById('high-score')
var clearScoreButton = document.getElementById('clearscores')
var questionContainerEl = document.getElementById ('question-container')
var questionElement = document.getElementById('question')
var finalContainer = document.getElementById('final')
var mainContainer = document.getElementById('main')
var highScoresContainer = document.getElementById('highscores-container')
var submitButton = document.getElementById('submit-score')
var restartButton = document.getElementById('restart-button')
var startButtonsContainer = document.getElementById ('startButtons')
var answerButtonsEl = document.getElementById('answer-buttons')
var controlsButtonsEl = document.getElementById('controls')
var countDown = document.getElementById("countdown")
var timerClass = document.getElementsByClassName('timerClass')
var button1 = document.getElementsByClassName('btn')
var button2 = document.getElementsByClassName('btn correct')
var initials = document.getElementById('initials')
//added variables for timer
let scoreListEl = document.querySelector("score-list");
let scoreList = [];
let timeleft = 100
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})

//starts game
//hides start button after pressed
function startGame () {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random () - .5 )
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion ();
}

//randomizes the questions 
function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//shows the actual questions box?
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } else { 
          button.addEventListener('click', function () {
          timeleft = timeleft - 10 
        });
      }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

//resets questions at the end of quiz
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
  }

//adds the boxes of the answers to the webpage
function selectAnswer(e) {
	var selectedButton = e.target
	var correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsEl.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
	nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'restart'
    startButton.classList.remove('hide')
    highScoreButton.classList.remove('hide')
  }
}

//adds the button to tell whether the answer was right or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element)
	if (correct) {
    element.classList.add('correct')
    } else { 
    element.classList.add('wrong')
  }
}

//adds the answers to the inside of the the answer containers
function clearStatusClass(element) {
	element.classList.remove ('correct')
	element.classList.remove ('wrong')
}

// starting timer code
startButton.addEventListener("click", function function1() {
  var button3 = startButton.innerText 
  var downloadTimer = setInterval(function function2(){
      countDown.innerHTML = timeleft + 
      "&nbsp"+"seconds remaining";
      //countdown timer code
      timeleft -= 1;
        if(timeleft <= 0) {
        clearInterval(downloadTimer);
        countDown.innerHTML = "Time is up!"
        }
      //pause timer code
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
        } else {
          answerButtonsEl.addEventListener('click', function stopTimerFunc() {
            clearInterval(downloadTimer);
            var timeleft1 = timeleft + 1;
            countDown.innerText = timeleft1 +" seconds remaining";
            localStorage.setItem('timeleft1', JSON.stringify(timeleft1));
          })
        }
    }, 1000);
  //reset timer
  if (button3 = 'restart') {
      startButton.addEventListener('click', function restartFunc() {
        timeleft = 100
        highScoreButton.classList.add('hide')
      })
  };
});

//highscores-submit

highScoreButton.addEventListener("click", function function1() {
  highScoreButton.classList.add('hide')
  mainContainer.classList.add('hide')
  finalContainer.classList.remove('hide')
  startButtonsContainer.classList.add('hide')
  // startButton.classList.add('hide')
  console.log('1')

  //retrieve the object from storage
let retrievedObject = localStorage.getItem('timeleft1');
console.log('retrievedObject:', JSON.parse(retrievedObject));

//final score text
document.getElementById('score').innerText = JSON.parse(retrievedObject);

submitButton.addEventListener("click", function (e) {
  // initials.addEventListener('submit', function (e) {
  //   prevent the normal submission of the form
  e.preventDefault();
  var initials2 = document.getElementById('initials').value;
  //2nd part of submit
    var initialsInput = initials2;
    //test to make sure intials are working 
    //console.log(initialsInput); 
    localStorage.setItem('initialsInput', JSON.stringify(initialsInput));
    //code for intials usage here for checking
    let retrievedObject2 = localStorage.getItem('initialsInput');
    console.log('retrievedObject2:', JSON.parse(retrievedObject2));
  })
});

submitButton.addEventListener("click", function () {
  console.log('2')
  finalContainer.classList.add('hide')
  highScoresContainer.classList.remove('hide')
});


// });
//code for intials usage
// let retrievedObject2 = localStorage.getItem('initialsInput');
// console.log('retrievedObject2:', JSON.parse(retrievedObject2));

//////////////////////////////////////////////////////////////////////////

//highscores-screen
restartButton.addEventListener("click", function function1() {
console.log(5)
});

function addScore(event) {
  let retrievedObject = localStorage.getItem('timeleft1');
  let retrievedObject2 = localStorage.getItem('initialsInput');

  let init = retrievedObject2.value.toUpperCase();
  let timeScore = retrievedObject.value;
  scoreList.push({init, timeScore});

// sort scores
scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

scoreListEl.innerHTML="";
for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].init}: ${scoreList[i].timeScore}`;
    scoreListEl.append(li);
}

// Add to local storage
storeScores();
displayScores();
}

//////////////////////////////////////////////////////////////////////////

// clear scores
function clearScores() {
  // localStorage.clear();
  // scoreListEl.innerHTML="";
  console.log(6)
}

clearScoreButton.addEventListener("click", clearScores);

//Quiz Questions
var questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
          { text: '4', correct: true },
          { text: '22', correct: false },
          { text: '8', correct: false },
          { text: '44', correct: false }
        ]
      },
      {
        question: 'What is 5 + 8?',
        answers: [
          { text: '15', correct: false },
          { text: '19', correct: false },
          { text: '13', correct: true },
          { text: '21', correct: false }
        ]
      },
      {
        question: 'What is 1+1?',
        answers: [
          { text: '3', correct: false },
          { text: '2', correct: true },
          { text: '3', correct: false },
          { text: '3', correct: false }
        ]
      },
      {
        question: 'What is 4 * 2?',
        answers: [
          { text: '6', correct: false },
          { text: '8', correct: true },
          { text: '12', correct: false },
          { text: '85', correct: false }
        ]
      }
    ]

