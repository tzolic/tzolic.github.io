user_score = 0;
computer_score = 0;

const user_score_span = document.getElementById("user-score");
const computer_score_span = document.getElementById("computer-score");

const score_board_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
  const choices = ['r', 'p', 's'];
  const random_number = Math.floor(Math.random() * 3);
  return choices[random_number];
}

function convertToWord(letter){
  if(letter == "r") return "Rock";
  if(letter == "p") return "Paper";
  return "Scissors";
}

function win(user_choice, computer_choice){
  user_score++;
  user_score_span.innerHTML = user_score;
  computer_score_span.innerHTML = computer_score;
  const small_user_word = "you".fontsize(2).sub();
  const small_computer_word = "me".fontsize(2).sub();
  result_p.innerHTML = `${convertToWord(user_choice)}${small_user_word} beats ${convertToWord(computer_choice)}${small_computer_word}. <span style="color: #0092a2;">You win! 🎉</span>`;
  document.getElementById(user_choice).classList.add('win-glow');
  setTimeout(function(){document.getElementById(user_choice).classList.remove('win-glow')}, 500);
}

function lose(user_choice, computer_choice){
  computer_score++;
  user_score_span.innerHTML = user_score;
  computer_score_span.innerHTML = computer_score;
  const small_user_word = "user".fontsize(2).sub();
  const small_computer_word = "comp".fontsize(2).sub();
  result_p.innerHTML = `${convertToWord(user_choice)}${small_user_word} loses to ${convertToWord(computer_choice)}${small_computer_word}. <span style="color: crimson;">You lose! 💔</span>`;
  document.getElementById(user_choice).classList.add('lose-glow');
  setTimeout(function(){document.getElementById(user_choice).classList.remove('lose-glow')}, 500);
}

function draw(user_choice, computer_choice){
  user_score_span.innerHTML = user_score;
  computer_score_span.innerHTML = computer_score;
  const small_user_word = "user".fontsize(2).sub();
  const small_computer_word = "comp".fontsize(2).sub();
  result_p.innerHTML = `${convertToWord(user_choice)}${small_user_word} equals ${convertToWord(computer_choice)}${small_computer_word}. <span style="color: gray;">You draw! ⚖️</span>`;
  document.getElementById(user_choice).classList.add('draw-glow');
  setTimeout(function(){document.getElementById(user_choice).classList.remove('draw-glow')}, 500);
}

function game(user_choice){
  const computer_choice = getComputerChoice();
  switch(user_choice + computer_choice){
    case "rs":
    case "pr":
    case "sp":
      win(user_choice, computer_choice);
      break;
    case "sr":
    case "rp":
    case "ps":
      lose(user_choice, computer_choice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(user_choice, computer_choice);
      break;
  }
}

function main(){
  rock_div.addEventListener('click', function(){
    game("r");
  })
  
  paper_div.addEventListener('click', function(){
    game("p");
  })
  
  scissors_div.addEventListener('click', function(){
    game("s");
  })
}

main();




