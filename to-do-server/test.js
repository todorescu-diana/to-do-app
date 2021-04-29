"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.getOne = exports.getAll = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
(async function () {
    await deleteOne(3);
    await delay();
})();
async function getAll() {
    try {
        var r = await node_fetch_1.default("http://localhost:3333/to-do");
        console.log(await r.json());
        console.log(r);
    }
    catch (e) {
        console.log(e);
    }
}
exports.getAll = getAll;
;
async function getOne(id) {
    try {
        var r = await node_fetch_1.default(`http://localhost:3333/to-do/${id}`);
        console.log(r);
        console.log(await r.json());
    }
    catch (e) {
        console.log(e);
    }
}
exports.getOne = getOne;
;
async function add() {
    try {
        var r = await node_fetch_1.default("http://localhost:3333/to-do", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "new to do" + new Date().getTime()
            })
        });
        console.log(r);
        console.log(await r.json());
    }
    catch (e) {
        console.log(e);
    }
}
;
async function change(id) {
    try {
        var r = await node_fetch_1.default(`http://localhost:3333/to-do/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "new to do changed - " + new Date().getTime()
            })
        });
        console.log(r);
        console.log(await r.json());
    }
    catch (e) {
        console.log(e);
    }
}
;
async function deleteOne(id) {
    try {
        var r = await node_fetch_1.default(`http://localhost:3333/to-do/${id}`, {
            method: "DELETE",
        });
        console.log(r);
        console.log(await r.json());
    }
    catch (e) {
        console.log(e);
    }
}
;
function delay(ms = 3000) {
    return new Promise((r) => setTimeout(r, ms));
}
exports.delay = delay;
//# sourceMappingURL=test.js.map