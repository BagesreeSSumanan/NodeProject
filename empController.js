const db = require('./db');
const Employee = db.Employee;
 module.exports ={
  insertEmployee,

 };

 async function  insertEmployee(name, designation, email, age) {
  await Employee.create({name, designation, email, age});
}