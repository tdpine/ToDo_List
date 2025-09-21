const appLogic = require('./index.js');


import {
    createToDo,
    toDoUpdater,
    TodayDeadline,
    UpcomingDeadline,
    SomedayDeadline,
    AnytimeDeadline
} from "./index.js"

/* const project1 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project1, "Fase 1 di prova");
toDoUpdater.insertPhase(project1, "Fase 2 di prova");
toDoUpdater.insertPhase(project1, "Fase 3 di prova");

toDoUpdater.insertPhDetail(project1, "bla bla bla", 0);
toDoUpdater.insertPhDetail(project1, "bla2 bla2 bla2", 0);
toDoUpdater.insertPhDetail(project1, "bla3 bla3 bla3", 0);

toDoUpdater.insertPhDetail(project1, "bla bla bla", 1);
toDoUpdater.insertPhDetail(project1, "bla2 bla2 bla2", 1);
toDoUpdater.insertPhDetail(project1, "bla3 bla3 bla3", 1);

const project2 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project2, "Fase 1 di prova");
toDoUpdater.insertPhase(project2, "Fase 2 di prova");
toDoUpdater.insertPhase(project2, "Fase 3 di prova");

toDoUpdater.insertPhDetail(project2, "bla bla bla", 0);
toDoUpdater.insertPhDetail(project2, "bla2 bla2 bla2", 0);
toDoUpdater.insertPhDetail(project2, "bla3 bla3 bla3", 0);

const project3 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
toDoUpdater.insertPhase(project3, "Fase 1 di prova");
toDoUpdater.insertPhase(project3, "Fase 2 di prova");
toDoUpdater.insertPhase(project3, "Fase 3 di prova");

toDoUpdater.insertPhDetail(project3, "bla bla bla", 0);
toDoUpdater.insertPhDetail(project3, "bla2 bla2 bla2", 0);
toDoUpdater.insertPhDetail(project3, "bla3 bla3 bla3", 0);

const toDoList = [project1, project2, project3]; */

//this will be populated by the data in localStorage, and used for the various DOM logics
const toDoList = [];

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

//Creates summary of toDos that get appended on the left side bar
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

//create toDo from user input
function crtToDoFrmInp(){
  const toDoTitle = document.getElementById("toDoTitle");
  const description = document.getElementById("description");
  const deadline = document.getElementById("deadLine");
  const newProject = createToDo(toDoTitle.value, description.value, deadline.value, "", crypto.randomUUID());
  toDoList.push(newProject);
  return newProject;
}

//this function attaches a handler, to every new summary created, which handles the click
//of a project summary on the left sidebar
function clickSummHandler (ul){
    ul.addEventListener("click", () => {
    projectContainer.innerHTML = '';
    //the order of the clicked ul on the left, coincides with the index of its corresponding toDo object in toDoList array
    const ulIndexToDisplay = toDoUls.indexOf(ul);
    displayFullProject (ulIndexToDisplay);
  });
}

// displays all project infos on the right content bar
function displayFullProject (ulIndexToDisplay){
    const project = toDoList[ulIndexToDisplay];
    const title = document.createElement("h1");
    title.textContent = project.essentials.title;
    const description = document.createElement("p");
    description.textContent = project.essentials.description;
    projectContainer.appendChild(title);
    projectContainer.appendChild(description);

    project.phases.forEach(phase => {
        displayPhase(phase, projectContainer);
    });
}

//creates phase title and phase details and appends it to projectContainer
function displayPhase(phase, projectContainer){
    
        const phaseTitle =  document.createElement("h3");
        phaseTitle.textContent = phase.phaseTitle;
        const detailsList = document.createElement("ul");
        phase.phasesDetails.forEach(detail => {
            console.log(detail.detail);
            const detailLi = document.createElement("li");
            detailLi.textContent = detail.detail;
            detailsList.appendChild(detailLi);
        });
        projectContainer.appendChild(phaseTitle);
        projectContainer.appendChild(detailsList);
    
}
//

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //create new project object from usr input then create the ul element to append on left side bar
  const newProject = crtToDoFrmInp();
  const newProjectUl = createSumm(newProject);

  //this is needed to display the right project on the content section
  toDoUls.push(newProjectUl);
  clickSummHandler(newProjectUl);
  projectsList.appendChild(newProjectUl);
  //
  newToDoDialog.close();
});

newToDoBtn.addEventListener("click", () => {
    newToDoDialog.showModal();
})

//all'avvio della webpage, controllo se ci sono toDos dentro localStorage
//se c'e' almeno uno, popolo l'array toDoList, e poi chiamo la funzione displayToDoSumm, che li mostrera' nel left side bar

function getDataFrmLclStorage() {
    if(localStorage.length > 0){
        const toDoNums = localStorage.length;
        for(let i = 0; i < toDoNums; i++){
            let currentItem = localStorage.getItem(i);
            toDoList.push(JSON.parse(currentItem));
        }
    }
}
//to fine tune...
function sendDataToLclStorage() {
    const project1 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
    toDoUpdater.insertPhase(project1, "Fase 1 di prova");
    toDoUpdater.insertPhase(project1, "Fase 2 di prova");
    toDoUpdater.insertPhase(project1, "Fase 3 di prova");



    const project2 = createToDo("Titolo di prova", "Descrizione di prova","","Today",crypto.randomUUID());
    toDoUpdater.insertPhase(project2, "Fase 1 di prova");
    toDoUpdater.insertPhase(project2, "Fase 2 di prova");
    toDoUpdater.insertPhase(project2, "Fase 3 di prova");

    
     localStorage.setItem("0", JSON.stringify(project1));
    console.log(localStorage.length);
    localStorage.setItem("1", JSON.stringify(project2));
    console.log(localStorage.length); 


}
sendDataToLclStorage();
/* getDataFrmLclStorage();
console.log(toDoList); */

/* displayToDoSumm(toDoList);

const toDoUls = [...document.querySelectorAll("#projectsList ul")];
//console.log(toDoUls);
toDoUls.forEach(ul => {
    clickSummHandler (ul)
});
 */

