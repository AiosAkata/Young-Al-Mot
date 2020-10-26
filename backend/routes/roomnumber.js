const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest: './upload'});

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'emost22',
    database:'yam'
});
db.connect();

exports.roomnumber = app.post('/roomnumber', upload.single(), (req, res) =>{
    let sql = `SELECT * FROM roomlist WHERE nowplayer=0`;
    let roomname = req.body.title;
    let password = req.body.password;
    let gamename = req.body.gametype;
    let maxplayer = req.body.peoplemaxnum;
    if(password == "") password=null;
    
    db.query(sql, [], (err, rows, fields) => {
        if(err) throw err;
        
        if(rows[0]){
            let sql2 = `UPDATE roomlist SET room_name=?, password=?, game_name=?, nowplayer=1, maxplayer=?, createtime=now() WHERE room_no=?`;
            let list = [roomname, password, gamename, maxplayer, rows[0].room_no];
            db.query(sql2, list, (err2, rows2, fields2) => {
                if(err2) throw err2;
                
                return res.json({
                    success: true,
                    roomnum: rows[0].room_no
                });
            })
        } 
    })
});