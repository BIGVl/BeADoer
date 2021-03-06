import formatDistanceToNow from "date-fns/formatDistanceToNow";
import deleteIMG from "./Img/trash.png";
import goback from "./Img/back.png";
import moreIMG from "./Img/more.png";
import closeIMG from "./Img/close.png";
import flagCircle from "./Img/flag-circle.png";
import { parseISO } from "date-fns";

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
    let overMax = document.createElement("div");
    function submitProjectCard() {
      if (storeTodos[projectName.value]) {
        overMax.textContent = "Project name already exists!";
        overMax.style.cssText = "color: red";
        projectCard.appendChild(overMax).classList.add("over-max");
        return;
      }

      let i = storeTitleArray.length;

      while (localStorage.getItem(`title${i}`)) {
        i++;
      }

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
        projectCard.removeChild(overMax);
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

      localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));

      deleteProject.addEventListener("click", () => {
        projects.removeChild(newProjectCard);
        localStorage.removeItem(`title${i}`);
        localStorage.removeItem(`description${i}`);
        localStorage.removeItem(`dueDate${i}`);
        delete storeTodos[title.textContent];
        localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
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
        delete storeTodos[title.textContent];
        localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
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
        flag.dataset.flag = 0;
      } else if (todo.priority === "1") {
        flag.style.cssText =
          "filter: invert(50%) sepia(96%) saturate(883%) hue-rotate(360deg) brightness(105%) contrast(104%);";
        flag.dataset.flag = 1;
      } else if (todo.priority === "2") {
        flag.style.cssText =
          "filter: invert(94%) sepia(21%) saturate(2479%) hue-rotate(2deg) brightness(107%) contrast(106%);";
        flag.dataset.flag = 2;
      } else if (todo.priority === "3") {
        flag.style.cssText =
          "filter: invert(53%) sepia(66%) saturate(2619%) hue-rotate(85deg) brightness(117%) contrast(128%);";
        flag.dataset.flag = 3;
      }

      theTODO.appendChild(theName).classList.add("the-name");
      theTODO.appendChild(theDue).classList.add("the-due");
      theTODO.appendChild(theDescription).classList.add("the-description");
      imgDiv.appendChild(flag).classList.add("flag");
      imgDiv.appendChild(deleteB).classList.add("delete-to-do");
      theTODO.appendChild(imgDiv).classList.add("img-div");
      todos.appendChild(theTODO).classList.add("the-to-do");

      deleteB.addEventListener("click", () => {
        let i = 0;
        todos.removeChild(theTODO);
        storeTodos[projectName.textContent].forEach((todo) => {
          if (todo.title === theName.textContent) {
            storeTodos[projectName.textContent].splice(i, 1);
            localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
            i = 0;
          }
          i++;
        });
      });
      theTODO.addEventListener("click", openingTodo, { capture: true });
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

    nameToDo.setAttribute("placeholder", " ");
    nameToDoLabel.textContent = "To-do";
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
    confirmToDo.addEventListener("click", function () {
      confirmingAddToDo(newToDo);
    });
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
      priorityDropDown.removeChild(priority1);
      priorityDropDown.removeChild(priority2);
      priorityDropDown.removeChild(priority3);
      priorityDropDown.removeChild(priority4);
    }

    priorityDropDown.classList.toggle("active");
  }

  //Stores the new to-do information and calls the function that creates the new to-do

  function confirmingAddToDo(newToDo) {
    const overmax = document.createElement("div");
    if (nameToDo.value === "" || descriptionToDo.value === "") {
      if (nameToDo.value === "")
        nameToDo.style.cssText = "border: 3px solid red;";
      else {
        nameToDo.style.cssText = "border: 3px solid #004E64;";
      }
      if (descriptionToDo.value === "")
        descriptionToDo.style.cssText = "border: 3px solid red;";
      else {
        descriptionToDo.style.cssText = "border: 3px solid #007A9A;";
      }

      return;
    }
    let checker;
    storeTodos[projectName.textContent].forEach((todo) => {
      if (todo.title === nameToDo.value) return (checker = true);
    });

    if (checker === true) {
      alert("The todo already exists!");
      return;
    }

    todos.removeChild(newToDo);

    createTODO(priority, nameToDo.value, descriptionToDo.value);
  }

  //Creates a new to-do with the information taken from the window in which the user has added info
  const createTODO = (priority, nameToDo, description) => {
    const theTODO = document.createElement("div");
    const theName = document.createElement("div");
    const theDescription = document.createElement("div");
    const theDue = document.createElement("div");
    const flag = document.createElement("img");
    const deleteB = document.createElement("img");
    const imgDiv = document.createElement("div");

    theName.textContent = nameToDo;
    theDescription.textContent = description;
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
      flag.dataset.flag = 0;
    } else if (priority.textContent === "1") {
      flag.style.cssText =
        "filter: invert(50%) sepia(96%) saturate(883%) hue-rotate(360deg) brightness(105%) contrast(104%);";
      flag.dataset.flag = 1;
    } else if (priority.textContent === "2") {
      flag.style.cssText =
        "filter: invert(94%) sepia(21%) saturate(2479%) hue-rotate(2deg) brightness(107%) contrast(106%);";
      flag.dataset.flag = 2;
    } else if (priority.textContent === "3") {
      flag.style.cssText =
        "filter: invert(53%) sepia(66%) saturate(2619%) hue-rotate(85deg) brightness(117%) contrast(128%);";
      flag.dataset.flag = 3;
    }

    theTODO.appendChild(theName).classList.add("the-name");
    theTODO.appendChild(theDue).classList.add("the-due");
    theTODO.appendChild(theDescription).classList.add("the-description");
    imgDiv.appendChild(flag).classList.add("flag");

    imgDiv.appendChild(deleteB).classList.add("delete-to-do");
    theTODO.appendChild(imgDiv).classList.add("img-div");
    todos.appendChild(theTODO).classList.add("the-to-do");

    storeTodos[projectName.textContent].push({
      title: nameToDo,
      description: description,
      dueDate: todoDueDate.value,
      priority: priority.textContent,
    });

    localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));

    deleteB.addEventListener("click", () => {
      let i = 0;
      todos.removeChild(theTODO);
      storeTodos[projectName.textContent].forEach((todo) => {
        if (todo.title === theName.textContent) {
          storeTodos[projectName.textContent].splice(i, 1);
          localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
          i = 0;
        }
        i++;
      });
    });

    theTODO.addEventListener("click", openingTodo, { capture: true });
  };

  //Function that opens the todos when clicked on them and let's the user edit that to-do
  let newState = {};
  function openingTodo(e) {
    const todo = e.target.closest(".the-to-do");
    const arraytodo = Array.from(todo.children);
    const title = arraytodo[0].textContent;
    const desc = arraytodo[2].textContent;
    let date;
    const divPriority = Array.from(arraytodo[3].children);
    const priority = divPriority[0].dataset.flag;

    storeTodos[projectName.textContent].forEach((todo) => {
      if (todo.title === title) {
        date = todo.dueDate;
      }
    });

    if (todo.classList.contains("opened")) return;

    const storeState = {
      title: title,
      desc: desc,
      date: date,
      priority: priority,
    };

    if (todo.firstChild) {
      for (let i = 0; i < 4; i++) {
        todo.removeChild(todo.lastChild);
      }
      todo.classList.add("opened");
    }

    const editName = document.createElement("textarea");
    const editDescription = document.createElement("textarea");
    const editDate = document.createElement("input");
    const priorityDiv = document.createElement("div");
    const editPriority = document.createElement("input");
    const flag = document.createElement("img");
    const priorityLabel = document.createElement("label");
    const buttons = document.createElement("div");
    const close = document.createElement("img");
    const confirm = document.createElement("button");

    editName.textContent = title;
    editDescription.textContent = desc;
    editDate.value = date;
    editPriority.value = priority;

    editName.setAttribute("placeholder", "To do");
    editDescription.setAttribute("placeholder", "Description");
    editDate.setAttribute("type", "datetime-local");
    editPriority.setAttribute("type", "range");
    editPriority.setAttribute("min", "0");
    editPriority.setAttribute("max", "3");
    editPriority.setAttribute("id", "edit-priority");
    priorityLabel.setAttribute("for", "edit-priority");
    flag.setAttribute("src", flagCircle);
    confirm.textContent = "Confirm";
    close.setAttribute("src", closeIMG);

    checkPriority(editPriority.value, flag, priorityLabel);

    editPriority.addEventListener("input", () => {
      checkPriority(editPriority.value, flag, priorityLabel);
    });

    todo.appendChild(editName).classList.add("edit-name");
    todo.appendChild(editDate).classList.add("edit-date");
    todo.appendChild(editDescription).classList.add("edit-description");
    priorityDiv.appendChild(flag).classList.add("edit-flag");
    priorityDiv.appendChild(priorityLabel).classList.add("edit-pr-label");
    priorityDiv.appendChild(editPriority).classList.add("edit-priority");
    todo.appendChild(priorityDiv).classList.add("edit-pr-div");
    buttons.appendChild(close).classList.add("edit-close");
    buttons.appendChild(confirm).classList.add("edit-confirm");
    todo.appendChild(buttons).classList.add("edit-buttons");
    console.log(editName.textContent);
    //Closes the todo without applying any changes after the todo was opened
    close.addEventListener("click", () => {
      todo.classList.remove("opened");
      for (let i = 0; i < 5; i++) {
        if (todo.firstChild) todo.removeChild(todo.lastChild);
      }

      const closetitle = document.createElement("div");
      const closedesc = document.createElement("div");
      const closedue = document.createElement("div");
      const flag = document.createElement("img");
      const deleteB = document.createElement("img");
      const imgDiv = document.createElement("div");
      const label = document.createElement("div");

      closetitle.textContent = title;
      closedesc.textContent = desc;
      flag.setAttribute("src", flagCircle);
      deleteB.setAttribute("src", deleteIMG);

      if (date === "") {
        closedue.textContent = "Due not set";
      } else {
        closedue.textContent = formatDistanceToNow(parseISO(date), {
          addSuffix: true,
        });
      }

      checkPriority(storeState.priority, flag, label);

      deleteB.addEventListener("click", () => {
        let i = 0;
        todos.removeChild(todo);
        storeTodos[projectName.textContent].forEach((todo) => {
          if (todo.title === closetitle.textContent) {
            storeTodos[projectName.textContent].splice(i, 1);
            localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
            i = 0;
          }
          i++;
        });
      });

      todo.appendChild(closetitle).classList.add("the-name");
      todo.appendChild(closedue).classList.add("the-due");
      todo.appendChild(closedesc).classList.add("the-description");
      imgDiv.appendChild(flag).classList.add("flag");
      imgDiv.appendChild(deleteB).classList.add("delete-to-do");
      todo.appendChild(imgDiv).classList.add("img-div");
    });

    //Confirms the todo changes and applies them when the user clicks on the confirm button of the opened todo

    confirm.addEventListener("click", () => {
      todo.classList.remove("opened");
      for (let i = 0; i < 5; i++) {
        if (todo.firstChild) todo.removeChild(todo.lastChild);
      }

      const closetitle = document.createElement("div");
      const closedesc = document.createElement("div");
      const closedue = document.createElement("div");
      const flag = document.createElement("img");
      const deleteB = document.createElement("img");
      const imgDiv = document.createElement("div");
      const label = document.createElement("div");

      closetitle.textContent = editName.value;
      closedesc.textContent = editDescription.value;
      flag.setAttribute("src", flagCircle);
      deleteB.setAttribute("src", deleteIMG);

      if (editDate.value === "") {
        closedue.textContent = "Due not set";
      } else {
        closedue.textContent = formatDistanceToNow(parseISO(editDate.value), {
          addSuffix: true,
        });
      }

      newState.title = editName.value;
      newState.desc = editDescription.value;
      newState.date = editDate.value;
      newState.priority = editPriority.value;
      checkPriority(editPriority.value, flag, label);

      deleteB.addEventListener("click", () => {
        let i = 0;
        todos.removeChild(todo);
        storeTodos[projectName.textContent].forEach((todo) => {
          if (todo.title === closetitle.textContent) {
            storeTodos[projectName.textContent].splice(i, 1);
            localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
            i = 0;
          }
          i++;
        });
      });

      storeTodos[projectName.textContent].forEach((todo) => {
        let i = 0;
        if (todo.title === storeState.title) {
          storeTodos[projectName.textContent].splice(i, 1);
          localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));

          i = 0;
        }
        i++;
      });
      storeTodos[projectName.textContent].push({
        title: editName.value,
        description: editDescription.value,
        dueDate: editDate.value,
        priority: editPriority.value,
      });
      localStorage.setItem("PROJECTS", JSON.stringify(storeTodos));
      console.log(storeTodos);

      todo.appendChild(closetitle).classList.add("the-name");
      todo.appendChild(closedue).classList.add("the-due");
      todo.appendChild(closedesc).classList.add("the-description");
      imgDiv.appendChild(flag).classList.add("flag");
      imgDiv.appendChild(deleteB).classList.add("delete-to-do");
      todo.appendChild(imgDiv).classList.add("img-div");
    });
  }
  //Checks what priority was chosen on the opened todo so when the todo is opened the priority it will be updated
  function checkPriority(priority, flag, label) {
    if (priority === "0") {
      flag.style.cssText =
        "filter: invert(12%) sepia(77%) saturate(7356%) hue-rotate(4deg) brightness(100%) contrast(116%);";
      label.textContent = "Very high";
      flag.dataset.flag = 0;
    } else if (priority === "1") {
      label.textContent = "High";
      flag.style.cssText =
        "filter: invert(50%) sepia(96%) saturate(883%) hue-rotate(360deg) brightness(105%) contrast(104%);";
      flag.dataset.flag = 1;
    } else if (priority === "2") {
      label.textContent = "Medium";
      flag.style.cssText =
        "filter: invert(94%) sepia(21%) saturate(2479%) hue-rotate(2deg) brightness(107%) contrast(106%);";
      flag.dataset.flag = 2;
    } else if (priority === "3") {
      label.textContent = "Low";
      flag.style.cssText =
        "filter: invert(53%) sepia(66%) saturate(2619%) hue-rotate(85deg) brightness(117%) contrast(128%);";
      flag.dataset.flag = 3;
    }
  }
}
