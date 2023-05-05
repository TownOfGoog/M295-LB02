//Vorbereitungen und essentielles

import express from "express";
import session from "express-session"

const app = express();
const port = 3000;



//Tasks erstellt mit ChatGPT
let tasks = [
    {
      "id": "1",
      "title": "Einkauf erledigen",
      "Erstelldatum": "2023-05-10",
      "completed": null
    },
    {
      "id": "2",
      "title": "Wäsche waschen",
      "Erstelldatum": "2023-05-11",
      "completed": null
    },
    {
      "id": "3",
      "title": "Meeting vorbereiten",
      "Erstelldatum": "2023-05-12",
      "completed": null
    }
  ]

  //Quelle: Eigene Dokumente des modules 295
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });



  //Hauptanforderungen
  //Hauptanforderungen
  //Hauptanforderungen
  
//Hauptanforderung 1 GET /tasks
//Quelle: Eigene Dokumente des modules 295
function findALL() {
    return tasks;
}

app.get("/tasks", (req, res) => {
    res.json(findALL())
    res.status()
})



//Hauptanforderung 2
//Quelle: Eigene Dokumente des modules 295
export function addNewTask (task) {
    tasks = [... tasks, task];
}

app.post("/tasks", (req, res) => {

    var now = new Date();
    var nowJSON = currentDate.toJSON();

    let newTask = {
      "id": "4",
      "title": "Katzen füttern",
      "Erstelldatum": nowJSON,
      "completed": null
    }

    addNewTask(newTask)
    
    res.sendStatus(201).json({
        "success": true,
        "message": 'Task added.'
      });
})






//Hauptanforderung 3
//Quelle: Eigene Dokumente des modules 295
function FINDING(id) {
    let task = tasks.find(task => task.id === id)
    return task
  }

app.get("/tasks/:id", (req, res) => {
    let taskId = req.params.id;
    let task = FINDING(taskId);

    
    if (task) {
      res.json(task);
      res.status(200).json({
        "success": true,
        "message": 'Task found.'
      })
    } else {
      res.status(404).json({
        "success": false,
        "message": 'Task not found.'
      })
    }})




//Hauptanforderung 4
//Quelle: Eigene Dokumente des modules 295 und Beispiel von Robin Bühler
function changeTask (task) {
    tasks = tasks.map((t) => t.id == task.id ? task : t);
} 

app.put("/tasks/:id", (req, res) => {
    var now = new Date();
    var nowJSON = now.toJSON();


    let id = req.params.id
    let NewTask = {
        "id": id,
        "title": "Katzen streicheln",
        "Erstelldatum": nowJSON,
        "completed": null
      }


      if (id) {
        changeTask(NewTask);
        res.status(200).json({
            "success": true,
            "message": 'Task not found.'
          })
      } else {
        res.status(404).json({
          "success": false,
          "message": 'Task not found.'
        })
      }

    res.json(findALL())
})



//Hauptanforderung 5
//Quelle: Eigene Dokumente des modules 295 und Beispiel von Robin Bühler
    function removeTask(id){
    tasks = tasks.filter((t) => t.id !== id);
}

app.delete("/tasks/:id", (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(FINDING(id))
        res.status(202).json({
            "success": true,
            "message": 'Task  found.'
          })
        res.json(removeTask(id))
      } else {
        res.status(404).json({
          "success": false,
          "message": 'Task not found.'
        })
      }

})

















  //Authentifizierung
  //Authentifizierung
  //Authentifizierung

//Sämtliche Authentifizierungs Sachen sind inspiriert von den SlyDev Slides und eigenarbeit des Modules 295

//Vorarbeiten
const password = { password: "m295" }

//Anforderung 6





