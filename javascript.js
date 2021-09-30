var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById ('question-container')
var questionElement = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var countDown = document.getElementById("countdown")
var timerClass = document.getElementsByClassName('timerClass')
var button2 = document.getElementsByClassName('btn correct')
//added variables for timer

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
  let timeleft = 100
  var downloadTimer = setInterval(function function2(){
      countDown.innerHTML = timeleft + 
      "&nbsp"+"seconds remaining";
      //countdown timer code
      timeleft -= 1;
        if(timeleft <= 0) {
        clearInterval(downloadTimer);
        countDown.innerHTML = "Time is up!"
        startButton.innerText = 'restart'
        startButton.classList.remove('hide')
        }
      //pause timer code
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
        } else {
          clearInterval(downloadTimer)
          console.log(timeleft + 1);
          }
        }, 1000);
  //reset timer code
  if (startButton.innerText === 'restart') {
    console.log('this is targeting restart button')
    startButton.addEventListener('click', function () {
    clearInterval(downloadTimer);
    });
    }
  //working on penalty code  
  if (button2 = 'true') {
    element.classList.addEventListener('click', function () {
    console.log('right?');
    
     });
  }
    // button2.addEventListener('click', function () {
    // timeleft = timeleft - 10 
    // console.log('targeting wrong answers');
    // });
  })







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
        question: 'What is 5 + 8',
        answers: [
          { text: '15', correct: false },
          { text: '19', correct: false },
          { text: '13', correct: true },
          { text: '21', correct: false }
        ]
      },
      {
        question: 'Is web development fun?',
        answers: [
          { text: 'Kinda', correct: false },
          { text: 'YES!!!', correct: true },
          { text: 'Um no', correct: false },
          { text: 'IDK', correct: false }
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

