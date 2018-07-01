//data object
var data = [
  {
    question: 'How many players are in a soccer team?',
    answers: [11, 9, 10, 12],
    correctAnswer: '11'
  },
  {
    question: 'How many teams are in the 2018 World Cup Tourament',
    answers: [36, 30, 32, 40],
    correctAnswer: '36'
  },
  {
    question: 'How many teams are in the 2018 World Cup Tourament',
    answers: ['Bale', 'Ronaldo', 'Messi', 'Neymar'],
    correctAnswer: 'Messi'
  }
];

var correctCounter = 0,
  wrongCounter = 0,
  unanswerCounter = 0,
  questions;

function timer() {
  var sec = 120;
  var timer = setInterval(function() {
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      displayResult(); //when time hit 0, run this function
    }
  }, 1000);
}

function createAnswersList(answersArray, questionIndex) {
  //display answers
  var answerList = $('<ul>');
  var item;
  var input = '';

  for (var answerItem in answersArray) {
    var choice = answersArray[answerItem];
    item = $('<li>');
    input = `<input type="radio" name="question-${parseInt(questionIndex) +
      1}" value="${choice}">`;
    input += choice;
    item.append(input);
    answerList.append(item);
  }

  return answerList;
}

function createQuestionEle(quiz) {
  var questionAnswersEle = $('<div>');

  for (var index in quiz) {
    //display questions
    var questionsEle = $('<div>').text(quiz[index].question);
    questionAnswersEle.append(questionsEle);

    //display answers
    var answerList = createAnswersList(quiz[index].answers, index);
    questionsEle.append(answerList);
  }

  return questionAnswersEle;
}

//display result when time ran out
function displayResult() {
  var questionNumber = 1; //Start with question number 1
  while (questionNumber <= data.length) {
    //Run this up to questionNumber 10
    var correctChoice = data[questionNumber - 1].correctAnswer; //Get correct answer
    //find all radios within a question (should have 4 radios)
    var radioInputs = $(`input[name="question-${questionNumber}"]`);
    var radioNotchecked = 0;

    //loop through radios too see if checked
    for (var i = 0; i < radioInputs.length; i++) {
      if (radioInputs[i].checked) {
        //check to see if the answered is correct
        var userChoice = radioInputs[i].value;
        if (userChoice === correctChoice) {
          correctCounter++;
        } else {
          wrongCounter++;
        }
      } else {
        radioNotchecked++;
        if (radioNotchecked === 4) {
          unanswerCounter++;
        }
      }
    }
    questionNumber++;
  }

  console.log(correctCounter);
  console.log(wrongCounter);
  console.log(unanswerCounter);
}

//When Start button is clicked, display all questions
$('#start').on('click', function() {
  //start timer. When timer hit 0, displayResult function will run
  timer();

  questions = $('#questions');
  questions.removeClass(); //remove the class 'hide' to show the questions
  $(this).remove(); //remove the start button

  var DoneButton = $('<button id="done">Done</button>'); //Add Done button
  $('#button').append(DoneButton); //Display the Done button

  //display the questions
  var displayQuestions = createQuestionEle(data);
  questions.append(displayQuestions);

  $('#done').on('click', displayResult);
});
