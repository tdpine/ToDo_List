//contains application logic
const dateFns = require ("date-fns");

function createToDo (title, description, deadLine, priority, toDoId) {
    
    let essentials = { title, description, deadLine, priority, toDoId};
    let phases =  [];

    return { essentials, phases };
}

const toDoUpdater = (function() {
    const insertPhase = function (toDo, phaseTitle) {
        toDo.phases.push({ phaseTitle, phasesDetails : []});
    };

    const insertPhDetail = function (toDo, detail, index) {
        toDo.phases[index].phasesDetails.push({detail});
    }

    const delPhase = function (toDo, index) {
       toDo.phases.splice(index,1);
    }

    const delPhDetail = function (toDo, phaseIndex, detailIndex) {
       toDo.phases[phaseIndex].phasesDetails.splice(detailIndex,1);
    }
    return { insertPhase, insertPhDetail, delPhase, delPhDetail  };
})();


class Deadline {

    constructor(type, periodBefore = -1) {
        this.type = type;
        this.toDos = [];
        //period before a project's due date falls into a certain deadline category, for now it is expressed in days
        //-1 stands for the 'anytime' category
        this.periodBefore = periodBefore;
        this.todayDate = new Date ();
    }

    insertDeadline(toDo){
        this.toDos.push(toDo)
    }
}

class TodayDeadline extends Deadline {
    //checks if the project's deadline is today
    checkDeadline(deadLine) {
        return dateFns.isToday(deadLine);
    }
}

class UpcomingDeadline extends Deadline {
    //checks if the project's deadline is within the number of days passed as argument, 10 days are used for testing purposes
    checkDeadline(deadLine) {
        if (deadLine)
    }
}


