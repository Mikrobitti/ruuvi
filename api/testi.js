const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'writer',
    password: 'writer',
    database: 'observations',
})

connection.connect();

const queryString = `
SELECT * FROM observation;
`
console.log(queryString)
connection.query(queryString, (error, results) => {
    if (error) throw error;
    console.log(results)
})

connection.end();

