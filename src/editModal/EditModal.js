import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './editModal.css'
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const userId = localStorage.getItem("userId");

const EditExpenseModal = ({ isOpen, onClose, itemId }) => {

    console.log("Item", itemId)

    const [expense, setExpense] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [notes, setNotes] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:3005/expenses/${userId}`)
            .then((response) => {
                console.log("Response", response.data.data.data);
                const filteredData = response.data.data.data.filter(item => item._id === itemId);
                console.log("Filtered data", filteredData[0]);
                if (isMounted) {
                    // Ensure filteredData is an array with the filtered object
                    setExpense(filteredData.length > 0 ? [filteredData[0]] : []);
                    // console.log("Expense",expense);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    console.error(error);
                    setError(error.message);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [userId, itemId]);

    const updateExpense = (e) => {
        e.preventDefault();


        console.log("Inside update expense");

        const expenseData = {
            categories: categories,
            notes: notes,
            amount: amount
        };

        console.log("ExpenseData", expenseData);

        axios.put(`http://localhost:3005/expenses/${itemId}`, expenseData)
            .then(async (response) => {
                console.log("Updated Expense", response.data.message);
                console.log("Response status", response.status);
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                    })
                        .then(() => {
                            // Close the modal after successful update
                            onClose();
                        });
                }
            })
            .catch(error => {
                console.error('Error adding income:', error);
            });
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Expense</h2>
                <hr class="horizontal-line"></hr>
                <form id='edit-profile-form' className='edit-profile-form' onSubmit={(e) => e.preventDefault()}>

                    {expense && (
                        <div>
                            <div className="edit-profile-form-content">
                                <label>Date</label>
                                <span>
                                    {new Date(expense[0]?.createdAt).toLocaleDateString('en-US')}
                                </span>
                            </div>

                            <div className="edit-profile-form-content">
                                <label>Categories</label>
                                <input
                                    type="text"
                                    placeholder={expense[0]?.categories || "Categories"}
                                    className="input-field"
                                    onChange={(e) => setCategories(e.target.value)}
                                />
                            </div>

                            <div className="edit-profile-form-content">
                                <label>Notes</label>
                                <input
                                    type="text"
                                    placeholder={expense[0]?.notes || "Notes"}
                                    className="input-field"
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="edit-profile-form-content">
                                <label>Your share</label>
                                <input
                                    type="text"
                                    placeholder={expense[0]?.amount || "Amount"}
                                    className="input-field"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    )}


                    <div className="update-Expense-button">
                        <button onClick={updateExpense}>Update</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditExpenseModal;
