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
console.log(project1.phases);

const projectsList = document.querySelector("#projectsList");

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

