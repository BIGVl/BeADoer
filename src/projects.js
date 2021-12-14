import { sub } from "date-fns";

//Creates the UI for projects with the 'Projects button is pressed
export default function createDOM () {

    const content = document.querySelector('.content');

    //const date = document.createElement('input');
    //date.setAttribute('type','date');
    //content.appendChild(date).classList.add('datetime');
    //date.addEventListener('input', ()=>{
    //   localStorage.setItem('Date', date.value)
    //})

    const addCard = document.createElement('div');
    const addButton = document.createElement('button');
    const projects = document.createElement('div');
    let submit ; 
    let projectName;
    let newProjectCard;
    let title;
    let dueDate;
    let headerNew;
    let descriptionNew;
    let openProject;
    addCard.appendChild(addButton).classList.add('addButton');
    projects.appendChild(addCard).classList.add('addCard');
    content.appendChild(projects).classList.add('projects-content');



    addButton.addEventListener('click', ()=>{
        const project = document.createElement('div');
        projectName = document.createElement('input');
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
        submit = document.createElement('button');
        submit.textContent = 'Submit';
        project.appendChild(label).classList.add('project-label');
        project.appendChild(projectName).classList.add('project-name');
        project.appendChild(labelDescription).classList.add('label-description')
        project.appendChild(description).classList.add('project-description');
        project.appendChild(submit).classList.add('submit');
        project.classList.add('project-modal');
        projects.appendChild(project);

        submit.addEventListener('click',()=>{

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
            newProjectCard = document.createElement('div');
            title = document.createElement('div');
            title.textContent = projectName.value;
            dueDate = document.createElement('input');
            dueDate.setAttribute('type', 'date');
            headerNew = document.createElement('div');
            descriptionNew =  document.createElement('div');
            descriptionNew.textContent = description.value;
            openProject = document.createElement('button');
            openProject.textContent = 'Open';
            headerNew.appendChild(title).classList.add('new-title');
            headerNew.appendChild(dueDate).classList.add('new-due-date');
            newProjectCard.appendChild(headerNew).classList.add('new-header')
            newProjectCard.appendChild(descriptionNew).classList.add('new-description');
            newProjectCard.appendChild(openProject).classList.add('open-project');
            projects.appendChild(newProjectCard).classList.add('new-project-card');
            projects.appendChild(addCard).classList.add('addButon');
            projects.removeChild(project);




    
        })
    })




    


}

//Creates the projects
const projectFactory = () => {




}