const express = require('express');
const config = require('./config');
const empRouter = express.Router();
const app = express();
require('dotenv').config();
const { insertEmployee, getOneEmployee,getAllEmployees,updateEmployee }= require('./empController');
// const port = 3000;
app.use(express.json());
const PORT = process.env.PORT
console.log(PORT);
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

// app.post('/', (req, res) => {

//   res.send('Got a POST request')

// })


// app.put('/user', (req, res) => {

//   res.send('Got a PUT request at /user')

// })
// app.delete('/user', (req, res) => {

//   res.send('Got a DELETE request at /user')

// })


// app.post('/api/users', (req, res) => {
//   const { name, email } = req.body;

//   const newUser = {
//     id: Date.now(),
//     name,
//     email
//   };
//   res.status(201).json({
//     message: 'User created successfully',
//     user: newUser
//   });
// })

// let users = [
//   { id: 1, name: "Bagesree", email: "bagesree@xminds.com" },
//   { id: 2, name: "Hari", email: "hari@gmail.com" }
// ];
// app.put('/api/userUpdate',(req,res)=>{
//     const {id,name, email} = req.body;

//     let user = users.find(u => u.id === parseInt(id));
//     user.name = name;
//     user.email = email;

//     res.status(201).json({
//         message:'User updated successfully',
//         user : user
//     })
// })

// Create an employee
app.use('/employee', empRouter);
  empRouter.post('/',  async (req, res, next)=>{
    console.log("employee post");
     try{
      console.log("try")
         const name = req.body.employee.name;
         console.log("name",name);
         const designation = req.body.employee.designation;
         const email = req.body.employee.email;
         const age = req.body.employee.age;
               if (!name || !designation || !age) {
                 return res.sendStatus(400);
              }
         const employee =  await insertEmployee(name, designation,email,age).then(() => res.json({ message: 'Employee created.' }));
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });

// app.use('/GetEmployee', empRouter);
//   empRouter.get('/',  async (req, res, next)=>{
//     console.log("employee get");
//      try{
//       console.log("try")
//          const id = req.body.id;
//          console.log("id",id);
//           if (!id) {
//               return res.sendStatus(400);
//           }
//           const employee = await getOneEmployee(id); // await resolves the promise
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found.' });
//         }

//         res.json({
//             message: 'Employee retrieved successfully.',
//             employeeDetails: employee
//         });
 
//      } catch(e){
//          console.log(e);
//          res.sendStatus(400);
//      }
//   });

empRouter.get('/:employeeId',  (req, res, next)=>{
     res.status(200).json({employee: req.employee});
  });
  empRouter.param('employeeId', async (req, res, next, employeeId)=> {
     try{
         const employee = await getOneEmployee(employeeId);
         req.employee = employee;
         next(); // go to apiRouter.get('/:employeeId')
     } catch(e) {
         console.log(e);
         res.sendStatus(404);
     }
  });
// app.use('/GetAllEmployee', empRouter);
//   // Get all employees
//  empRouter.get('/', async (req, res, next)=>{
//      try {
//          const employees = await getAllEmployees();
//          res.status(200).json({employees: employees});
//      } catch(e) {
//          console.log(e);
//          res.sendStatus(500);
//      }
//   });
empRouter.get('/', async (req, res, next)=>{
     try {
         const employees = await getAllEmployees();
         res.status(200).json({employees: employees});
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
  });

empRouter.put('/:employeeId',  async (req, res, next)=>{
     try{
         const name = req.body.employee.name;
         const designation = req.body.employee.designation;
         const email = req.body.employee.email;
         const age = req.body.employee.age;
         const employeeId= req.params.employeeId;
               if (!name || !designation || !age) {
                 return res.sendStatus(400);
              }
         const employee =  await updateEmployee(name, designation, email, age, employeeId).then(()=>{return getOneEmployee(employeeId);});
         res.json({employee: employee});
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
