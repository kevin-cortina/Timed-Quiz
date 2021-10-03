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
var initialsScoreScreen = document.getElementById('intialsScore')
var timeScoreScreen= document.getElementById('timeScore')
var mainContent = document.getElementById('mainContents')
var message = document.getElementById('message')

//added variables for timer
let scoreListEl = document.getElementById("score-list")
let scoreList = [];
let timeleft = 100
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})

//starts game
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
            button.addEventListener('click', function () {
              message.innerText= ("Correct, Move on!!!") 
              nextButton.classList.remove('hide')
              answerButtonsEl.disabled = true
              //ending message of quiz
              if (shuffledQuestions.length > currentQuestionIndex + 1) {
              }  else {
                message.innerText = ('YOU ARE ALL DONE!!!')  
              }
        });
        } else { 
          button.addEventListener('click', function () {
          timeleft = timeleft - 10
          message.innerText = ('Wrong! -10 secs') 
          nextButton.classList.add('hide')
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

	} else {
		startButton.innerText = 'restart'
    startButton.classList.remove('hide') 
    highScoreButton.classList.remove('hide')
    nextButton.classList.add('hide')
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
        message.innerText = "YOU ARE ALL DONE!!!"
        startButton.classList.remove('hide')
        startButton.innerText = 'Restart'
        highScoreButton.classList.remove ('hide')
        questionContainerEl.classList.add('hide')
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
        message.innerText = ""
        questionContainerEl.classList.remove('hide')
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

  //retrieve the object from storage
  let timeLeftScore = localStorage.getItem('timeleft1');
  //final score text
  document.getElementById('score').innerText = JSON.parse(timeLeftScore);

//local storage functions
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    let initialsInput = initials.value
    localStorage.setItem('initials', JSON.stringify(initialsInput));
    let storedIntials = localStorage.getItem('initials');
    let initialJson = ('Initials', storedIntials.replace(/\"/g, ""));
    let scoreJson = ('Score', timeLeftScore);
    initialsScoreScreen.innerText = initialJson  
    timeScoreScreen.innerText = scoreJson  
    })
});

//button maintenance
submitButton.addEventListener("click", function () {
  finalContainer.classList.add('hide')
  highScoresContainer.classList.remove('hide')
});


//highscores-screen
restartButton.addEventListener("click", function () {
  startButton.classList.add('hide')
highScoresContainer.classList.add('hide')
mainContainer.classList.remove('hide')
resetState()
setNextQuestion()
timeleft = 100
highScoreButton.classList.add('hide')
location.reload(mainContent)
});

function clearScores() {
  localStorage.clear();
  location.reload(mainContent)
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

