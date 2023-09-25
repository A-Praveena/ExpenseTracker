import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import './expenseform.css';
import axios from "axios";
import Swal from "sweetalert2";


export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Initialize date state
  const [selectedCategory, setSelectedCategory] = useState(null); // Initialize category state

  const userId = localStorage.getItem('userId');
  const categories = [
    {value:"general",label:"General"},
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    // Add more categories as needed
  ];

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ExpenseData = {
        amount :amount,
        description: description,
        date : date,
        selectedCategory : selectedCategory.value
    }
    console.log("ExpenseData",ExpenseData);
    axios.post(`http://localhost:3005/expense/add/${userId}`, ExpenseData)
    .then(async (response) => {
      console.log(response.data.status);
      if(response.data.status === "true"){
        Swal.fire({
          icon: "success",
          title: "Expense added successsfully",
          
      })
      }
    })
    
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
    //   color:"#fff",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color:"#fff",
    }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFD700', // Set the text color of the selected value to white
  }),
  };

  return (
    <div>
      <div className="expense-section">
        <div className="expense">
          <div className="expense-background">
            <div className="register" style={{ height: "80%" }}>
              <div className="sign-in">
                <h2>Add Expense</h2>
                <hr className="horizontal-line"></hr>

                <form id="form" className="expense-form" onSubmit={handleSubmit}>
                  <div className="expense-form-content">
                    <label>Amount</label>
                    <input
                      type="text"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="expense-form-content">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="What was this expense for"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="expense-form-content">
                    <label>Date</label>
                    <span>
                    <DatePicker
                      selected={date}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      required
                    />
                    </span>
                
                  </div>
                  <div className="expense-form-content">
                    <label>Category</label>
                    <span>
                    <Select
                      options={categories}
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      isClearable
                      styles={customStyles} 
                      required
                    />
                    </span>
                  </div>

                  <button className="expense-btn">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
