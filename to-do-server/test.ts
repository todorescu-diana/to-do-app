import fetch from 'node-fetch'

(async function(){
    await deleteOne(3);
    await delay();
})()


export async function getAll() {
    try{
        var r = await fetch("http://localhost:3333/to-do");
        console.log(await r.json())
        console.log(r);
    }catch(e){
        console.log(e);    }
};

export async function getOne(id: number) {
    try{
        var r = await fetch(`http://localhost:3333/to-do/${id}`);
        console.log(r);
        console.log(await r.json())
    }catch(e){
        console.log(e);    }
};


async function add() {
    try{
        var r = await fetch("http://localhost:3333/to-do", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "new to do" + new Date().getTime()
            })
        });
        console.log(r);
        console.log(await r.json())
    }catch(e){
        console.log(e);    }
};

async function change(id: number) {
    try{
        var r = await fetch(`http://localhost:3333/to-do/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "new to do changed - " + new Date().getTime()
            })
        });
        console.log(r);
        console.log(await r.json())
    }catch(e){
        console.log(e);    }
};


async function deleteOne(id: number) {
    try{
        var r = await fetch(`http://localhost:3333/to-do/${id}`, {
            method: "DELETE", 
        });
        console.log(r);
        console.log(await r.json())
    }catch(e){
        console.log(e);    }
};

export function delay(ms = 3000) {
    return new Promise((r) => setTimeout(r, ms));
}