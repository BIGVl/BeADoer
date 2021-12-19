import { format } from "date-fns";
import deleteB from './Img/trash.png';




//Creates the UI for projects with the 'Projects button is pressed
export default function projectsPage () {
//Important DOM variables and arrays
    const content = document.querySelector('.content');
    const addCard = document.createElement('div');
    const addButton = document.createElement('button');
    const projects = document.createElement('div');
    addCard.appendChild(addButton).classList.add('addButton');
    projects.appendChild(addCard).classList.add('addCard');
    content.appendChild(projects).classList.add('projects-content');
    let storeProjectsArray = [];
    const storeTitleArray = [];


//Displays the modal in which the user can create a new project setting a title and a description
    addButton.addEventListener('click', addProjectCard)

    function addProjectCard () {
        const project = document.createElement('div');
        const projectName = document.createElement('input');
        projectName.setAttribute('id','project-name');
        projectName.setAttribute('type','text');
        const label = document.createElement('label');
        label.setAttribute('for','project-name');
        label.textContent = 'Add your project\'s name:';
        const description = document.createElement('input');
        description.setAttribute('placeholder','Describe your project. Like what is trying to achieve?');
        description.setAttribute('id','description')
        const labelDescription = document.createElement('label');
        labelDescription.setAttribute('for','description')
        labelDescription.textContent = 'Description'
        const submit = document.createElement('button');
        submit.textContent = 'Submit';
        project.appendChild(label).classList.add('project-label');
        project.appendChild(projectName).classList.add('project-name');
        project.appendChild(labelDescription).classList.add('label-description')
        project.appendChild(description).classList.add('project-description');
        project.appendChild(submit).classList.add('submit');
        project.classList.add('project-modal');
        projects.appendChild(project);
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input=>{
            input.setAttribute('autocomplete', 'off');
        });

//Adds the project's card when the user clicks submit on the modal that creates the project, adds a input date so the user can set if he wishes to, a dueDate
        submit.addEventListener('click',submitProjectCard)

        function submitProjectCard() {
            let i = storeTitleArray.length;
                let overMax = document.createElement('div');
    
                if (projectName.value === '') return;
                if (description.value === '') return;
                if (projectName.value.length > 16) {
    
                    overMax.textContent = 'The maximum length for the title is 15 characters!';
                    overMax.style.cssText = 'color: red';
                    project.appendChild(overMax).classList.add('over-max');
                    return
                }
                else if (projectName.value.length < 16 && project.contains(overMax) ) 
                {
                    projectName.removeChild(overMax);}
    
                projects.removeChild(addCard);
                const newProjectCard = document.createElement('div');
                const title = document.createElement('div');
                title.textContent = projectName.value;
                const dateDiv = document.createElement('div');
                const dueDate = document.createElement('input');
                dueDate.setAttribute('type', 'date');
                dueDate.setAttribute('id', 'dueDate')
                const dueDateLabel = document.createElement('label');
                dueDateLabel.setAttribute('for','dueDate');
                dueDateLabel.textContent = 'Due date:'
                const headerNew = document.createElement('div');
                const descriptionNew =  document.createElement('div');
                descriptionNew.textContent = description.value;
                const openProject = document.createElement('button');
                openProject.textContent = 'Open';
                const deleteProject = document.createElement('img');
                deleteProject.setAttribute('class', 'deleteB');
                deleteProject.setAttribute('src', deleteB);
                
                deleteProject.addEventListener('click', ()=>{
                    
                    projects.removeChild(newProjectCard);
                    localStorage.removeItem(`title${i}`);
                    localStorage.removeItem(`description${i}`);

                    if (localStorage.getItem(`dueDate${i}`)) {
                    localStorage.removeItem(`dueDate${i}`);
                    }
                    storeTitleArray.splice(i,1)
                })

                headerNew.appendChild(title).classList.add('new-title');
                dateDiv.appendChild(dueDateLabel).classList.add('due-date-label');
                dateDiv.appendChild(dueDate).classList.add('new-due-date');
                headerNew.appendChild(dateDiv).classList.add('date-div');
                newProjectCard.appendChild(headerNew).classList.add('new-header')
                newProjectCard.appendChild(descriptionNew).classList.add('new-description');
                newProjectCard.appendChild(openProject).classList.add('open-project');
                newProjectCard.appendChild(deleteProject);
                projects.appendChild(newProjectCard).classList.add('new-project-card');
                projects.appendChild(addCard).classList.add('addButon');
                projects.removeChild(project);

                dueDate.addEventListener('change', ()=>{

                    localStorage.setItem(`dueDate${i}`, dueDate.value)
                })
    
            //Store the projects in the array and in the local storage
                localStorage.setItem(`title${i}`, projectName.value );
                localStorage.setItem(`description${i}`, description.value);
                storeTitleArray.push(`title${i}`)
                

                
        }
       
        
    }
    //Updates the storeTitleArray, so everytime the user exits or refreshes the page and then creates another project it will have the proper index
    (function updateTitleArray () {

        for (let i=0;i<localStorage.length;i++) {
            const storedTitle = localStorage.key(i);
            if( storedTitle.includes('title')) {
                storeTitleArray.push(storedTitle);
                
                
            }
        }
    })();
   

  
    //Updates the storeProjectsArray everytime the user opens the projects tab
    (function updateProjectsArray () {

        for (let i=0;i<localStorage.length;i++) {
            
            const key = localStorage.key(i);
            const value = localStorage.getItem(localStorage.key(i));
            
            if (storeProjectsArray.length <= i) {
                
                storeProjectsArray.push({key, value })
                
                

            };
        }
    })();
    //Populates the projects cards that have been previously created 

    //Pushes each item of the storeProjectsArray to the right array in the right order so they can be grouped properly 
   const titleArray = [];
   const descriptionArray = [];
   const dueDateArray = [];
   
   (function updateInfoArrays (){

    storeProjectsArray.forEach(obj=>{

        if (obj.key.includes(`title`)) {
            titleArray.push(obj);
        }
        else if (obj.key.includes('description')) {
            descriptionArray.push(obj);
        }
        else {
            dueDateArray.push(obj)
        }
    });
  
//Sort the arrya with the information so it will give the proper information to each project card when looping through the arrays and their keys and values
    titleArray.sort(sortKeys);
    descriptionArray.sort(sortKeys);
    dueDateArray.sort(sortKeys);
    
    function sortKeys(a,b) {

        if (a.key<b.key) {
            return -1;
        }
        if (a.key>b.key) {

            return 1;
        }
        return 0;
    }
 
   })();
   
  
  
}


