import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import deleteB from './Img/trash.png';
import goback from './Img/back.png';
import moreIMG from './Img/more.png';



const storeTitleArray = [];


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


//Displays the modal in which the user can create a new project setting a title and a description
    addButton.addEventListener('click', addProjectCard)

    function addProjectCard () {
        const projectCard = document.createElement('div');
        const projectName = document.createElement('input');
        projectName.setAttribute('id','project-name');
        projectName.setAttribute('type','text');
        const label = document.createElement('label');
        label.setAttribute('for','project-name');
        label.textContent = 'Add your project\'s name:';
        const closeModal = document.createElement('button');
        projectCard.appendChild(closeModal).classList.add('close-modal');
        const description = document.createElement('input');
        description.setAttribute('placeholder','Describe your project. Like what is trying to achieve?');
        description.setAttribute('id','description')
        const labelDescription = document.createElement('label');
        labelDescription.setAttribute('for','description')
        labelDescription.textContent = 'Description'
        const submit = document.createElement('button');
        submit.textContent = 'Submit';
        projectCard.appendChild(label).classList.add('project-label');
        projectCard.appendChild(projectName).classList.add('project-name');
        projectCard.appendChild(labelDescription).classList.add('label-description')
        projectCard.appendChild(description).classList.add('project-description');
        projectCard.appendChild(submit).classList.add('submit');
        projectCard.classList.add('project-modal');
        projects.appendChild(projectCard);
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input=>{
            input.setAttribute('autocomplete', 'off');
        });

        closeModal.addEventListener('click', ()=>{

            projects.removeChild(projectCard);
        })
        

//Adds the project's card when the user clicks submit on the modal that creates the project, adds a input date so the user can set if he wishes to, a dueDate
        submit.addEventListener('click',submitProjectCard)

        function submitProjectCard() {
            let i = storeTitleArray.length;

            while (localStorage.getItem(`title${i}`)) {
                i++;
            }

                let overMax = document.createElement('div');
                if (projectName.value === '') return;
                if (projectName.value.length > 16) {
    
                    overMax.textContent = 'The maximum length for the title is 15 characters!';
                    overMax.style.cssText = 'color: red';
                    projectCard.appendChild(overMax).classList.add('over-max');
                    return
                }
                else if (projectName.value.length < 16 && projectCard.contains(overMax) ) 
                {   
                    projectName.removeChild(overMax);}
                if (description.value.length >= 144) {
                    overMax.textContent = 'Maximum length for the description is 144 characters'
                    return;}

                
    
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
                deleteProject.setAttribute('data-del', i);
                

                

                openProject.addEventListener('click', function(){openingProject(title.textContent, '')})

                
                deleteProject.addEventListener('click', ()=>{
                    
                    projects.removeChild(newProjectCard);
                    localStorage.removeItem(`title${i}`);
                    localStorage.removeItem(`description${i}`);
                    localStorage.removeItem(`dueDate${i}`);
                    
                    
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
                projects.removeChild(projectCard);

                dueDate.addEventListener('change', ()=>{

                    localStorage.setItem(`dueDate${i}`, dueDate.value)
                    
                })
    
            //Store the projects in the array and in the local storage
                localStorage.setItem(`title${i}`, projectName.value );
                localStorage.setItem(`description${i}`, description.value);
                localStorage.setItem(`dueDate${i}`, dueDate.value)
                storeTitleArray.push(`title${i}`)
                
                

                
        }
       
        
    }



  
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
  
//Sort the array with the information so it will give the proper information to each project card when looping through the arrays and their keys and values
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
//Creates the cards for each project previously created and stored in local storage

   (function createCard () {

    projects.removeChild(addCard);
    for (let i=0;i<titleArray.length;i++) {

        
                const newProjectCard = document.createElement('div');
                const title = document.createElement('div');
                const dateDiv = document.createElement('div');
                const dueDate = document.createElement('input');
                const dueDateLabel = document.createElement('label');
                const headerNew = document.createElement('div');
                const descriptionNew =  document.createElement('div');
                const openProject = document.createElement('button');
                const deleteProject = document.createElement('img');

            
                title.textContent = titleArray[i].value;
                dueDate.value = dueDateArray[i].value;
                descriptionNew.textContent = descriptionArray[i].value;
                dueDate.setAttribute('type', 'date');
                dueDate.setAttribute('id', 'dueDate');               
                dueDateLabel.setAttribute('for','dueDate');
                dueDateLabel.textContent = 'Due date:';
                openProject.textContent = 'Open';
                deleteProject.setAttribute('class', 'deleteB');
                deleteProject.setAttribute('src', deleteB);
                openProject.addEventListener('click', function(){openingProject(title.textContent, dueDate.value)})


                deleteProject.addEventListener('click', ()=>{
                    
                    projects.removeChild(newProjectCard);
                    localStorage.removeItem(titleArray[i].key);
                    localStorage.removeItem(descriptionArray[i].key);
                    localStorage.removeItem(dueDateArray[i].key);

                    
                })

                dueDate.addEventListener('change', ()=>{

                    localStorage.setItem(dueDateArray[i].key , dueDate.value)
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
        

        
    }
    projects.appendChild(addCard); 
   })();
   
//Opens the project of which the Open button is clicked

function openingProject (title, dueDate) {

    
    const project = document.createElement('div');
    const header = document.createElement('header');
    const back = document.createElement('img');
    const projectName = document.createElement('div');
    const rightButtons = document.createElement('div');
    const addTask = document.createElement('button');
    const notes = document.createElement('button');
    const more = document.createElement('img');
    const todos = document.createElement('div');
    const due = document.createElement('div');
    
    projectName.textContent = title;
    back.setAttribute('src', goback);
    more.setAttribute('src', moreIMG)
    addTask.textContent = 'Add Task';
    notes.textContent = 'Notes';

    

  
    
    if (dueDate === '') { due.textContent = 'Due date not set'}
    else {
    due.textContent = 'Due: ' + formatDistanceToNow(new Date(dueDate), {addSuffix: true});
    }
    
    

    header.appendChild(back).classList.add('back-from-project');
    header.appendChild(projectName).classList.add('named-project');
    rightButtons.appendChild(addTask).classList.add('add-task');
    rightButtons.appendChild(notes).classList.add('project-notes');
    rightButtons.appendChild(more).classList.add('project-more');
    header.appendChild(rightButtons).classList.add('right-buttons')
    project.appendChild(header).classList.add('project-header');
    project.appendChild(todos).classList.add('todos');
    project.appendChild(due).classList.add('due');
    projects.appendChild(project).classList.add('project');


    back.addEventListener('click', ()=>{

        projects.removeChild(project);
    })

    
    

};


}

