import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

const userId = localStorage.getItem("userId");

export default function StackedAreas() {
  const chartRef = useRef(null);
  const [data, setData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          axios.get(`http://localhost:3005/users/${userId}/income`),
          axios.get(`http://localhost:3005/expenses/${userId}`)
        ]);

        
        const incomeData = incomeResponse.data.data;
        const expenseData = expenseResponse.data.data;

        
        setData({ income: incomeData, expense: expenseData });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (!loading && (data.income.length > 0 || data.expense.length > 0)) {
      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.income.map((_, index) => `Entry ${index + 1}`),
          datasets: [
            {
              label: 'Income',
              data: data.income.map(entry => entry.income), 
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Expense',
              data: data.expense.map(entry => entry.expense),
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      
      return () => {
        chartInstance.destroy();
      };
    }
  }, [loading, data]);

  return (
    <div>
      <h2 style={{ color: "#fff", paddingBottom: "2%" }}>Income - Expense Analysis </h2>
      {loading ? <p>Loading...</p> : <canvas ref={chartRef} />}
    </div>
  );
}
