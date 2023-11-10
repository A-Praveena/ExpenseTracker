const { response } = require('express');
const Expense = require('../model/expenseSchema');
const { DateTime } = require('luxon');


const addExpense = async (request, response) => {
    try {
        const userId = request.params.userId;
        const amount = request.body.amount;
        const notes = request.body.description;
        const date = DateTime.fromISO(request.body.date, { zone: 'Asia/Kolkata' }).toJSDate();
        // Adjust the date with the timezone offset
        const offsetInMinutes = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offsetInMinutes);
        const categories = request.body.selectedCategory;
        const expenseEntry = new Expense({
            userId,
            amount,
            notes,
            createdAt: date,
            categories
        });
        console.log("ExpenseEntry", expenseEntry)
        const expenseDetails = await expenseEntry.save();

        response.json({
            message: "Expense added successfully",
            status: "true",
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
    console.log("Update Expense");
    const expenseId = request.params._id;
    console.log(request.body);
    const { userId, amount, notes, categories } = request.body;


    try {
        const fieldsToUpdate = {};


        if (request.body.categories) {
            fieldsToUpdate.categories = request.body.categories;
        }

        if (request.body.notes) {
            fieldsToUpdate.notes = request.body.notes;
        }

        if (request.body.amount) {
            fieldsToUpdate.amount = request.body.amount;
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            expenseId, { $set: fieldsToUpdate }, { new: true }
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


const deleteExpense = async (request, response) => {
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
        //console.log(userId);
        const Expensedata = await Expense.find({ userId: userId });
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

