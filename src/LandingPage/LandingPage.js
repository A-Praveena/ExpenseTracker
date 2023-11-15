import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../assets/Vector.svg";


import './landingpage.css';



import './new.css';

export default function LandingPage(props) {
    const navigate = useNavigate();



    return (
        <div>
            <div className="Nav-bar">
                <div className="Expense-head">
                    <h1>Expense Tracker</h1>
                </div>
                <div className="Nav-links">
                    <span><Link to="/AboutUs" style={{ color: "#FFA500" }}>About Us</Link></span>
                    <span><Link to="/" style={{ color: "#FFA500" }}>Contact Us</Link></span>
                    <button><Link to="/Login" style={{ color: "#000" }}>Login</Link></button>
                </div>
            </div>

            <div className="Landingpage">
                <div className="LandingpageLeft">
                    <h1>The <span className="Highlight">Expense Tracker</span> </h1><h1>that works for you</h1>
                    <p>Track all your Expenses here...</p>
                    <div>
                        <button className="getStartedButton">
                            <Link to="/Login" style={{ color: "#000", textDecoration: "none" }}><span>Get Started</span></Link>

                        </button>
                    </div>
                </div>
                <div className="LandingpageRight">
                    <img src={Vector} alt="icon" />
                </div>
            </div>


        </div>
    );
}
