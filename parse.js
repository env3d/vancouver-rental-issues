const fs = require('fs');
const fetch = require('node-fetch');
const sqlite = require('sqlite');

async function writeToDB(db) {

  fetch('https://opendata.vancouver.ca/explore/dataset/rental-standards-current-issues/download/?format=csv&timezone=America/Los_Angeles&use_labels_for_header=true')
    .then( res => {
      return res.text();
    }).then( csv => {
      let lines = csv.split('\n');
      lines.forEach( line => {
        let rec = line.replace(/'/g, "''").trim().split(';');
        if (rec[4] == ' ') rec[4] = '0';
		    let sql = [`INSERT into issues (operator, businessURL, street_number, street, total_outstanding, total_units, geom, area)`,
                   `VALUES ('${rec[0]}', '${rec[1]}', '${rec[2]}', '${rec[3]}', ${rec[4]}, ${rec[5]}, '${rec[6]}', '${rec[7]}')`].join('\n');
        
		    //console.log(sql);    
		    db.exec(sql).catch( err => {console.log(sql); console.log(err)} );        
      });
      
    });    
}

sqlite.open('database.sqlite').then( async (db) => {
	//console.log('database opened', db);
	
	await db.all(`DROP TABLE IF EXISTS issues`);
	
	await db.all(`CREATE TABLE issues (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
    operator TEXT,
    businessURL TEXT,
    street_number TEXT,
    street TEXT,
    total_outstanding INTEGER,
    total_units INTEGER,
    geom TEXT,
    area TEXT
	)`);
	
	await writeToDB(db);
  
});
