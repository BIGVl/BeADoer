import _ from 'lodash';
import './Style/main.css';
import './Style/everyday.css';
import everyday from './everyday.js';
import journal from './journal.js'

window.onload = everyday();

//Adding functionality to the buttons to delete the current content and populate with the right content for the button

const everydayOpen = document.querySelector('.everyday');
const journalOpen = document.querySelector('.journal');
const projects = document.querySelector('.projects');
const content = document.querySelector('.content')

everydayOpen.addEventListener('click', ()=>{

    if (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    everyday();
})

journalOpen.addEventListener('click', ()=>{

    if (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    journal();
})