const db = require('./db');
const Employee = db.Employee;
 
 async function  insertEmployee(name, designation, email, age) {
  await Employee.create({name, designation, email, age});
}

async function getOneEmployee(id) {
  const employee = await Employee.findByPk(id);
   return employee;

  }
async function getAllEmployees() {
const employees = await Employee.findAll();
  return employees;

}
module.exports = {
  insertEmployee,
  getOneEmployee,
  getAllEmployees
};
