const navToggle = document.querySelector('.nav_toggle');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

let questions = [
  {
    numb: 1,
    question: "What does \"B\" mean in the graphite scale?",
    answer: "c. Soft lead",
    options: [
    "a. Brown color",
    "b. Hard pencil",
    "c. Soft lead"
    ],
    wrongoutput: "Incorrect. \"B\" stands for \"lack\", indicating a softer lead, and is darker."
  },
  {
    numb: 2,
    question: "Which of the following can draw the lighest line?",
    answer: "b. 9H",
    options: [
    "a. 7H",
    "b. 9H",
    "c. 4B"
    ],
    wrongoutput: "Incorrect. \"H\" indicates the hard pencils which can draw lighter, and larger number means higher degree of the pencil intensity. Therefore, the correct answer is 9H."
  }
]

let que_count = 0;

const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");

function showQuestions (index) {
  let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
  let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
  + '<div class="option">' + questions[index].options[1] + '</div>'
  + '<div class="option">' + questions[index].options[2] + '</div>';
 
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  
  const option = option_list.querySelectorAll (".option");
  
  for(i = 0; i < option.length; i++) {
    option[i].setAttribute ("onclick", "optionSelected(this)");
  }
}

const output = document.querySelector(".output");

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let alloptions = option_list.children.length;
  let output_text = '<div class="output">' + 'Correct! Good job!' + '</div>';
  let wrongoutput_text = '<div class="output">' + questions[que_count].wrongoutput + '</div>';
 
  
  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Correct Answer");
    output.innerHTML = output_text;
  }else{
    answer.classList.add("incorrect");
    console.log("Wrong Answer");
    output.innerHTML = wrongoutput_text;
    
    for (i = 0; i < alloptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute ("class", "option correct");
      }
    }
  }

  for (i = 0; i < alloptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
}

showQuestions(0);

const btn = document.querySelector(".btn");
const previous_btn = document.querySelector(".previous_btn");
const next_btn = document.querySelector(".next_btn");

next_btn.onclick = () => {
  if(que_count < questions.length - 1) {
    que_count++;
    showQuestions(que_count);
  }
}

previous_btn.style.display = 'none';
next_btn.addEventListener('click', showBtn); 

function showBtn(e) { 
 previous_btn.style.display = 'inline'; 
 e.preventDefault(); 
} 

previous_btn.onclick = () => {
  if (que_count > 0) {
    que_count = que_count - 1;
    showQuestions(que_count);
  }
}
