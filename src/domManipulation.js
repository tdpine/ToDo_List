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

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const toDoTitle = document.getElementById("toDoTitle");
  const description = document.getElementById("description");
  const deadline = document.getElementById("deadLine");
  const newProject = createToDo(toDoTitle.value, description.value, deadline.value, "", crypto.randomUUID());
  toDoUpdater.insertPhase(newProject, "Fase 1 di prova");
  toDoUpdater.insertPhase(newProject, "Fase 2 di prova");
  toDoUpdater.insertPhase(newProject, "Fase 3 di prova");
  toDoList.push(newProject);
  projectsList.appendChild(createSumm(newProject));
  console.log(toDoList);
  newToDoDialog.close();
});
