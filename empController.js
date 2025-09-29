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
async function updateEmployee (name, designation, email, age, id){
    await Employee.update({name, designation, email, age}, { where: {id: id}});
 }
module.exports = {
  insertEmployee,
  getOneEmployee,
  getAllEmployees,
  updateEmployee
};
