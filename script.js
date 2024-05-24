var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}


var sidemenu = document.getElementById("sidemenu");

function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}


//contact
const scriptURL = 'https://script.google.com/macros/s/AKfycbyD-y04o3K1tzcjK03M_zqa8LyT4xczQWOeuFxmpWtIB9qdarz_4UvfBkbrs_STDz1O/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")


form.addEventListener('submit', e => {
  e.preventDefault();

  //user confirmation choice
  const isConfirmed = confirm("Confirm Submission?");
  
  // if user confirms, proceed with form submission
  if (isConfirmed) {

    msg.style.color = 'yellow';
    msg.innerHTML = "Loading...";
    

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.style.color = '#61b752';
        msg.innerHTML = "Message Sent Successfully!";
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  }
});
