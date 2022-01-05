import formatDistanceToNow from "date-fns/formatDistanceToNow";
import deleteIMG from "./Img/trash.png";
import goback from "./Img/back.png";
import moreIMG from "./Img/more.png";
import closeIMG from "./Img/close.png";
import flagCircle from "./Img/flag-circle.png";
import { parseISO } from "date-fns";
import { over } from "lodash";

//Stores the titles of the projects created so it can give the right index to each one of them

//Creates the UI for projects with the 'Projects button is pressed
export default function projectsPage() {
  //Important DOM variables and arrays
  const content = document.querySelector(".content");
  const addCard = document.createElement("div");
  const addButton = document.createElement("button");
  const projects = document.createElement("div");
  addCard.appendChild(addButton).classList.add("addButton");
  projects.appendChild(addCard).classList.add("addCard");
  content.appendChild(projects).classList.add("projects-content");
  let storeProjectsArray = [];
  const storeTitleArray = [];
  const titleArray = [];
  const descriptionArray = [];
  const dueDateArray = [];
  let storeTodos = {};

  const getItems = localStorage.getItem("PROJECTS");

  if (getItems !== null) storeTodos = JSON.parse(getItems);

  console.log(storeTodos);

  //Displays the modal in which the user can create a new project setting a title and a description
  addButton.addEventListener("click", addProjectCard);

  function addProjectCard() {
    const projectCard = document.createElement("div");
    const projectName = document.createElement("input");
    projectName.setAttribute("id", "project-name");
    projectName.setAttribute("type", "text");
    const label = document.createElement("label");
    label.setAttribute("for", "project-name");
    label.textContent = "Add your project's name:";
    const closeModal = document.createElement("button");
    projectCard.appendChild(closeModal).classList.add("close-modal");
    const description = document.createElement("input");
    description.setAttribute(
      "placeholder",
      "Describe your project. Like what is trying to achieve?"
    );
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    const labelDescription = document.createElement("label");
    labelDescription.setAttribute("for", "description");
    labelDescription.textContent = "Description";
    const submit = document.createElement("button");
    submit.textContent = "Submit";
    projectCard.appendChild(label).classList.add("project-label");
    projectCard.appendChild(projectName).classList.add("project-name");
    projectCard
      .appendChild(labelDescription)
      .classList.add("label-description");
    projectCard.appendChild(description).classList.add("project-description");
    projectCard.appendChild(submit).classList.add("submit");
    projectCard.classList.add("project-modal");
    projects.appendChild(projectCard);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });

    closeModal.addEventListener("click", () => {
      projects.removeChild(projectCard);
    });

    //Adds the project's card when the user clicks submit on the modal that creates the project, adds a input date so the user can set if he wishes to, a dueDate
    submit.addEventListener("click", submitProjectCard);

    function submitProjectCard() {
      let i = storeTitleArray.length;

      while (localStorage.getItem(`title${i}`)) {
        i++;
      }

      let overMax = document.createElement("div");
      if (projectName.value === "") return;
      if (projectName.value.length > 16) {
        overMax.textContent =
          "The maximum length for the title is 15 characters!";
        overMax.style.cssText = "color: red";
        projectCard.appendChild(overMax).classList.add("over-max");
        return;
      } else if (
        projectName.value.length < 16 &&
        projectCard.contains(overMax)
      ) {
        projectName.removeChild(overMax);
      }
      if (description.value.length >= 144) {
        overMax.textContent =
          "Maximum length for the description is 144 characters";
        return;
      }

      projects.removeChild(addCard);
      const newProjectCard = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = projectName.value;
      const dateDiv = document.createElement("div");
      const dueDate = document.createElement("input");
      dueDate.setAttribute("type", "date");
      dueDate.setAttribute("id", "dueDate");
      const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "dueDate");
      dueDateLabel.textContent = "Due date:";
      const headerNew = document.createElement("div");
      const descriptionNew = document.createElement("div");
      descriptionNew.textContent = description.value;
      const openProject = document.createElement("button");
      openProject.textContent = "Open";
      const deleteProject = document.createElement("img");
      deleteProject.setAttribute("class", "deleteB");
      deleteProject.setAttribute("src", deleteIMG);
      deleteProject.setAttribute("data-del", i);

      let project = title.textContent;

      storeTodos[project] = [];
      console.log(storeTodos);
      localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));

      deleteProject.addEventListener("click", () => {
        projects.removeChild(newProjectCard);
        localStorage.removeItem(`title${i}`);
        localStorage.removeItem(`description${i}`);
        localStorage.removeItem(`dueDate${i}`);
        console.log(titleArray);
      });

      headerNew.appendChild(title).classList.add("new-title");
      dateDiv.appendChild(dueDateLabel).classList.add("due-date-label");
      dateDiv.appendChild(dueDate).classList.add("new-due-date");
      headerNew.appendChild(dateDiv).classList.add("date-div");
      newProjectCard.appendChild(headerNew).classList.add("new-header");
      newProjectCard
        .appendChild(descriptionNew)
        .classList.add("new-description");
      newProjectCard.appendChild(openProject).classList.add("open-project");
      newProjectCard.appendChild(deleteProject);
      projects.appendChild(newProjectCard).classList.add("new-project-card");
      projects.appendChild(addCard).classList.add("addButon");
      projects.removeChild(projectCard);

      dueDate.addEventListener("change", () => {
        localStorage.setItem(`dueDate${i}`, dueDate.value);
      });

      openProject.addEventListener("click", function () {
        openingProject(title.textContent, dueDate.value);
      });

      //Store the projects in the array and in the local storage
      localStorage.setItem(`title${i}`, projectName.value);
      localStorage.setItem(`description${i}`, description.value);
      localStorage.setItem(`dueDate${i}`, dueDate.value);
      storeTitleArray.push(`title${i}`);
    }
  }

  //Updates the storeProjectsArray everytime the user opens the projects tab
  (function updateProjectsArray() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(localStorage.key(i));

      if (storeProjectsArray.length <= i) {
        storeProjectsArray.push({ key, value });
      }
    }
  })();
  //Populates the projects cards that have been previously created

  //Pushes each item of the storeProjectsArray to the right array in the right order so they can be grouped properly

  (function updateInfoArrays() {
    storeProjectsArray.forEach((obj) => {
      if (obj.key.includes(`title`)) {
        titleArray.push(obj);
      } else if (obj.key.includes("description")) {
        descriptionArray.push(obj);
      } else {
        dueDateArray.push(obj);
      }
    });

    //Sort the array with the information so it will give the proper information to each project card when looping through the arrays and their keys and values
    titleArray.sort(sortKeys);
    descriptionArray.sort(sortKeys);
    dueDateArray.sort(sortKeys);

    function sortKeys(a, b) {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    }
  })();
  //Creates the cards for each project previously created and stored in local storage

  (function createCard() {
    projects.removeChild(addCard);
    for (let i = 0; i < titleArray.length; i++) {
      const newProjectCard = document.createElement("div");
      const title = document.createElement("div");
      const dateDiv = document.createElement("div");
      const dueDate = document.createElement("input");
      const dueDateLabel = document.createElement("label");
      const headerNew = document.createElement("div");
      const descriptionNew = document.createElement("div");
      const openProject = document.createElement("button");
      const deleteProject = document.createElement("img");

      title.textContent = titleArray[i].value;
      dueDate.value = dueDateArray[i].value;
      descriptionNew.textContent = descriptionArray[i].value;
      dueDate.setAttribute("type", "date");
      dueDate.setAttribute("id", "dueDate");
      dueDateLabel.setAttribute("for", "dueDate");
      dueDateLabel.textContent = "Due date:";
      openProject.textContent = "Open";
      deleteProject.setAttribute("class", "deleteB");
      deleteProject.setAttribute("src", deleteIMG);
      openProject.addEventListener("click", function () {
        openingProject(title.textContent, dueDate.value);
      });

      deleteProject.addEventListener("click", () => {
        projects.removeChild(newProjectCard);
        localStorage.removeItem(titleArray[i].key);
        localStorage.removeItem(descriptionArray[i].key);
        localStorage.removeItem(dueDateArray[i].key);
      });

      dueDate.addEventListener("change", () => {
        localStorage.setItem(dueDateArray[i].key, dueDate.value);
      });

      headerNew.appendChild(title).classList.add("new-title");
      dateDiv.appendChild(dueDateLabel).classList.add("due-date-label");
      dateDiv.appendChild(dueDate).classList.add("new-due-date");
      headerNew.appendChild(dateDiv).classList.add("date-div");
      newProjectCard.appendChild(headerNew).classList.add("new-header");
      newProjectCard
        .appendChild(descriptionNew)
        .classList.add("new-description");
      newProjectCard.appendChild(openProject).classList.add("open-project");
      newProjectCard.appendChild(deleteProject);
      projects.appendChild(newProjectCard).classList.add("new-project-card");
    }
    projects.appendChild(addCard);
  })();

  //Opens the project of which the Open button is clicked
  let todos;
  let projectName;

  function openingProject(title, dueDate) {
    const openedProject = document.createElement("div");
    const header = document.createElement("header");
    const back = document.createElement("img");
    projectName = document.createElement("div");
    const rightButtons = document.createElement("div");
    const addTask = document.createElement("button");
    const notes = document.createElement("button");
    const more = document.createElement("img");
    todos = document.createElement("div");
    const due = document.createElement("div");

    projectName.textContent = title;
    back.setAttribute("src", goback);
    more.setAttribute("src", moreIMG);
    addTask.textContent = "Add Task";
    notes.textContent = "Notes";

    if (dueDate === "") {
      due.textContent = "Due date not set";
    } else {
      due.textContent =
        "Due: " + formatDistanceToNow(new Date(dueDate), { addSuffix: true });
    }

    header.appendChild(back).classList.add("back-from-project");
    header.appendChild(projectName).classList.add("named-project");
    rightButtons.appendChild(addTask).classList.add("add-task");
    rightButtons.appendChild(notes).classList.add("project-notes");
    rightButtons.appendChild(more).classList.add("project-more");
    header.appendChild(rightButtons).classList.add("right-buttons");
    openedProject.appendChild(header).classList.add("project-header");
    openedProject.appendChild(todos).classList.add("todos");
    openedProject.appendChild(due).classList.add("due");
    projects.appendChild(openedProject).classList.add("project");

    //Closes the opened project
    back.addEventListener("click", () => {
      projects.removeChild(openedProject);
    });

    //Opens the menu that creates a new to-do
    addTask.addEventListener("click", addingTasks);

    //Creates all the saved to-do lists
    storeTodos[title].forEach((todo) => {
      const theTODO = document.createElement("div");
      const theName = document.createElement("div");
      const theDescription = document.createElement("div");
      const theDue = document.createElement("div");
      const flag = document.createElement("img");

      const deleteB = document.createElement("img");
      const imgDiv = document.createElement("div");

      theName.textContent = todo.title;
      theDescription.textContent = todo.description;
      flag.setAttribute("src", flagCircle);
      deleteB.setAttribute("src", deleteIMG);
      7;

      if (todo.dueDate === "") {
        theDue.textContent = "Due not set";
      } else {
        theDue.textContent = formatDistanceToNow(parseISO(todo.dueDate), {
          addSuffix: true,
        });
      }

      if (todo.priority === "0") {
        flag.style.cssText =
          "filter: invert(12%) sepia(77%) saturate(7356%) hue-rotate(4deg) brightness(100%) contrast(116%);";
      } else if (todo.priority === "1") {
        flag.style.cssText =
          "filter: invert(50%) sepia(96%) saturate(883%) hue-rotate(360deg) brightness(105%) contrast(104%);";
      } else if (todo.priorityt === "2") {
        flag.style.cssText =
          "filter: invert(94%) sepia(21%) saturate(2479%) hue-rotate(2deg) brightness(107%) contrast(106%);";
      } else if (todo.priority === "3") {
        flag.style.cssText =
          "filter: invert(53%) sepia(66%) saturate(2619%) hue-rotate(85deg) brightness(117%) contrast(128%);";
      }

      theTODO.appendChild(theName).classList.add("the-name");
      theTODO.appendChild(theDue).classList.add("the-due");
      theTODO.appendChild(theDescription).classList.add("the-description");
      imgDiv.appendChild(flag).classList.add("flag");
      imgDiv.appendChild(deleteB).classList.add("delete-to-do");
      theTODO.appendChild(imgDiv).classList.add("img-div");
      todos.appendChild(theTODO).classList.add("the-to-do");
    });
  }

  //To-do's variables;
  let newToDo;
  let nameDiv;
  let nameToDo;
  let nameToDoLabel;
  let descriptionDiv;
  let descriptionToDo;
  let descriptionToDoLabel;
  let todoDueDiv;
  let todoDueDate;
  let todoDueDateLabel;
  let priorityDiv;
  let priority;
  let priorityText;
  let confirmToDo;
  let priorityDropDown;
  let closeB;
  let priority1;
  let priority2;
  let priority3;
  let priority4;

  //Opens the window in which the user can input the to-do's name, description, due date and priority
  function addingTasks() {
    if (todos.contains(newToDo)) return;

    newToDo = document.createElement("div");
    nameDiv = document.createElement("div");
    nameToDo = document.createElement("input");
    nameToDoLabel = document.createElement("label");
    descriptionDiv = document.createElement("div");
    descriptionToDo = document.createElement("input");
    descriptionToDoLabel = document.createElement("label");
    todoDueDiv = document.createElement("div");
    todoDueDate = document.createElement("input");
    todoDueDateLabel = document.createElement("label");
    priorityDiv = document.createElement("div");
    priority = document.createElement("div");
    priorityText = document.createElement("div");
    confirmToDo = document.createElement("button");
    priorityDropDown = document.createElement("div");
    closeB = document.createElement("img");
    priority1 = document.createElement("div");
    priority2 = document.createElement("div");
    priority3 = document.createElement("div");
    priority4 = document.createElement("div");

    priority1.textContent = 0;
    priority2.textContent = 1;
    priority3.textContent = 2;
    priority4.textContent = 3;

    priority.dataset.priority = 1;
    priority1.dataset.priority = 2;
    priority2.dataset.priority = 3;
    priority3.dataset.priority = 4;
    priority4.dataset.priority = 5;

    nameToDo.setAttribute("type", "text");
    nameToDo.setAttribute("placeholder", " ");
    nameToDoLabel.textContent = "To-do";
    descriptionToDo.setAttribute("type", "text");
    descriptionToDo.setAttribute("placeholder", " ");
    descriptionToDoLabel.textContent = "Description";
    todoDueDate.setAttribute("type", "datetime-local");
    todoDueDate.setAttribute("id", "to-do-due");
    todoDueDateLabel.setAttribute("for", "to-do-due");
    todoDueDateLabel.textContent = "Set deadline: ";
    confirmToDo.textContent = "Confirm";
    priority.textContent = "0";
    priorityText.textContent = "Set priority: ";
    closeB.setAttribute("src", closeIMG);

    nameDiv.appendChild(nameToDo).classList.add("to-do-name");
    nameDiv.appendChild(nameToDoLabel).classList.add("to-do-name-label");
    newToDo.appendChild(nameDiv).classList.add("to-do-name-div");
    descriptionDiv
      .appendChild(descriptionToDo)
      .classList.add("to-do-description");
    descriptionDiv
      .appendChild(descriptionToDoLabel)
      .classList.add("to-do-description-label");
    newToDo.appendChild(descriptionDiv).classList.add("to-do-description-div");
    todoDueDiv.appendChild(todoDueDateLabel).classList.add("to-do-due-label");
    todoDueDiv.appendChild(todoDueDate).classList.add("to-do-due");
    newToDo.appendChild(todoDueDiv).classList.add("to-do-due-div");
    priorityDiv.appendChild(priorityText).classList.add("to-do-priority-label");
    priorityDropDown.appendChild(priority).classList.add("to-do-priority");
    priorityDiv
      .appendChild(priorityDropDown)
      .classList.add("priority-dropdown");
    newToDo.appendChild(priorityDiv).classList.add("to-do-priority-div");
    newToDo.appendChild(closeB).classList.add("close-to-do");
    newToDo.appendChild(confirmToDo).classList.add("to-do-confirm");
    todos.appendChild(newToDo).classList.add("to-do-new");

    closeB.addEventListener("click", () => {
      todos.removeChild(newToDo);
    });

    priorityDropDown.addEventListener("click", openDropDown);
    confirmToDo.addEventListener("click", confirmingAddToDo);
  }

  //Ads functionality to the priority drop-down menu
  function openDropDown(e) {
    if (!e.target.dataset.priority) return;

    priority.textContent = e.target.closest(
      ".priority-dropdown > div"
    ).textContent;

    if (priority.textContent === "0") {
      priority.style.background = "red";
    } else if (priority.textContent === "1") {
      priority.style.background = "orange";
    } else if (priority.textContent === "2") {
      priority.style.background = "yellow";
    } else if (priority.textContent === "3") {
      priority.style.background = "green";
    }

    if (!priorityDropDown.classList.contains("active")) {
      priorityDropDown.appendChild(priority1).classList.add("to-do-priority1");
      priorityDropDown.appendChild(priority2).classList.add("to-do-priority2");
      priorityDropDown.appendChild(priority3).classList.add("to-do-priority3");
      priorityDropDown.appendChild(priority4).classList.add("to-do-priority4");
    } else {
      priorityDropDown.removeChild(priority1).classList.add("to-do-priority1");
      priorityDropDown.removeChild(priority2).classList.add("to-do-priority2");
      priorityDropDown.removeChild(priority3).classList.add("to-do-priority3");
      priorityDropDown.removeChild(priority4).classList.add("to-do-priority4");
    }

    priorityDropDown.classList.toggle("active");
  }

  //Stores the new to-do information and calls the function that creates the new to-do

  function confirmingAddToDo() {
    const overmax = document.createElement("div");
    if (
      nameToDo.value === "" ||
      descriptionToDo.value === "" ||
      nameToDo.value.length > 50
    ) {
      if (nameToDo.value === "" || nameToDo.value.length > 50)
        nameToDo.style.cssText = "border: 3px solid red;";
      else {
        nameToDo.style.cssText = "border: 3px solid #004E64;";
      }
      if (descriptionToDo.value === "")
        descriptionToDo.style.cssText = "border: 3px solid red;";
      else {
        descriptionToDo.style.cssText = "border: 3px solid #007A9A;";
      }
      if (nameToDo.value.length > 50) {
        overmax.textContent =
          "The title or the description can not be longer that 50 characters!";
        newToDo.appendChild(overmax).classList.add("overmax-new");
      } else if (newToDo.contains(overmax)) {
        newToDo.removeChild(overmax);
      }

      return;
    }

    todos.removeChild(newToDo);

    createTODO();
  }

  //Creates a new to-do with the information taken from the window in which the user has added info
  const createTODO = () => {
    const theTODO = document.createElement("div");
    const theName = document.createElement("div");
    const theDescription = document.createElement("div");
    const theDue = document.createElement("div");
    const flag = document.createElement("img");
    const deleteB = document.createElement("img");
    const imgDiv = document.createElement("div");

    theName.textContent = nameToDo.value;
    theDescription.textContent = descriptionToDo.value;
    flag.setAttribute("src", flagCircle);
    deleteB.setAttribute("src", deleteIMG);

    if (todoDueDate.value === "") {
      theDue.textContent = "Due not set";
    } else {
      theDue.textContent = formatDistanceToNow(parseISO(todoDueDate.value), {
        addSuffix: true,
      });
    }

    if (priority.textContent === "0") {
      flag.style.cssText =
        "filter: invert(12%) sepia(77%) saturate(7356%) hue-rotate(4deg) brightness(100%) contrast(116%);";
    } else if (priority.textContent === "1") {
      flag.style.cssText =
        "filter: invert(50%) sepia(96%) saturate(883%) hue-rotate(360deg) brightness(105%) contrast(104%);";
    } else if (priority.textContent === "2") {
      flag.style.cssText =
        "filter: invert(94%) sepia(21%) saturate(2479%) hue-rotate(2deg) brightness(107%) contrast(106%);";
    } else if (priority.textContent === "3") {
      flag.style.cssText =
        "filter: invert(53%) sepia(66%) saturate(2619%) hue-rotate(85deg) brightness(117%) contrast(128%);";
    }

    theTODO.appendChild(theName).classList.add("the-name");
    theTODO.appendChild(theDue).classList.add("the-due");
    theTODO.appendChild(theDescription).classList.add("the-description");
    imgDiv.appendChild(flag).classList.add("flag");

    imgDiv.appendChild(deleteB).classList.add("delete-to-do");
    theTODO.appendChild(imgDiv).classList.add("img-div");
    todos.appendChild(theTODO).classList.add("the-to-do");

    storeTodos[projectName.textContent].push({
      title: nameToDo.value,
      description: descriptionToDo.value,
      dueDate: todoDueDate.value,
      priority: priority.textContent,
    });

    localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
  };

  //Gives functionality to the edit buttons of each to-do so the user can edit any information the to-do has
}
