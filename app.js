const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./config/db')
const User = require('./controller/userController')
const Expense = require('./controller/expenseController')
const cors = require('cors');
app.use(cors('*'));
const corsOptions ={
    origin:['http://localhost:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(bodyParser.json())

app.post('/register',User.userRegister)
app.post('/login',User.userLogin)
app.delete('/delete/:id',User.userDelete)


// -------------------------------------------------------------------------------------------

app.post('/expense/add/:userId',Expense.addExpense)
app.delete('/expense/delete/:_id',Expense.deleteExpense)
app.put('/expense/update/:_id',Expense.updateExpense)
app.get('/expense/display/:userId',Expense.displayExpense)


const port = 3005
app.listen(port, () => {
       console.log(`Example app listening on port ${port}`)
     })