import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import money from '../../assets/money.png';
import '../ExpenseCard/ExpenseCard.css';
import Swal from 'sweetalert2';
import { AiFillEdit } from "react-icons/ai";
import EditExpenseModal from '../../editModal/EditModal';
const userId = localStorage.getItem("userId");


export default function ExpenseCard() {
  const [expense, setExpense] = useState([]);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);


  useEffect(() => {
    axios.get(`http://localhost:3005/expenses/${userId}`)
      .then((response) => {
        console.log("AAAAAAAAAAAAAAAA",response.data.data.data);
       // Get the current date
      const currentDate = new Date();
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      // Filter the expenses for the last 7 days
      const expensesLast7Days = response.data.data.data.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
      });

      setExpense(expensesLast7Days);
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
              setExpense(prevExpense => prevExpense.filter(item => item._id !== itemId));
            }
            // setExpense(response);
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
  

  if (expense === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (

    <div>
      <div className="background">
        {expense.map((item, index) => {
          const createdAtDate = new Date(item.createdAt);


          const day = createdAtDate.getDate();
          const month = createdAtDate.getMonth() + 1;
          const year = createdAtDate.getFullYear().toString().slice(-2);


          const formattedDay = day < 10 ? `0${day}` : day;
          const formattedMonth = month < 10 ? `0${month}` : month;


          const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

          return (
            <div key={index} className="ExpenseCard-Section">
              <div className="ExpenseCard-head">
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
                        {formattedDate}
                      </p>
                    </div>
                    <div className="custom-bg">
                      <p className="custom-text-small">{item.categories}</p>
                    </div>
                  </div>
                  <div className="custom-margin ">
                    <h1 className="font-bold">{item.notes}</h1>
                  </div>
                </div>
                <div className="custom-layout">
                  <p className="custom-text-2">Your share</p>
                  <div className="custom-style-2">
                    <p>₹</p>
                    <h1 className="ml-1">{item.amount}</h1>
                  </div>
                </div>
                <div className='expense-delete-icon' onClick={() => handleDelete(item._id)}>
                  <AiOutlineDelete />
                </div>
                <div className='expense-edit-icon' onClick={() => openModal(item._id)}>
                  <AiFillEdit />
                </div>
                {isModalOpen && selectedItemId === item._id && <EditExpenseModal isOpen={isModalOpen} onClose={closeModal} itemId={selectedItemId} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


