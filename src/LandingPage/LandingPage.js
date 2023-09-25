import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {fa-regular ,fa-circle-arrow-right } from '@fortawesome/free-solid-svg-icons';


import Vector from "../assets/Vector.svg";
import Menu from "../assets/mobile_bar.png";
import Close from "../assets/close.png";

import './landingpage.css';



import './new.css';

export default function LandingPage(props) {
    const navigate = useNavigate();

    //   const [isMobile, setIsMobile] = useState(true);

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
                        <Link to="/Login" style={{ color: "#000",textDecoration:"none" }}><span>Get Started</span></Link>
                            {/* <span className="icon">
                            <FontAwesomeIcon icon="fa-regular fa-circle-arrow-right" />
                            </span> */}
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
