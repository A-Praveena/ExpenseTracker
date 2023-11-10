import React, { useEffect, useState } from 'react';
import axios from 'axios';
import money from '../assets/money.png';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Doughnut } from 'react-chartjs-2';
import Swal from 'sweetalert2';
const userId = localStorage.getItem("userId");


function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

export default function Analysis() {
    const [expense, setExpenses] = useState([]);
    const [totalAmount,setTotalAmount]= useState([]);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        axios.get(`http://localhost:3005/expenses/${userId}`)
          .then((response) => {
            console.log("AAAAAAAAAAAAAAAA", response.data.data.data);
            // Get the current date
            const currentDate = new Date();
            // Get the first day of the current month
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            
            // Filter the expenses for the current month
            const expensesCurrentMonth = response.data.data.data.filter((expense) => {
              const expenseDate = new Date(expense.createdAt);
              return expenseDate >= firstDayOfMonth && expenseDate <= currentDate;
            })
            .map((expense) => {
                // Format the createdAt date to dd/mm/yyyy
                return {
                  ...expense,
                  createdAt: formatDate(expense.createdAt),
                };
              });
    
            setExpenses(expensesCurrentMonth);

            // Calculate total amount using reduce
            const total = expensesCurrentMonth.reduce((accumulator, expense) => {
                return accumulator + parseFloat(expense.amount); // Assuming the amount property is a number
            }, 0);
    
            setTotalAmount(total);
          })
          .catch((error) => {
            console.error(error);
            setError(error.message);
          });
      }, [userId]);

      const handleDelete = (itemId) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:3005/expenses/${itemId}`)
              .then((response) => {
                if (response.status === 200) { // Use === for comparison, not =
                  Swal.fire({
                    text: 'Deleted Successfully',
                    icon: 'success'
                  });
                  setExpenses(prevExpense => prevExpense.filter(item => item._id !== itemId));
                }
                // setExpenses(response);
              })
              .catch((error) => {
                console.error(error);
                // Handle error state if needed
              });
          } else {
            Swal.fire('Cancelled', 'Delete operation canceled', 'info');
          }
        });
      };

      const categoryAmounts = {
        general: 0,
        food: 0,
        transportation: 0,
        entertainment: 0,
    };

    expense.forEach((item) => {
        const categoryKey = item.categories.toLowerCase(); // Transform to lowercase
        categoryAmounts[categoryKey] += item.amount; categoryAmounts[item.categories] += item.amount;
    });

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
        <div className="daily-expense">
           
            <div className="daily-expense-card">
                {expense.map((expense, index) => (
                    <div className="dailyExpenseCard-Section" key={index} style={{ width: "100%" }}>
                        <div className="ExpenseCard-head" style={{ gap: "2%" }}>
                            <div className="custom-bg-rounded">
                                <img src={money}></img>
                            </div>
                            <div className="custom-grid">
                                <div className="flex">
                                    <div className="custom-flex">
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
                                        <p>
                                            {expense.createdAt}
                                        </p>
                                    </div>
                                    <div className="custom-bg">
                                        <p className="custom-text-small">{expense.categories}</p>
                                    </div>
                                </div>
                                <div className="custom-margin ">
                                    <h1 className="font-bold">{expense.notes}</h1>
                                </div>
                            </div>
                            <div className="custom-layout">
                                <p className="custom-text-2">Your share</p>
                                <div className="custom-style-2">
                                    <p>₹</p>
                                    <h1 className="ml-1">{expense.amount}</h1>
                                </div>
                            </div>
                            <div className='expense-delete-icon' onClick={() => handleDelete(expense._id)}>
                                <AiOutlineDelete />
                            </div>
                            <div className='expense-edit-icon'>
                                <AiFillEdit />
                            </div>
                            {/* {isModalOpen && selectedItemId === expense._id && <EditExpenseModal isOpen={isModalOpen} onClose={closeModal} itemId={selectedItemId} />} */}
                        </div>
                    </div>
                ))}
            </div>


            <div className="daily-expense-chart">
                <div className="daily-expense-card">
                    <div className="ExpenseCard-Section">
                        <div className='total-Amount'>
                            <div className="ExpenseCard-head" style={{ fontsize: "25px" }}>
                                Monthly Spending
                            </div>
                            <div className='expense-Amount' style={{ backgroundColor: "#FFD700;" }}>
                                <span>{totalAmount}</span>
                            </div>
                        </div>
                    </div>
                    <Doughnut data={chartData} />
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}