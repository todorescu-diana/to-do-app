"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_json_1 = __importDefault(require("./data.json"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({extended: true}));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
function saveData() {
    const fd = fs_1.default.openSync("./data.json", "w");
    try {
        fs_1.default.writeSync(fd, JSON.stringify(data_json_1.default, undefined, 2));
    }
    finally {
        fs_1.default.closeSync(fd);
    }
}
app.get("/to-do/:id", (req, res) => {
    let id = +req.params["id"];
    let todo = data_json_1.default.todos.find(p => p.id === id);
    if (!todo) {
        res.status(404);
        res.send("ToDo not found");
    }
    else {
        res.json(todo);
    }
});
app.get("/to-do", (req, res) => {
    let todos = data_json_1.default.todos;
    let search = req.query["search"];
    if (search) {
        todos = todos.filter(p => Object.values(p).some(v => `${v}`.includes(search)));
    }
    res.contentType("application/json");
    res.json(todos);
});
app.delete('/to-do/:id', (req, res) => {
    let id = +req.params["id"];
    data_json_1.default.todos = data_json_1.default.todos.filter(p => p.id !== id);
    saveData();
    res.status(200);
    res.end();
});
app.post("/to-do", (req, res) => {
    let todos = data_json_1.default.todos;
    const todo = Object.assign(Object.assign({}, req.body), { id: 1 + todos.reduce((a, b) => Math.max(a, b.id), 0) });
    todos.push(todo);
    saveData();
    res.contentType("application/json");
    res.json(todo);
});
app.delete("/to-do/:id", (req, res) => {
    let id = +req.params["id"];
    data_json_1.default.todos = data_json_1.default.todos.filter(p => p.id !== id);
    saveData();
    res.status(200);
    res.end();
});
app.put("/to-do/:id", (req, res) => {
    let todos = data_json_1.default.todos;
    let id = +req.params["id"];
    let todo = todos.find(p => p.id === id);
    if (!todo) {
        res.status(404);
        res.send("To do not found");
    }
    else {
        Object.assign(todo, req.body);
        saveData();
        res.json(todo);
    }
});
app.listen(3333);
//# sourceMappingURL=index.js.map