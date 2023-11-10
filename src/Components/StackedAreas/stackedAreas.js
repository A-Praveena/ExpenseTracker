import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
const userId = localStorage.getItem("userId");

export default function StackedAreas() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(`http://localhost:3005/users/${userId}/income`);
        const expenseResponse = await axios.get(`http://localhost:3005/expenses/${userId}`);
  
        const incomeData = incomeResponse.data.data.data;
        const expenseData = expenseResponse.data.data.data;
  
        // Organize income data by month
        const incomeByMonth = new Array(12).fill(0);
        incomeData.forEach((income) => {
          const month = new Date(income.createdAt).getMonth(); // Get month (0-indexed)
          incomeByMonth[month] += income.income;
        });
  
        // Organize expense data by month
        const expenseByMonth = new Array(12).fill(0);
        expenseData.forEach((expense) => {
          const month = new Date(expense.createdAt).getMonth(); // Get month (0-indexed)
          expenseByMonth[month] += expense.amount;
        });
  
        setIncomeData(incomeByMonth);
        setExpenseData(expenseByMonth);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [userId]);
  

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const options = {
      scales: {
        y: {
          type: 'linear',
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December'],
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
        ],
      },
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [incomeData, expenseData]);

  return (
    <div>
      <h2 style={{ color: "#fff", paddingBottom: "2%" }}>Income - Expense Analysis </h2>
      <canvas ref={chartRef} />
    </div>
  );
}
