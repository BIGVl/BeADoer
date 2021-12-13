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


    


}

//Creates the projects
export const projectFactory = () => {

   
}