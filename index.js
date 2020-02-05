const express = require("express");
const bodyParser = require("body-parser");
const todos = require("./todos");


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Get data all
app.get("/", (req, res) => {
    res.send({ message: "Welcome to my API", data: todos });
});

app.get("/hello", (req, res) => {
    res.send({
        message: "This is hello route"
    });
});

app.get("/hello/:id", (req, res) => {
    const { id } = req.params;

    res.send({
        message: `This is hello route with params ${id}`
    });
});

// Post data
app.post("/", (req, res) => {
    const { id, todo } = req.body;

    todos.push({ id: parseInt(id), todo });

    res.send({ message: "Your data is added", data: todos });
});

// Get data by id
app.get("/:id", (req, res) => {
    const{id} = req.params

    const todo = todos.filter (item => {
        if(item.id == id) {
            return item
        }
    })
    
    res.send({ message: `This is todo with ${id},`, data: todo });
});

// Delete data all
app.delete("/", (req, res) => {

    todos.splice(0, todos.length);

    res.send({ message: `Your data has been delete all`, data: todos });
});

app.delete("/:id", (req, res) => {
    let id = req.params.id;


    res.send({ message: `Your data in ${id} has been delete`});
});

app.listen(3001, () => {
    console.log("My API is listen on PORT:3001");
});