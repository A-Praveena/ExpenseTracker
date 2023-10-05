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



export const data = {
  labels: ['General', 'Food', 'Enertainment', 'Transportation', 'Shopping', 'Groceries'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
export default function DoughnutChart() {


  const [expense, setExpense] = useState(null); // Initialize to null

  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    axios.get(`http://localhost:3005/expense/display/${userId}`)
      .then((response) => {
        // console.log(response.data.data.data);
        setExpense(response.data.data.data);
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

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <div>

        <div className="ExpenseCard-Section">


          <div className="lg:col-span-4 ml-3 lg:ml-0 mt-2 lg:mt-2 ">
            <div className="flex">
              <div className="flex text-jp-yellow bg-jp-black rounded-xl w-fit px-2 py-1 ">



              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart" style={{height:"510px",width:"100%"}}>
        {/* Your content goes here */}
        <Doughnut data={data} />
      </div>

      <div><div className="spend-analysis-section">
        <div className="custom-text">
          <BiSignal4/>
        </div>
        <div className="bg-jp-black rounded-full lg:w-2/3 w-fit  h-12 relative top-3 p-2 mb-8 lg:mb-3">
          <h1>Spend Analysis</h1>
        </div>
      </div></div>
    </div>
  );
}
