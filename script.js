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
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0092a2';
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




/*----------contact----------*/
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




/*----------projects sort & filter----------*/
//function to fetch projects from JSON asynchronously
async function fetchProjects(){
  try {
    const response = await fetch('projects.json');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error){
    console.error('Error fetching projects:', error);
    return [];
  }
}

//function to convert "DD/MM/YYYY" date string to date object
function parseDateDDMMYYYY(dateString){
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

//function to filter and sort projects based on selected skill and sort order
async function filterAndSortProjects(){
  const selectedSkill = document.getElementById('filter-dropdown').value;
  const sortOrder = document.getElementById('sort-dropdown').value;
  const projects = await fetchProjects();

  //filter projects based on selected skill
  let filteredProjects = projects;
  if (selectedSkill !== 'All') {
    if (skillGroups[selectedSkill]) {
      filteredProjects = projects.filter(project => 
        project.skills.some(skill => skillGroups[selectedSkill].includes(skill))
      );
    } else {
      filteredProjects = projects.filter(project => project.skills.includes(selectedSkill));
    }
  }

  //sort projects based on sort order
  if (sortOrder === 'doneDateDesc'){
    filteredProjects.sort((a, b) => parseDateDDMMYYYY(b.doneDate) - parseDateDDMMYYYY(a.doneDate)); // Newest first
  } else if (sortOrder === 'doneDateAsc'){
    filteredProjects.sort((a, b) => parseDateDDMMYYYY(a.doneDate) - parseDateDDMMYYYY(b.doneDate)); // Oldest first
  }

  //display filtered and sorted projects in the UI
  const projectList = document.querySelector('.project-list');
  projectList.innerHTML = ''; // Clear previous content

  filteredProjects.forEach(project =>{
    const projectDiv = document.createElement('div');

    projectDiv.innerHTML =
    `
    <div class="project">
      <div class="img-div">
        <img src="${project.cover}" alt="${project.name} cover" class="project-cover">
      </div>
      <div class="text-div">
        <h3>${project.name}</h3>
        <div class="project-skills">
          ${project.skillCover.map(skillCover => `<img src="${skillCover}" class="skill-icon">`).join('')}
        </div>
        <p class="project-description">${project.description}</p>
      </div>
      <div class="button-div">
        <a href="${project.demoLink}" class="btn demo-btn"> <i class="fas fa-play"></i> Demo</a>
        ${project.codeLink ? `<a href="${project.codeLink}" class="btn code-btn"> <i class="fa-brands fa-github"></i> Code</a>` : ''}
      </div>
    </div>
    `;

    projectList.appendChild(projectDiv);
  });
}

//event listeners for dropdown changes
document.getElementById('filter-dropdown').addEventListener('change', filterAndSortProjects);
document.getElementById('sort-dropdown').addEventListener('change', filterAndSortProjects);

//initial call to populate projects on page load
filterAndSortProjects();