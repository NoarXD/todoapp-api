const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const dateTime = new Date();
// const date = dateTime.getDate();
// const month = dateTime.getMonth();
// const year = dateTime.getFullYear();
// const hour = dateTime.getHours();
// const minute = dateTime.getMinutes();
// const second = dateTime.getSeconds();
// const time = `${year}-${month + 1}-${date} ${hour}:${minute}:${second}`

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "todoapp"
})

app.get('/todo', (req, res) => {
    db.query('SELECT * FROM goals', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/add', (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    db.query('INSERT INTO goals (title, price) VALUE (?,?)', [title, price], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM goals WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen('3001', () => {
    console.log("http://localhost:3001/todo")
})