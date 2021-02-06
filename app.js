
const express = require('express');
const app = express();

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

function setupServer(db) {

  app.get('/info', (req, res) => {
    res.send('Vancouver landlord complaints database');
  });
  
  app.get('/streets', (req, res) => {
    db.all(`SELECT DISTINCT(street) FROM issues`)
      .then( data => {
        console.log(data);
        res.send(data);
      });
  });

  app.get('/streets/:street/', (req, res) => {

    let streetName = req.params.street;

    db.all(`SELECT * FROM issues WHERE street = '${streetName}'`)
      .then( data => {
        res.send(data);              
      });    
  });

  app.get('/operators', (req, res) => {
    db.all(`SELECT DISTINCT(operator) FROM issues`)
      .then( data => {
        res.send(data);              
      });    
  });

  app.get('/operators/:operator/', (req, res) => {
    let operator = req.params.operator;

    db.all(`SELECT * FROM issues WHERE operator='${operator}'`)
      .then( data => {
        res.send(data);              
      });    
  });

  app.get('/issues/:top', (req, res) => {
    let limit = req.params.top;
    
    db.all(`SELECT * FROM issues ORDER BY total_outstanding DESC LIMIT ${limit}`)
      .then( data => {
        res.send(data);              
      });    
  });

  app.get('/areas', (req, res) => {    
    db.all(`SELECT DISTINCT(area) FROM issues`)
      .then( data => {
        res.send(data);              
      });    
  });  
  
  app.get('/areas/:area', (req, res) => {
    let area = req.params.area;
    
    db.all(`SELECT * FROM issues WHERE area = '${area}'`)
      .then( data => {
        res.send(data);              
      });    
  });

  
  let server = app.listen(3003, () => {
    console.log('Server ready', server.address().port);
  });
  
}

sqlite.open( {
	filename: 'database.sqlite',
	driver: sqlite3.Database
}).then( db => {
	//console.log('database opened', db);

  setupServer(db);
  //return db.all('SELECT * from TEST');
  
})

