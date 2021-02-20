const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')

let usuario = getRandonUser();

function getRandonUser(){
    return `Fulano - ${uuidv4()}`
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


app.get('/', function(req, res, next) {   

    cadastrarUsuario();

    listarUsuarios(function (err, driverResult){ 
       
       res.send(driverResult);

    });
});


function listarUsuarios(callback) {    
 
    let connection = mysql.createConnection(config);

    connection.query("SELECT * FROM people",
        function (err, rows) {
            
            callback(err, rows); 
        }
    );    
}



function cadastrarUsuario(){
    let connection = mysql.createConnection(config)
    let sql = `INSERT INTO people(name) values('${usuario}')`    
    connection.query(sql)
    connection.end()
}


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})