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
toDoUpdater.insertPhase(project1, "Fase 1 di prova")
console.log(project1);
