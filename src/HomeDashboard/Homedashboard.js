import React from "react";
import DoughnutChart from "../Components/Doughnut/Doughnut";
import ExpenseCard from "../Components/ExpenseCard/ExpenseCard";
import './Homedashboard.css'

export default function HomeDashboard(){
    return (
        <div>
        <div className="homedashboard-section">
           <div><DoughnutChart/></div>
           <div className="expensecard-container"><ExpenseCard/></div>
           </div>
        </div>
    );
}

