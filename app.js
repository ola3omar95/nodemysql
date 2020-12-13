
const express = require('express');
const mysql = require('mysql');

//create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});


//connect 

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql Connectd ..")
});

const app = express();


//create DB

app.get("createdb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Database created ..");
    });
});

//create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR (255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created..');
    });
});

//insert post 1
app.get('addpost1', (req, res) => {
    let post = { title: 'post one', body: 'This is post number one' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

//insert post 2
app.get('addpost2', (req, res) => {
    let post = { title: 'post two', body: 'This is post number two' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

//select post 
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts Fetched ....');
    });
});

//select single post 
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post Fetched ....');
    });
});

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitla = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitla}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated ....');
    });
});

//Delete post 
app.get('/deletepost/:id', (req, res) => {
    let newTitla = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted ....');
    });
});



app.listen("3000", () => {
    console.log("server started on port 3000");
});