const { response } = require('express');
const Expense = require('../model/expenseSchema');

const addExpense = async (request, response) => {
    try {
        const userId=request.params.userId;
        console.log(request.body);
        // const {  amount, notes,date, categories } = request.body;
        const amount = request.body.amount;
        const notes = request.body.description;
        const date = request.body.date;
        const categories = request.body.selectedCategory;
        console.log("data",userId,amount, notes,date, categories);
        const expenseEntry = new Expense({
            userId,
            amount,
            notes,
            date,
            categories
        });
        const expenseDetails = await expenseEntry.save();

        response.json({
            message: "Expense added successfully",
            status:"true",
            data: {
                Id: expenseDetails._id
            }
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({ message: "Error while adding expense data" });
    }
};

// controllers/expenseController.js


// Controller function to update an expense by ID
const updateExpense = async (request, response) => {
    const expenseId  = request.params._id;
    console.log(expenseId)
    const { userId, amount, notes, categories } = request.body;

    try {
        // Find the expense by ID and update its properties
        const updatedExpense = await Expense.findByIdAndUpdate(
            expenseId,
            {
                userId,
                amount,
                notes,
                categories
            },
            { new: true } // Return the updated document
        );

        if (!updatedExpense) {
            return response.status(404).json({ message: 'Expense not found' });
        }

        response.json({ message: 'Expense updated successfully', data: updatedExpense });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error while updating expense' });
    }
};


const deleteExpense = async(request,response) => {
    try {
        const expenseId = request.params._id
        const expensedelete = await Expense.findByIdAndDelete(expenseId);

    if (!expensedelete) {
      return response.status(404).json({ message: 'No expense data  found' });
    }

    response.json({ message: 'Expense data deleted successfully' });
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Server error' });
  }
    };

    const displayExpense = async (request, response) => {

        try {
            const userId = request.params.userId;
            console.log(userId);
            const Expensedata = await Expense.find({ userId: userId});
            response.status(200).json({
                data: {
                    data: Expensedata 
                }
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Error fetching Expense data' });
        }
    
    }





module.exports.addExpense = addExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.updateExpense = updateExpense;
module.exports.displayExpense = displayExpense;

