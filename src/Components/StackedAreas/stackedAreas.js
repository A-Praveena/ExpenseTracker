import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
const userId = localStorage.getItem("userId");

export default function StackedAreas() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to keep track of the chart instance
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/users/${userId}/income`)
      .then((response) => {
        const responseData = response.data.data.data;

    if (responseData && Array.isArray(responseData) && responseData.length > 0) {
      
      const income = responseData.map(item => item.income);
      setIncomeData(income);
    } else {
      console.log("Invalid API Response Format or Empty Data Array");
      
    }
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios.get(`http://localhost:3005/expenses/${userId}`)
      .then((response) => {

        const expenseResponseData = response.data.data.data;
       
    if (expenseResponseData && Array.isArray(expenseResponseData) && expenseResponseData.length > 0) {
       
      const income = expenseResponseData.map(item => item.income);
      setIncomeData(income);

      // Calculate month-wise total expense
      const monthWiseTotalExpense = expenseResponseData.reduce((accumulator, currentItem) => {
        const expenseMonth = new Date(currentItem.createdAt).getMonth();
        accumulator[expenseMonth] = (accumulator[expenseMonth] || 0) + currentItem.income;
        return accumulator;
      }, {});

      console.log("Month-wise Total Expense", monthWiseTotalExpense);
         
    } else {
      console.log("Invalid API Response Format or Empty Data Array");
      
    }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  useEffect(() => {
    // Check if the chart instance exists and destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const options = {
      scales: {
        y: {
          type: 'linear', // Specify the scale type as 'linear'
          beginAtZero: true,
          min: 0,
          max: 1000,
          stepSize: 100,
          title: {
            display: true,
            text: 'Amount'
          },
        },
      },
    };
    
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October'],
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Expense',
            data: expenseData,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          },
          // Add more datasets for additional series
        ],
      },
      options: options,
    });

    // Cleanup: destroy the chart when the component unmounts
   return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [incomeData, expenseData]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h2 style={{ color: "#fff", paddingBottom: "2%" }}>Income - Expense Analysis </h2>
      <canvas ref={chartRef} />
    </div>
  );
}
