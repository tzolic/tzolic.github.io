/*----------skills, experience, education----------*/

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
  //remove old tab classes
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }

  //add active tab classes
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");

  //store the active tab in localStorage
  localStorage.setItem("activeTab", tabname);
}

// Function to retrieve active tab from localStorage
function setActiveTabFromStorage() {
  let activeTab = localStorage.getItem("activeTab");
  
  if(activeTab){
    for (let tablink of tablinks){
      tablink.classList.remove("active-link");
      if (tablink.getAttribute("onclick").includes(activeTab)){
        tablink.classList.add("active-link");
      }
    }
    for (let tabcontent of tabcontents){
      tabcontent.classList.remove("active-tab");
      if (tabcontent.id === activeTab){
        tabcontent.classList.add("active-tab");
      }
    }
  }
}

// Call setActiveTabFromStorage on page load
document.addEventListener("DOMContentLoaded", function(){
  setActiveTabFromStorage();
});



/*----------sidemenu----------*/

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}


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





/*---------navbar scroll----------*/

window.addEventListener("scroll", function(){
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
})




/*----------projects filter & sort----------*/

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

  // Define the mapping of group options to multiple skills
  const skillGroups = {
    Backend: ['C'],
    Frontend: ['HTML & CSS', 'JavaScript']
  };

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
    projectDiv.classList.add('project');

    projectDiv.innerHTML =
    `
    <a href="${project.link}">
      <img src= "${project.coverSrc}" alt="${project.name} cover">
      <div class="layer">
        <div>
          ${project.skillSrc.map(skillSrc => `<img src="${skillSrc}" alt="skill icon">`).join('')}
        </div>
        <h3>${project.name}</h3>
        <p>
          ${project.description}
        </p>
      </div>
    </a>
    `;
    
    projectList.appendChild(projectDiv);
  });
}

//event listeners for dropdown changes
document.getElementById('filter-dropdown').addEventListener('change', filterAndSortProjects);
document.getElementById('sort-dropdown').addEventListener('change', filterAndSortProjects);

//initial call to populate projects on page load
filterAndSortProjects();
