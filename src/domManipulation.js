const appLogic = require('./index.js');
import {
    createToDo,
    toDoUpdater,
    TodayDeadline,
    UpcomingDeadline,
    SomedayDeadline,
    AnytimeDeadline
} from "./index.js"

const project1 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project1, "Fase 1 di prova");
toDoUpdater.insertPhase(project1, "Fase 2 di prova");
toDoUpdater.insertPhase(project1, "Fase 3 di prova");
const project2 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project2, "Fase 1 di prova");
toDoUpdater.insertPhase(project2, "Fase 2 di prova");
toDoUpdater.insertPhase(project2, "Fase 3 di prova");
const project3 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project3, "Fase 1 di prova");
toDoUpdater.insertPhase(project3, "Fase 2 di prova");
toDoUpdater.insertPhase(project3, "Fase 3 di prova");
const toDoList = [project1, project2, project3];


const projectsList = document.querySelector("#projectsList");
const newToDoBtn = document.querySelector("#newList");
const newToDoDialog = document.querySelector("#newToDoDialog");
const confirmBtn = newToDoDialog.querySelector("#confirmBtn");
const projectContainer = document.querySelector(".projectContainer");

function displayToDoSumm(toDoList){
    for(let toDo of toDoList){
        let summary = createSumm(toDo);
        projectsList.appendChild(summary);
    }
}

function createSumm(toDo){
    let summary = document.createElement("ul");
    let toDotitle = document.createElement("li");
    toDotitle.textContent = toDo.essentials.title;
    summary.appendChild(toDotitle);

    for (let phase of toDo.phases){
        let phaseElem = document.createElement("li");
        phaseElem.textContent = phase.phaseTitle;
        summary.appendChild(phaseElem);
    }
    return summary;
}
displayToDoSumm(toDoList);

newToDoBtn.addEventListener("click", () => {
    newToDoDialog.showModal();
})
//create toDo from user input
function crtToDoFrmInp(){
  const toDoTitle = document.getElementById("toDoTitle");
  const description = document.getElementById("description");
  const deadline = document.getElementById("deadLine");
  const newProject = createToDo(toDoTitle.value, description.value, deadline.value, "", crypto.randomUUID());
  toDoList.push(newProject);
  //righe per test
  toDoUpdater.insertPhase(newProject, "Fase 1 di prova");
  toDoUpdater.insertPhase(newProject, "Fase 2 di prova");
  toDoUpdater.insertPhase(newProject, "Fase 3 di prova");
  //righe per test
  return newProject;
}

//this function get attached when a project summary is clicked on the left sidebar
function clickSummHandler (ul){
    ul.addEventListener("click", () => {
    //svuoto il div projectContainer
    projectContainer.innerHTML = '';
    //come pesco ul corrispondente dall'array dei toDos?
    //console.log(toDoUls.indexOf(ul));
    const ulIndexToDisplay = toDoUls.indexOf(ul);
    //funziona ma devo attaccare l'eventListener anche quando creo un nuovo toDo
    //
    //creo elemento per titolo,descrizione in un unico div. poi i vari div delle fasi con i dettagli
    const project = toDoList[ulIndexToDisplay];
    const title = document.createElement("h1");
    title.textContent = project.essentials.title;
    const description = document.createElement("p");
    description.textContent = project.essentials.description;
    projectContainer.appendChild(title);
    projectContainer.appendChild(description);

  });
}

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //create new project object from usr input then create the ul element to append 
  const newProject = crtToDoFrmInp();
  const newProjectUl = createSumm(newProject);

  //this is needed to display the right project on the content section
  toDoUls.push(newProjectUl);
  clickSummHandler(newProjectUl);
  projectsList.appendChild(newProjectUl);

  newToDoDialog.close();
});

const toDoUls = [...document.querySelectorAll("#projectsList ul")];
console.log(toDoUls);
toDoUls.forEach(ul => {
    clickSummHandler (ul)
});

