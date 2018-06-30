//data object
var data = [
  {
    question: 'How many players are in a soccer team?',
    answers: [11, 9, 10, 12],
    correctAnswer: 11
  },
  {
    question: 'How many teams are in the 2018 World Cup Tourament',
    answers: [36, 30, 32, 40],
    correctAnswer: 36
  },
  {
    question: 'How many teams are in the 2018 World Cup Tourament',
    answers: ['Bale', 'Ronaldo', 'Messi', 'Neymar'],
    correctAnswer: 'Messi'
  }
];

var questions;
var userChoice = []; //array containing user's choices
var correctAnswer = 0;
var timerTracker = 0;

//Create 30 sec timer
function timer() {
  var sec = 30;
  var timer = setInterval(function() {
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function createAnswersList(answersArray) {
  //display answers
  var answerList = $('<ul>');
  var item;
  var input = '';

  for (var answerItem in answersArray) {
    var choice = answersArray[answerItem];
    item = $('<li>');
    input = '<input type="radio" name="answer">';
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
    var answerList = createAnswersList(quiz[index].answers);
    questionAnswersEle.append(answerList);
  }

  return questionAnswersEle;
}

//When Start button is click
//display all questions
$('#start').on('click', function() {
  questions = $('#questions');

  questions.removeClass(); //remove the class 'hide' to show the questions

  $(this).remove(); //remove the start button

  var DoneButton = $('<button id="done">Done</button>'); //Add Done button
  $('#button').append(DoneButton);

  //display the questions
  var displayQuestions = createQuestionEle(data);
  questions.append(displayQuestions);

});
//each question should have answers as radio buttons
//start timer

//When Submit button is clicked, read all the selected answers
//push selected answers into userChoice array
//loop through userChoice array
//compare the correctAnswer of each index of the data object with each index of the user choice array
//if both indices are the same, add to correct answer variable

//If timer hits 0, stop the quiz
//read all the selected answers
//push selected answers into userChoice array
//loop through userChoice array
//compare the correctAnswer of each index of the data object with each index of the user choice array
//if both indices are the same, add to correct answer variable
