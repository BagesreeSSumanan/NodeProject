const express = require('express');
const config = require('./config');
const empRouter = express.Router();
const app = express();
require('dotenv').config();
const   insertEmployee= require('./empController');
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

// app.get('/', (req, res) => {
//   res.send('Welcome to Employee API');
// });