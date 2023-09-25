const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
    },
    categories: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
      },

});

const Expense = mongoose.model('Expense', expenseSchema); 

module.exports = Expense; // Export the model
