const db = require('./db');
const Employee = db.Employee;
 
 async function  insertEmployee(name, designation, email, age) {
  await Employee.create({name, designation, email, age});
}
module.exports =  insertEmployee;
