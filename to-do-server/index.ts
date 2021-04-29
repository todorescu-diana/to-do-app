import express from 'express';
import bodyParser from 'body-parser';
import data from './data.json'
import fs from 'fs'

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

function saveData() {
    const fd = fs.openSync("./data.json", "w");
    try {
        fs.writeSync(fd ,JSON.stringify(data, undefined, 2));
    }
    finally {
        fs.closeSync(fd);
    }
}

app.get("/to-do/:id", (req, res) => {
    let id = +req.params["id"]
    let todo = data.todos.find(p => p.id === id);
    if (!todo) {
        res.status(404);
        res.send("ToDo not found");
    } else {
        res.json(todo);
    }
});

app.get("/to-do", (req, res) => {
    let todos = data.todos;
    let search = req.query["search"] as string | undefined;
    if (search) {
        todos = todos.filter(p => Object.values(p).some(v => `${v}`.includes(search)));
    }
    res.contentType("application/json");
    res.json(todos);
});

app.delete('/to-do/:id', (req, res) => {
    let id = +req.params["id"]
    data.todos = data.todos.filter(p => p.id !== id);
    saveData();
    res.status(200);
    res.end();
})


app.post("/to-do", (req, res) => {
    let todos = data.todos;
    const todo = {
        ...req.body,
        id: 1 + todos.reduce((a, b) => Math.max(a, b.id), 0)
    }
    
    todos.push(todo);
    saveData();
    res.contentType("application/json");
    res.json(todo);
})


app.delete("/to-do/:id", (req, res) => {
    let id = +req.params["id"]
    data.todos = data.todos.filter(p => p.id !== id);
    saveData();
    res.status(200);
    res.end();
});
app.put("/to-do/:id", (req, res) => {
    let todos = data.todos;
    let id = +req.params["id"]
    let todo = todos.find(p => p.id === id);
    if (!todo) {
        res.status(404);
        res.send("To do not found");
    } else {
        Object.assign(todo, req.body);
        saveData();
        res.json(todo);
    }
})

app.listen(3333);