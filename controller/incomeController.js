const { response } = require('express');
const Income = require('../model/incomeSchema');
const { DateTime } = require('luxon');

const addIncome = async (request, response) => {
    try {
        const userId=request.params.userId;
        // const {  amount, notes,date, categories } = request.body;
        const income = request.body.income;
        const incomedate = DateTime.fromISO(request.body.date, { zone: 'Asia/Kolkata' }).toJSDate();
        // Adjust the date with the timezone offset
        const offsetInMinutes = incomedate.getTimezoneOffset();
        incomedate.setMinutes(incomedate.getMinutes() - offsetInMinutes);
        const incomeEntry = new Income({
            userId,
            income,
            createdAt:incomedate
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