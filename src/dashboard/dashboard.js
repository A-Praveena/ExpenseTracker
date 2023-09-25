import React from "react";
import '../dashboard/dashboard.css'
import { Link } from 'react-router-dom';
import { useState } from "react";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

export default function Dashboard() {

    const [showExpenseForm, setShowExpenseForm] = useState(false);

    const userId = localStorage.getItem("userId")
  const toggleExpenseForm = () => {
    console.log("Inside toggle");
    setShowExpenseForm(!showExpenseForm);
  };
    return (
        <div>
            <div class="sidebar">
                <div class="grid">
                    <div class="col-left">
                        <div class="menu">
                            <h1 class="logo">Expense Tracker</h1>
                            <ul class="menu-list">
                                <li class="menu-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <a href="/" class="menu-link">Home</a>
                                </li>
                                <li class="menu-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                    <a href="/dashboard" class="menu-link">Analysis</a>
                                </li>
                                <li class="menu-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <a href="/dashboard/daily" class="menu-link">Daily</a>
                                </li>
                            </ul>
                        </div>

                        <div style={{marginTop:"160%"}}>
                        <div class="button-container">
                            <button class="add-expense" onClick={toggleExpenseForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v3H8v2h3v3h2v-3h3v-2h-3V7h-2z" />
                                </svg>
                                Add Expense
                            </button>
                        </div>

                        <div class="button-container">
                            <button class="logout">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 5l-1.41 1.41L16.17 11H4v2h12.17l-3.58 3.59L14 19l6-6z" />
                                </svg>
                              <Link to= "/" style={{textDecoration:"none", color:"black"}}>Logout</Link>
                            </button>
                        </div>

                        </div>

                    </div>
                    <div class="col-right">
                        {/* <!-- Content goes here --> */}
                        {showExpenseForm && <ExpenseForm />}
                    </div>
                </div>
            </div>


            {/* <div class="sidebar">
                <div class="sidebar-contents">
                    <div class="custom-styles">
                        <ul className="cursor-pointer">
                            <li>
                                <h1>Expense Tracker</h1>
                            </li>
                        </ul>
                        <div className=" bg-rp-black ">
                            <ul className="">
                                <Link to="/dashboard">
                                    <li>
                                        <span className="mx-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        </span>
                                        Home
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li>
                                        <span className="mx-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                            </svg>
                                        </span>
                                        Analysis
                                    </li>
                                </Link>
                                <Link to="/dashboard/daily">
                                    <li>
                                        <span className="mx-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8 "
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        Daily
                                    </li>
                                </Link>
                                <div className="ml-6  mt-4 bottom-5 left-16 pb-6 ">
                                    <button
                                        //   onClick={handleLogOut}
                                        className="bg-mj-yellow px-4 py-3 flex rounded-md font-bold duration-300 ease-out hover:scale-110"
                                    >
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                        </span>
                                        Logout
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
            </div> */}
        </div>
    )
}