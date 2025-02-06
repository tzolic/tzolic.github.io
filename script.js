/*
=========================================================================================================
Author      : tzolic
Name        : Responsive Portfolio Website
Description : A fully responsive portfolio website to showcase personal projects
=========================================================================================================
*/



//MATRIX RAIN
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

//setting up
//width and height of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

//columns
var fontSize = 10,
    columns = canvas.width / fontSize;

//drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

//draw function
function draw() {
  ctx.fillStyle = 'rgba(16, 24, 32, .25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#FEE715';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// loop the animation
setInterval(draw, 33);



//SIDEMENU
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}



//NAVBAR SCROLL
window.addEventListener("scroll", function(){
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
})



// CONTACT FORM
const scriptURL = 'https://script.google.com/macros/s/AKfycbwGymnE6NHSP4aWLPh23K9FB1J-DiUUjRnlzSZbnupDtWtKDaLdbWjAoEFy2p0eZPuG/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault(); //prevent default form submission

  //user confirmation choice
  const isConfirmed = confirm("Confirm Submission?");

  //if user confirms, proceed with form submission
  if (isConfirmed) {
    msg.style.color = '#FEE715'; // Yellow
    msg.innerHTML = "Loading...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        if (response.ok) {
          form.reset();
          msg.style.color = '#4CAF50'; // Green
          msg.innerHTML = "Sent successfully! ✅";

          //clear the message after 3 seconds
          setTimeout(() => { msg.innerHTML = ""; }, 3000);
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        msg.style.color = '#FF0000'; // Red
        msg.innerHTML = "Error sending message. ❌";
      });
  }
});



//DYNAMIC PROJECT CARDS
document.addEventListener('DOMContentLoaded', function() {
  const projectsGrid = document.querySelector('#projects-grid');
  const sortButtons = document.querySelectorAll('.sort-btn');
  
  let projects = [];

  //fetch JSON data
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      projects = data;
      renderProjects(projects);
    })
    .catch(error => console.error('Error loading the JSON data:', error));

  //function to create the HTML for each project card
  function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.dataset.date = project.date;
    
    //generate dynamically
    // tech stack
    const techStackHTML = project.techStack
    ? project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')
    : '';
      //project description
    const descriptionHTML = project.description ? `<p class="project-description">${project.description}</p>` : '';
    //project links
    const liveDemoLink = project.liveDemo ? `<a href="${project.liveDemo}" class="btn">Live Demo</a>` : '';
    const githubLink = project.github ? `<a href="${project.github}" class="btn">GitHub</a>` : '';
  
    // project card HTML
    projectCard.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      ${descriptionHTML}
      <div class="tech-stack">
        ${techStackHTML}
      </div>
      <div class="project-links">
        ${liveDemoLink}
        ${githubLink}
      </div>
    </div>
  `;

    return projectCard;
  }

  //function to render all projects
  function renderProjects(projectsToRender) {
    //clear current content
    projectsGrid.innerHTML = '';
    projectsToRender.forEach(project => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  //sort function
  function convertDateToTimestamp(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day).getTime();
  }

  function sortProjects(direction) {
    projects.sort((a, b) => {
      const dateA = convertDateToTimestamp(a.date);
      const dateB = convertDateToTimestamp(b.date);
      
      if (direction === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    renderProjects(projects);
  }

  sortButtons.forEach(button => {
    button.addEventListener('click', () => {
      sortButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      sortProjects(button.dataset.sort);
    });
  });
});
