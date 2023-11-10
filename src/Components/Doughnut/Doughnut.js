import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import money from '../../assets/money.png';
import '../ExpenseCard/ExpenseCard.css';
import axios from 'axios';
import { BiSignal4 } from "react-icons/bi";
const userId = localStorage.getItem("userId")
ChartJS.register(ArcElement, Tooltip, Legend);



export default function DoughnutChart() {


  const [expense, setExpense] = useState(null);

  const [error, setError] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);

  const [percentageUsed, setPercentageUsed] = useState(null);


  const today = new Date();
  const lastSevenDays = new Date(today);
  lastSevenDays.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState(lastSevenDays.toISOString());
  const [endDate, setEndDate] = useState(today.toISOString());

  useEffect(() => {
    const budget = 5000; // Replace this with your predefined budget value
    axios.get(`http://localhost:3005/expenses/${userId}`)
      .then((response) => {
        console.log("Doughnut;;;;;",response.data.data.data);
        setExpense(response.data.data.data);
       
        const currentDate = new Date();
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
       // Filter the expenses for the last 7 days
       const expensesLast7Days = response.data.data.data.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
      });

      console.log("Expenses for the last 7 days:", expensesLast7Days);
      setExpense(expensesLast7Days);

      // Calculate total expense for the last 7 days
      const totalExpenseLast7Days = expensesLast7Days.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);

      console.log("Total expense for the last 7 days:", totalExpenseLast7Days);
      setTotalExpense(totalExpenseLast7Days);

      // Calculate percentage used
      const percentageUsed = (totalExpenseLast7Days / budget) * 100;

      setPercentageUsed(percentageUsed);

      })
      .catch((error) => {
        console.error(error);
        setError(error.message); // Set the error state
      });
  }, [userId]);

  // Render loading state if expense is null
  if (expense === null) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }




  // Parse the ISO dates into JavaScript Date objects
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  // Format the startDate
  const options = { month: 'short', day: 'numeric' };
  const formattedStartDate = startDateTime.toLocaleDateString(undefined, options);

  // Format the endDate
  const formattedEndDate = endDateTime.toLocaleDateString(undefined, options);

  // Output formatted dates
  // console.log("Formatted startDate", formattedStartDate);
  // console.log("Formatted endDate", formattedEndDate);

  // Prepare chart data based on expense categories and their respective amounts
  const categoryAmounts = {
    general: 0,
    food: 0,
    transportation: 0,
    entertainment: 0,
  };

  if (expense) {
    expense.forEach((item) => {
      if (item.categories) {
        const categoryKey = item.categories.toLowerCase(); // Transform to lowercase
        categoryAmounts[categoryKey] = (categoryAmounts[categoryKey] || 0) + item.amount;
      }
    });
  }

  // console.log("categoryAmounts", categoryAmounts);

  const chartData = {
    labels: Object.keys(categoryAmounts),
    datasets: [
      {
        data: Object.values(categoryAmounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div>
      <div>

        <div className="ExpenseCard-Section-doughnut" style={{ display: "block;" }}>


          <div className='ExpenseCard-head'>
            <div className='ExpenseCard-head-content'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div style={{ fontSize: "1.2rem" }}>


                  {formattedStartDate} - {formattedEndDate}

                </div>
              </div>
              <div style={{ fontSize: "2rem" }}>₹{totalExpense}</div>
            </div>
            <div style={{ fontSize: "1.2rem" }}>

              <span>{percentageUsed}% Budget used</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chart" style={{ height: "460px", width: "100%" }}>
        {/* Your content goes here */}
        <Doughnut data={chartData} />
      </div>

      <div><div className="spend-analysis-section">
        <div className="custom-text">
          <BiSignal4 />
        </div>
        <div className="bg-jp-black rounded-full lg:w-2/3 w-fit  h-12 relative top-3 p-2 mb-8 lg:mb-3">
          <h1>Spend Analysis</h1>
        </div>
      </div></div>
    </div>
  );
}
