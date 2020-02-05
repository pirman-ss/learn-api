const express = require("express");
const bodyParser = require("body-parser");
const todos = require("./todos");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

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

app.post("/", (req, res) => {
    const { id, todo } = req.body;

    todos.push({ id: parseInt(id), todo });

    res.send({ message: "Your data is added", data: todos });
});

app.get("/:id", (req, res) => {
    const{id} = req.params

    const todo = todos.filter (item => {
        if(item.id == id) {
            return item
        }
    })
    
    res.send({ message: `This is todo with ${id},`, data: todo });
});

app.delete("/:id", (req, res) => {
    const{id} = req.params

    const todo = todos.filter (item => {
        if(item.id == id) {
            return item
        }
    })
    
    res.send({ message: `This is todo with ${id},`, data: todo });
});

app.delete("/", (req, res) => {

    todos.splice(0, todos.length);

    res.send({ message: `Your data has been delete all`, data: todos });
});

app.listen(PORT, () => {
    console.log(`My API is listen on PORT: ${PORT}`);
});