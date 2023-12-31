const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    income: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
      },

});

const Income = mongoose.model('Income', incomeSchema); 

module.exports = Income;
