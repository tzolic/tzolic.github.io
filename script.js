/*----------matrix rain----------*/
// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
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

// Loop the animation
setInterval(draw, 33);





/*----------sidemenu----------*/

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}




/*---------navbar scroll----------*/
window.addEventListener("scroll", function(){
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
})



//contact form
const scriptURL = 'https://script.google.com/macros/s/AKfycbyQwcteQQwRiSffYEiGcxoNileh-SqeMILCYEBJF0AjMnm-D6ufv2nZ3qugtZf_z7pE/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  //user confirmation choice
  const isConfirmed = confirm("Confirm Submission?");
  //if user confirms, proceed with form submission

  if (isConfirmed) {
    msg.style.color = '#FEE715';
    msg.innerHTML = "Loading...";
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      form.reset(); })
      .catch(error => console.error('Error!', error.message));
  }
  else{
    e.preventDefault()
  }
});





//test
document.addEventListener('DOMContentLoaded', function() {
  const projectsGrid = document.querySelector('#projects-grid');
  const sortButtons = document.querySelectorAll('.sort-btn');
  
  let projects = [];

  // Fetch JSON data
  fetch('project.json')
    .then(response => response.json())
    .then(data => {
      projects = data;
      renderProjects(projects);
    })
    .catch(error => console.error('Error loading the JSON data:', error));

  // Function to create the HTML for each project card
  function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.dataset.date = project.date;
    // Generate tech stack HTML dynamically

    const techStackHTML = project.techStack
    ? project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')
    : '';
    // Generate project links conditionally
    const liveDemoLink = project.liveDemo ? `<a href="${project.liveDemo}" class="btn">Live Demo</a>` : '';
    const githubLink = project.github ? `<a href="${project.github}" class="btn">GitHub</a>` : '';
    // Check if project.description exists and is not empty
    const descriptionHTML = project.description && project.description.length > 0
    ? project.description.map(point => `<li>${point}</li>`).join('')
    : '';

    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <div class="tech-stack">
          ${techStackHTML}
        </div>
        <ul class="project-description-list">
          ${descriptionHTML}
        </ul>
        <div class="project-links">
          ${liveDemoLink}
          ${githubLink}
        </div>
      </div>
    `;

    return projectCard;
  }

  // Function to render all projects
  function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = ''; // Clear current content
    projectsToRender.forEach(project => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  // Sort function
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
