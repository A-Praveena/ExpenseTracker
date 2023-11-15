import React from "react";
import '../dashboard/dashboard.css'
import { Link } from 'react-router-dom';
import { useState } from "react";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import HomeDashboard from "../HomeDashboard/Homedashboard";
import AddIncome from "../addincome/addincome";
import EditProfile from "../editProfile/editProfile";
import Daily from "../Components/Daily/Daily";
import PasswordChange from "../Password/password";
import Analysis from "../Analysis/Analysis";


export default function Dashboard() {

    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showHomeDashboard, setShowHomeDashboard] = useState(true);
    const [showIncomeForm, setshowIncomeForm] = useState(false);
    const [showEditProfileForm, setshowEditProfileForm] = useState(false);
    const [showDailyForm, setshowDailyForm] = useState(false);
    const [showPasswordChange, setshowPasswordChange] = useState(false);
    const [showAnalysis, setshowAnalyis] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const userName = localStorage.getItem("userName");

    const handleDropdownClick = () => {
        setIsActive(!isActive);
    };
    const userId = localStorage.getItem("userId");


    const toggleExpenseForm = () => {
        setShowExpenseForm(!showExpenseForm);
        setShowHomeDashboard(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowPasswordChange(false);
        setshowDailyForm(false);
        setshowAnalyis(false);
    };


    const toggleHomeDashboard = () => {
        setShowHomeDashboard(true);
        setShowExpenseForm(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowPasswordChange(false);
        setshowDailyForm(false);
        setshowAnalyis(false);
    };

    const toggleEditProfile = () => {
        setshowEditProfileForm(true);
        setShowHomeDashboard(false);
        setshowIncomeForm(false);
        setShowExpenseForm(false);
        setshowDailyForm(false);
        setshowPasswordChange(false);
        setshowDailyForm(false);
        setshowAnalyis(false);
    }

    const toggleIncomeForm = () => {
        setshowIncomeForm(!showIncomeForm);
        setShowExpenseForm(false);
        setShowHomeDashboard(false);
        setshowEditProfileForm(false);
        setshowDailyForm(false);
        setshowPasswordChange(false);
        setshowAnalyis(false);
    };

    const toggleProfileForm = () => {
        setShowHomeDashboard(true);
        setShowExpenseForm(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowDailyForm(false);
        setshowPasswordChange(false);
        setshowAnalyis(false);
    };

    const toggleDailyForm = () => {
        setshowDailyForm(true);
        setShowHomeDashboard(false);
        setShowExpenseForm(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowPasswordChange(false);
        setshowAnalyis(false);
    };

    const toggleChangePasswordForm = () => {
        setshowDailyForm(false);
        setShowHomeDashboard(false);
        setShowExpenseForm(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowPasswordChange(true);
        setshowAnalyis(false);
    }

    const toggleAnalysisForm = () => {
        setshowAnalyis(true);
        setShowExpenseForm(false);
        setShowHomeDashboard(false);
        setshowIncomeForm(false);
        setshowEditProfileForm(false);
        setshowPasswordChange(false);
        setshowDailyForm(false);
    }

    return (
        <div>
            <div class="sidebar">
                <div class="grid">
                    <div class="col-left">
                        <div class="menu">
                            <h1 class="logo">Expense Tracker</h1>
                            <ul class="menu-list">
                                <li class="menu-item">
                                    {/* SVG icon for Home */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        {/* Path defining the shape of the Home icon */}
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    {/* Anchor tag for Home with click event to toggle home dashboard */}
                                    <a class="menu-link" onClick={toggleHomeDashboard}>Home</a>
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
                                    <a class="menu-link" onClick={toggleAnalysisForm}>Analysis</a>
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
                                    <a onClick={toggleDailyForm} class="menu-link">Daily</a>
                                </li>

                                <ul class="menu-list">
                                    <li class="menu-item" onclick="toggleProfileForm()">

                                        <div >
                                            <div className="dropdown-container">

                                                <svg class="h-7 w-7 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" width="30" height="30">
                                                    <path fill-rule="evenodd" d="M10 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM10 0a4 4 0 100 8 4 4 0 000-8zM2 18a1 1 0 011-1h14a1 1 0 011 1v1H2v-1z" clip-rule="evenodd" />
                                                </svg>
                                                <button className={`profile-btn ${isActive ? 'active' : ''}`} onClick={handleDropdownClick}>
                                                    Profile
                                                </button>
                                                {isActive && (
                                                    <div className="profile-contents">
                                                        <a onClick={toggleEditProfile}>Edit profile</a>
                                                        <a onClick={toggleChangePasswordForm}>Change Password</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </ul>

                        </div>



                        <div style={{ marginTop: "100%" }}>

                            <div class="button-container">
                                 {/* Button for adding income */}
                                <button class="add-expense" onClick={toggleIncomeForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v3H8v2h3v3h2v-3h3v-2h-3V7h-2z" />
                                    </svg>
                                    Add Income
                                </button>
                            </div>

                            <div class="button-container">
                                 {/* Button for adding expenses */}
                                <button class="add-expense" onClick={toggleExpenseForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v3H8v2h3v3h2v-3h3v-2h-3V7h-2z" />
                                    </svg>
                                    Add Expense
                                </button>
                            </div>


                            <div class="button-container">
                                {/* Logout button with SVG icon */}
                                <button class="logout"
                                    onClick={() => {
                                        // Clear local storage on button click (assuming it's for logout)
                                        localStorage.clear()
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M14 5l-1.41 1.41L16.17 11H4v2h12.17l-3.58 3.59L14 19l6-6z" />
                                    </svg>
                                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Logout</Link>
                                </button>
                            </div>

                        </div>

                    </div>
                    <div class="col-right">
                        {showHomeDashboard && <HomeDashboard />}
                        {showExpenseForm && <ExpenseForm userId={userId} />}
                        {showIncomeForm && <AddIncome userId={userId} />}
                        {showEditProfileForm && <EditProfile userId={userId} />}
                        {showDailyForm && <Daily userId={userId} />}
                        {showPasswordChange && <PasswordChange userId={userId} />}
                        {showAnalysis && <Analysis userId={userId} />}
                    </div>
                </div>
            </div>
        </div>
    )
}