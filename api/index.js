const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');

const halfHour = 1800
const tempQuery = `SELECT * FROM observations WHERE timestamp > UNIX_TIMESTAMP() - ${halfHour}`

// Connect to mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'writer',
    password: 'writer',
    database: 'observations',
});

connection.connect();

// Define schema for grapql
const schema = buildSchema(`
        type Data {
            temperature: Int,
            pressure: Int,
            relativehumidity: Int,
            timestamp: Int
            date: String,
            time: String
        }
        type Query {
            temperatures: [Data],
        }
`
);


function querySQL(query) {
    return new Promise(function (resolve, reject) {
        connection.query(query, (error, results) => {
            const stringify = JSON.stringify(results)
            const json = JSON.parse(stringify)
            resolve(json)
        })
    });
}
async function queryTemperatures(){
    const values = await querySQL(tempQuery);
    return values;
}
// Define functions for graphql
const root = {
    temperatures: queryTemperatures
}

const app = express()

app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true,
      rootValue: root,
}));

app.listen(4000);

console.log('Running')
