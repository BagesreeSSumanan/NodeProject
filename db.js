const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const db = {};
// create db if it doesn't already exist
const  dbhost= process.env.HOST;
const dbport =process.env.DB_PORT;
const dbuser=process.env.DB_USER;
const dbpassword=process.env.DB_PASSWORD;
const  database=process.env.DATABASE;
const dbdialect=process.env.dbdialect ;
console.log("dbhost",dbhost)
console.log("dbport",dbport)
console.log("database",database)
console.log("dbpassword",dbpassword)
const pool =  mysql.createPool({ 
   host:dbhost, 
   port:dbport,
   user: dbuser, password:dbpassword });
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

const sequelize = new Sequelize(database, dbuser, dbpassword,{
  host: dbhost,
  dialect: "mysql"
});
db.Employee = require('./model')(sequelize, Sequelize);
sequelize.sync() 
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
module.exports = db;


