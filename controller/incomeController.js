const { response } = require('express');
const Income = require('../model/incomeSchema');

const addIncome = async (request, response) => {
    try {
        const userId=request.params.userId;
        console.log(request.body);
        // const {  amount, notes,date, categories } = request.body;
        const income = request.body.income;
        const date = request.body.date;
        console.log("data",userId,income,date);
        const incomeEntry = new Income({
            userId,
            income,
            date
        });
        const incomeDetails = await incomeEntry.save();

        response.json({
            message: " added successfully",
            status:"true",
            data: {
                Id: incomeDetails._id
            }
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({ message: "Error while adding income data" });
    }
};


const displayIncome = async (request, response) => {

    try {
        const userId = request.params.userId;
        //console.log(userId);
        const Incomedata = await Income.find({ userId: userId});
        response.status(200).json({
            data: {
                data: Incomedata 
            }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error fetching Expense data' });
    }

}


module.exports.addIncome = addIncome ;
module.exports.displayIncome = displayIncome;