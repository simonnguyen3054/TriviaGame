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
    question: 'Which soccer play got paid the most?',
    answers: ['Bale', 'Ronaldo', 'Messi', 'Neymar'],
    correctAnswer: 'Messi'
  },
  {
    question: 'Name the country team that won the World Cup 2014',
    answers: ['France', 'Brazil', 'Germany', 'England'],
    correctAnswer: 'Germany'
  },
  {
    question: 'How many yellow cards can each soccer player get in a match?',
    answers: [1, 2, 3, 4],
    correctAnswer: '2'
  },
  {
    question: 'Each team gets up to __ substitutes in a match.',
    answers: [1, 2, 3, 4],
    correctAnswer: '3'
  },
  {
    question: 'Which body part is not allowed to touch the soccer ball beside the goalie?',
    answers: ['head', 'hand', 'arm', 'shoulder'],
    correctAnswer: 'hand'
  },
  {
    question: 'Which team won the most World Cup?',
    answers: ['Germany', 'France', 'Brazil', 'Argentina'],
    correctAnswer: 'Brazil'
  },
  {
    question: 'Which country team does the soccer legend Pele played for?',
    answers: ['Germany', 'France', 'Brazil', 'Argentina'],
    correctAnswer: 'Brazil'
  },
  {
    question: 'Which soccer stadium holds the most seats?',
    answers: ['Rungrado May Day Stadium', 'Camp Nou', 'FNB Stadium', 'Rose Bowl Stadium'],
    correctAnswer: 'Brazil'
  },
  {
    question: 'Who\'s the best soccer player in the world today?',
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
  var answerList = $('<ul>').addClass('list-group');
  var item;
  var input = '';

  for (var answerItem in answersArray) {
    var choice = answersArray[answerItem];
    item = $('<li>').addClass('list-group-item');
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
    var questionsEle = $('<div>').text(quiz[index].question).addClass('header');
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

  showScoreBoard(correctCounter, wrongCounter, unanswerCounter);
}

//score board to dislay when time ran out or user clicks done
function showScoreBoard(correct, wrong, blank) {
  //remove timer by adding class hide
  $('h2').remove();
  //remove questions by adding class hide
  questions.remove();
  //remove done button by adding class hide
  $('#done').remove();

  var jumpbotron = $('<div>').addClass('jumbotron');
  var correctAnswers = $('<div>').text(`Correct: ${correct}`); //Show correctCounter
  var wrongAnswers = $('<div>').text(`Incorrect: ${wrong}`); //Show wrongCounter
  var blankAnswers = $('<div>').text(`Unanswered: ${blank}`); //Show unanswerCounter

  jumpbotron.append(correctAnswers, wrongAnswers, blankAnswers);
  $('h1').append(jumpbotron);

}
//When Start button is clicked, display all questions
$('#start').on('click', function() {
  //start timer. When timer hit 0, displayResult function will run
  timer();

  questions = $('#questions');
  $('h1').css({ "margin-top": "50px",
              "margin-bottom": "10px"});
  questions.removeClass(); //remove the class 'hide' to show the questions
  $('h2').removeClass(); //remove class 'hide' to show the timer
  $(this).remove(); //remove the start button

  var DoneButton = $('<button id="done">Done</button>'); //Add Done button
  $('#button').append(DoneButton); //Display the Done button

  //display the questions
  var displayQuestions = createQuestionEle(data);
  questions.append(displayQuestions);

  $('#done').on('click', displayResult);
});
