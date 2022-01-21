import _ from "lodash";
import "./Style/main.css";
import "./Style/everyday.css";
import "./Style/notes.css";
import "./Style/projects.css";
import everyday from "./everyday.js";
import notes from "./notes.js";
import projects from "./projects.js";

window.onload = projects();

//Adding functionality to the buttons to delete the current content and populate with the right content for the button

const everydayOpen = document.querySelector(".everyday");
const notesOpen = document.querySelector(".notes");
const projectsOpen = document.querySelector(".projects");
const content = document.querySelector(".content");

everydayOpen.addEventListener("click", () => {
  content.classList.remove("noteP");
  content.classList.remove("projectsP");
  if (content.firstChild) {
    content.removeChild(content.lastChild);
  }
  everyday();
});

notesOpen.addEventListener("click", () => {
  content.classList.remove("every");
  content.classList.remove("projectsP");
  if (content.firstChild) {
    content.removeChild(content.lastChild);
  }
  notes();
});

projectsOpen.addEventListener("click", () => {
  content.classList.remove("noteP");
  content.classList.remove("every");
  if (content.firstChild) {
    content.removeChild(content.lastChild);
  }
  projects();
});

//Making the left-menu slide back on the screen when the user touches it while on phone or tablet

const menu = document.querySelector(".menu");

menu.addEventListener(
  "touchstart",
  () => {
    menu.classList.toggle("visible");
  },
  { capture: true }
);
