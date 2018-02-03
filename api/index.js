const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');

const halfHour = 1800
const tempQuery = `SELECT temperature FROM observations WHERE timestamp > UNIX_TIMESTAMP() - ${halfHour}`
const relHumQuery = `SELECT relativehumidity FROM observations WHERE timestamp > UNIX_TIMESTAMP() - ${halfHour}`
const presQuery = `SELECT pressure FROM observations WHERE timestamp > UNIX_TIMESTAMP() - ${halfHour}`

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
        type TempData {
            temperature: Int
        }
        type PresData {
            pressure: Int
        }
        type RelHumData {
            relativehumidity: Int
        }
        type Query {
            temperatures: [TempData],
            pressures: [PresData],
            relativehumidities: [RelHumData],
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
async function queryPressures(){
    const values = await querySQL(presQuery);
    return values;
}
async function queryRelativeHumidities(){
    const values = await querySQL(relHumQuery);
    return values;
}
// Define functions for graphql
const root = {
    temperatures: queryTemperatures,
    pressures: queryPressures,
    relativehumidities: queryRelativeHumidities,
}

const app = express()

app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true,
      rootValue: root,
}));

app.listen(4000);

console.log('Running')
