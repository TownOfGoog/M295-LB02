// Vorbereitungen und essentielles

import express from 'express'
import session from 'express-session'

const app = express()
app.use(express.json())
const port = 3000
let theID = '3'
let temp

function newID () {
  temp = parseInt(theID)
  temp = temp + 1
  theID = toString(temp)
}

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))
// Tasks erstellt mit ChatGPT
let tasks = [
  {
    id: '1',
    titel: 'Einkauf erledigen',
    ersteller: 'Max Muster',
    email: 'Max@Mustermail',
    erstelldatum: '2023-05-10',
    beendet: null
  },
  {
    id: '2',
    titel: 'Wäsche waschen',
    ersteller: 'Max Muster',
    email: 'Max@Mustermail',
    erstelldatum: '2023-05-11',
    beendet: null
  },
  {
    id: '3',
    titel: 'Meeting vorbereiten',
    ersteller: 'Max Muster',
    email: 'Max@Mustermail',
    erstelldatum: '2023-05-12',
    beendet: null
  }
]

// Quelle: Eigene Dokumente des modules 295

// Hauptanforderungen
// Hauptanforderungen
// Hauptanforderungen

// Hauptanforderung 1 GET /tasks
// Quelle: Eigene Dokumente des modules 295
function findALL () {
  return tasks
}

app.get('/tasks', (req, res) => {
  if (req.session.email === true) {
    res.json(findALL())
    res.status()
  } else {
    return res.status(403).json({ message: 'Not logged in' })
  }
})

// Hauptanforderung 2
// Quelle: Eigene Dokumente des modules 295
export function addNewTask (task) {
  tasks = [...tasks, task]
}

app.post('/tasks', (req, res) => {
  if (req.session.email) {
    const now = new Date()
    const nowJSON = now.toJSON()

    const newTask =
        {
          id: newID(),
          titel: req.body.Titel,
          ersteller: 'Max Muster',
          email: req.session.email,
          erstelldatum: nowJSON,
          beendet: null
        }
        // addNewTask(newTask)

    res.status(201).json({
      newTask
    })
  } else {
    return res.status(403).json({ message: 'Not logged in' })
  }
})

// Hauptanforderung 3
// Quelle: Eigene Dokumente des modules 295
function FINDING (id) {
  const task = tasks.find(task => task.id === id)
  return task
}

app.get('/tasks/:id', (req, res) => {
  console.log(req.session.email)
  if (req.session.email) {
    const taskId = req.params.id
    const task = FINDING(taskId)

    if (task) {
      res.status(200).json(task)
    } else {
      res.status(404).json({
        message: 'Task NOT found.'
      })
    }
  } else {
    return res.status(403).json({ message: 'Not logged in' })
  }
})

// Hauptanforderung 4
// Quelle: Eigene Dokumente des modules 295 und Beispiel von Robin Bühler
function changeTask (task) {
  tasks = tasks.map((t) => t.id === task.id ? task : t)
}

app.put('/tasks/:id', (req, res) => {
  if (req.session.email) {
    const now = new Date()
    const nowJSON = now.toJSON()

    const id = req.params.id
    const NewTask = {
      id,
      titel: req.body.Titel,
      ersteller: 'Max Muster',
      email: req.session.email,
      erstelldatum: nowJSON,
      beendet: null
    }

    if (id) {
      changeTask(NewTask)
      res.status(200).json(NewTask)
    } else {
      res.status(404).json({
        message: 'Task NOT found.'
      })
    }

    res.json(FINDING(id))
  } else {
    return res.status(403).json({ message: 'Not logged in' })
  }
})

// Hauptanforderung 5
// Quelle: Eigene Dokumente des modules 295 und Beispiel von Robin Bühler
function removeTask (id) {
  tasks = tasks.filter((t) => t.id !== id)
}

app.delete('/tasks/:id', (req, res) => {
  if (req.session.email) {
    const id = req.params.id
    if (id) {
      res.json(FINDING(id))
      res.status(202).json({
        message: 'Task  found.'
      })
      res.json(removeTask(id))
    } else {
      res.status(404).json({
        message: 'Task NOT found.'
      })
    }
  } else {
    return res.status(403).json({ message: 'Not logged in' })
  }
})

// Authentifizierung
// Authentifizierung
// Authentifizierung

// Sämtliche Authentifizierungs Sachen sind inspiriert von den SlyDev Slides und eigenarbeit des Modules 295
// https://openscript.github.io/course-zli-m295/#/83?clicks=0
// Vorarbeiten
const password = 'm295'

// Anforderung 6
app.post('/login', function (req, res) {
  const email = req.body.email
  const thisPassword = req.body.password

  if (!email || !thisPassword) {
    return res.status(400).json({
      error: 'Passwort, oder Email Fehlen.'
    })
  }

  if (thisPassword === password) {
    req.session.email = true
    return res.status(200).json({ email: req.session.email })
  }

  return res.status(401).json({ message: 'Falsche Email, oder Passwort' })
})

// Anforderung 7
app.get('/verify', function (req, res) {
  console.log(req.session)
  if (req.session.email) {
    return res.status(200).json({ email: req.session.email })
  }

  return res.status(401).json({ error: 'Not logged in' })
})

// Anforderung 8
app.delete('/logout', function (req, res) {
  if (req.session.email) {
    req.session.email = null
    return res.status(204).json({ message: 'Erfolgreich ausgelogt' })
  }
  return res.status(401).json({ message: 'Not logged in' })
})

// Zusätzliche Anforderungen

app.get('/', (req, res) => {
  res.status(406).json({ message: 'Hier gibt es nichts' })
})

app.listen(port, () => {
  console.log('Server is running on port 3000')
})

app.get('/*', (req, res) => {
  res.status(404).json({ message: 'Seite existiert nicht' })
})
