import {} from "date-fns";

//Creates the UI for projects with the 'Projects button is pressed
export default function createDOM () {

    const content = document.querySelector('.content');
    content.classList.add('projectsP');

    //const date = document.createElement('input');
    //date.setAttribute('type','date');
    //content.appendChild(date).classList.add('datetime');
    //date.addEventListener('input', ()=>{
    //   localStorage.setItem('Date', date.value)
    //})

    const addCard = document.createElement('div');
    const addButton = document.createElement('button');
    addCard.appendChild(addButton).classList.add('addButton');
    content.appendChild(addCard).classList.add('addCard');
    content.appendChild(project)
    content.appendChild(overlay)


    addButton.addEventListener('click', ()=>{
        const overlay = document.createElement('div')
        const project = document.createElement('div');
        const projectName = document.createElement('input');
        projectName.setAttribute('type','text');
        const submit = document.createElement('button');
        project.appendChild(projectName).classList.add('submit');
        project.appendChild(submit).classList.add('submit');
        overlay.classList.add('overlay-add-project');
        project.classList.add('project-modal');



    })


    


}

//Creates the projects
const projectFactory = () => {




}