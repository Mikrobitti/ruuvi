const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');

const halfDay = 43200
const measurementsQuery = `SELECT * FROM observations WHERE timestamp > UNIX_TIMESTAMP() - 9000000`

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
            measurements: [Data],
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
async function queryMeasurements(){
    const values = await querySQL(measurementsQuery);
    return values;
}
// Define functions for graphql
const root = {
    measurements: queryMeasurements
}

const app = express()

app.use(express.static('../frontend'))
app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true,
      rootValue: root,
}));

app.listen(4000);

console.log('Running')
