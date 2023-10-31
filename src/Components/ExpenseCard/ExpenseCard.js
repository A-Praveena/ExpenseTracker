import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { AiOutlineDelete } from "react-icons/ai";
import money from '../../assets/money.png';
import '../ExpenseCard/ExpenseCard.css';
import Swal from 'sweetalert2';
import { AiFillEdit } from "react-icons/ai";
import { icon, text } from '@fortawesome/fontawesome-svg-core';
const userId = localStorage.getItem("userId");


export default function ExpenseCard() {
  const [expense, setExpense] = useState([]);// Initialize to null
  const [error, setError] = useState(null); // Initialize error state

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item) => {
    setSelectedExpense(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  useEffect(() => {
    axios.get(`http://localhost:3005/expenses/${userId}`)
      .then((response) => {
        // console.log("AAAAAAAAAAAAAAAA",response.data.data.data);
        setExpense(response.data.data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message); // Set the error state
      });
  }, [userId]);

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:3005/expenses/${itemId}`)
      .then((response) => {
        // console.log(response.status);
        // console.log(response.data);
        if(response.status = 200){
          Swal.fire({
            text: 'Deleted Successfully',
          }
          )
          setExpense(prevExpense => prevExpense.filter(item => item._id !== itemId));
       
         
        }
        // setExpense(response);
      })
      .catch((error) => {
        console.error(error);
        // setError(error.message); // Set the error state
      });
  };

  // Render loading state if expense is null
  if (expense === null) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  const saveChanges = () => {
    // Here you can add your logic to update the expense details on the server
    // You can use axios.put or axios.patch to send a request to update the selectedExpense object
    // Example: axios.put(`http://localhost:3005/expenses/${selectedExpense._id}`, selectedExpense)
    // After successful update, you can close the modal
    setIsModalOpen(false);
  };

  return (

    <div>
      <div className="background">
      {expense.map((item, index) => {
         // Parse the createdAt string into a Date object
         const createdAtDate = new Date(item.createdAt);
        
         // Extract day, month, and year components
         const day = createdAtDate.getDate();
         const month = createdAtDate.getMonth() + 1; // Note: January is 0 in JavaScript
         const year = createdAtDate.getFullYear().toString().slice(-2);
 
         // Format day and month to have leading zeros if necessary
         const formattedDay = day < 10 ? `0${day}` : day;
         const formattedMonth = month < 10 ? `0${month}` : month;
 
         // Create formatted date string in dd/mm/yy format
         const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
 
         return (
        <div  key={index} className="ExpenseCard-Section">
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
          <div className='expense-delete-icon'  onClick={() => handleDelete(item._id)}>
            <AiOutlineDelete/>
          </div>
          <div className='expense-edit-icon' onClick={() => handleEdit(item._id)}>
          <AiFillEdit/>
          </div>
        </div>
        </div>
         );
         })}
         {/* Edit Expense Modal */}
      {isModalOpen && selectedExpense && (
        <div className="modal">
          <div className="modal-content">
            {/* Add input fields for editing */}
            <input
              type="text"
              value={selectedExpense.categories}
              onChange={(e) => setSelectedExpense({ ...selectedExpense, categories: e.target.value })}
            />
            {/* Add more input fields for other properties like share, notes, etc. */}
            <button onClick={saveChanges}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}


