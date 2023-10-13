const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./config/db')
const User = require('./controller/userController')
const Expense = require('./controller/expenseController')
const cors = require('cors');
const incomes = require('./controller/incomeController')
app.use(cors('*'));
const corsOptions ={
    origin:['http://localhost:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(bodyParser.json())

app.post('/register',User.userRegister)
app.post('/tokens',User.userLogin)
app.delete('/users/:id',User.userDelete)


// -------------------------------------------------------------------------------------------

app.post('/expenses/:userId',Expense.addExpense)
app.delete('/expenses/:_id',Expense.deleteExpense)
app.put('/expenses/:_id',Expense.updateExpense)
app.get('/expenses/:userId',Expense.displayExpense)



//-----------------------------------------------------------------------------------------------

app.post('/users/:userId/income',incomes.addIncome)
app.get('/users/:userId/income',incomes.displayIncome)


const port = 3005
app.listen(port, () => { 
       console.log(`Example app listening on port ${port}`)
       console.log("Running");
     })