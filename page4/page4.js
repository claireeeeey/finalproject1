const navToggle = document.querySelector('.nav_toggle');

//add a click listener to the navigation bar to open the menu
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

//create the quiz and store it in an array, including the question prefixs, questions, answer options, correct answers, and the answer feedbacks
let questions = [
  {
    numb: 1,
    question: "Which of the following can draw the lighest line?",
    answer: "b. 9H",
    options: [
    "a. 7H",
    "b. 9H",
    "c. 4B"
    ],
    correctoutput: "Correct! Good job!",
    wrongoutput: "Incorrect. \"H\" indicates the hard pencils which can draw lighter, and larger number means higher degree of the pencil intensity. Therefore, the correct answer is 9H."
  },
  {
    numb: 2,
    question: "Which of the following is wrong?",
    answer: "a. Knifes can breake the pencil tips easily",
    options: [
    "a. Knifes can breake the pencil tips easily",
    "b. Knifes provide more variation",
    "c. Pencil sharpener is limited to a certain shape of pencil tip"
    ],
    correctoutput: "Correct! Good job!",
    wrongoutput: "Incorrect. Some pencil sharpeners may easy to shatter the graphite within the pencils and make the tips breake. Answer a is the correct answer."
  },
  {
    numb: 3,
    question: "What you should consider for sharpening pencils?",
    answer: "c. All of above",
    options: [
    "a. Choose a sharp knife",
    "b. Find an ideal length of the exposed graphite core",
    "c. All of above"
    ],
    correctoutput: "Correct! Good job!",
    wrongoutput: "Incorrect. Both a and b are correct."
  }
]

//set question counter, number, and user score
let que_count = 0;
let que_numb = 0;
let userScore = 0;

const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");

//create a function to push the quiz array into html
function showQuestions (index) {
  //create the span and div tag for question and options and pass the quiz array
  let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
  let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
  + '<div class="option">' + questions[index].options[1] + '</div>'
  + '<div class="option">' + questions[index].options[2] + '</div>';
 
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  
  const option = option_list.querySelectorAll (".option");
  
  //for every answer options, set onclick attribute
  for(i = 0; i < option.length; i++) {
    option[i].setAttribute ("onclick", "optionSelected(this)");
  }
}

const output = document.querySelector(".output");

//create a function to set the correct and wrong answers when option is selected
function optionSelected(answer) {
  //get correct answers, wrong answers, and all options
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let alloptions = option_list.children.length;
  //create the div tag for answer feedback when option is selected
  let output_text = '<div class="output">' + questions[que_count].correctoutput + '</div>';
  let wrongoutput_text = '<div class="output">' + questions[que_count].wrongoutput + '</div>';
 
  // if selected options is equal to the correct answer, add one score to the userScore, add a correct effect that the background will be green, and print a correct answer feedback
  if (userAns == correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    console.log("Correct Answer");
    output.innerHTML = output_text;
  // if selected answer is not equal to the correct answer, add a wrong effect that the background will be red, and print a wrong answer feedback
  }else{ 
    answer.classList.add("incorrect");
    console.log("Wrong Answer");
    output.innerHTML = wrongoutput_text;
    
    //once the option is selected, the correct answer with green background will show up
    for (i = 0; i < alloptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute ("class", "option correct");
      }
    }
  }

  //once an option is selected then other options are unable to be selected 
  for (i = 0; i < alloptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
}

//run the whole quiz function
showQuestions(0);

const btn = document.querySelector(".btn");
const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".total_que");

//create a function to count how many question is answered
function queCounter(index) {
  //create the span and div tag to show the question counter
  let totalQueCountTag = '<span><div>' + index + '</div> of <div>' + questions.length + '</div> Questions </span>';
  bottom_ques_counter.innerHTML = totalQueCountTag;
}
//run the function
queCounter(0);

//if the option is selected, add the question number and push to the counter
option_list.onclick = () => {
  if (que_count < questions.length) {
    que_numb++;
    queCounter(que_numb);
  }
}

//set the next button to show up after the option is selected
next_btn.style.display = 'none'; 
option_list.addEventListener('click', show); 

//once the option is selected, show up the answer feedback and the next button
function show() {
  output.style.display = 'inline';
  next_btn.style.display = 'inline'; 
}

//once the next button is clicked, the next question will show up
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    showQuestions(que_count);
    //if it is the last question, print out the result
  } else {
    showResult();
  }
}

next_btn.addEventListener('click', showBtn); 
//once the next button is clicked then hide the answer feedback and the next button
function showBtn() { 
 output.style.display = 'none';
 next_btn.style.display = 'none'; 
}

const quiz_box = document.querySelector(".quiz");
const result_box = document.querySelector(".result_box");

//if it is the last question is answered
function showResult() {
  //hide the quiz and the result shows up
  quiz_box.style.display = 'none';
  result_box.classList.add("activeResult");
  const score_text = document.querySelector(".score_text");
  //set the final score
  scoreTag = '';
  //set the score scale and print the userScore of how many correct answers the user get
  if (userScore >= 3) {
    //if get three or more questions correct, print the congrats notes and the score
    let scoreTag = '<span>Congrats. You got ' + userScore + ' out of ' + questions.length + '</span>';
    score_text.innerHTML = scoreTag;
  } else if (userScore > 1) {
    //if get one or more questions correct, print the nice job notes and the score
    let scoreTag = '<span>Nice job. You got ' + userScore + ' out of ' + questions.length + '</span>';
    score_text.innerHTML = scoreTag;
  } else {
    //if get none questions correct, print the sorry notes and the score
    let scoreTag = '<span>Sorry. You got ' + userScore + ' out of ' + questions.length + '</span>';
    score_text.innerHTML = scoreTag;
  }
}

const restart = document.querySelector(".restart");

//set the replay key to do the quiz again
restart.onclick = () => {
  //show the quiz and hide the result when the button is clicked
  quiz_box.style.display = 'inline';
  result_box.classList.remove("activeResult");
  //set every variable to zero again
  que_count = 0;
  que_numb = 0;
  userScore = 0;
  //set the original quiz questions and counter
  showQuestions(que_count);
  queCounter(que_numb);
  //show the next button
  next_btn.style.display = 'inline';
}
