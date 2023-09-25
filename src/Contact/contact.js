import React from "react"
import './contact.css'
import { Link } from "react-router-dom"

export default function AboutUs() {

    return (
        <div>
             <div className="Nav-bar">
                <div className="Expense-head">
                <h1><Link to="/" style={{textDecoration:"none",color:"#FFA500"}}> Expense Tracker</Link></h1>
                </div>
                <div className="Nav-links">
                    <span><Link to="/AboutUs" style={{ color: "#FFA500" }}>About Us</Link></span>
                    <span><Link to="/Contact" style={{ color: "#FFA500" }}>Contact Us</Link></span>
                    <button><Link to="/Login" style={{ color: "#000" }}>Login</Link></button>
                </div>
            </div>
      
                
                <div class="responsive-container-block bigContainer">
  <div class="responsive-container-block Container">
    <div class="responsive-container-block leftSide">
      <p class="text-blk heading">
        <h2>We'd love to hear from you</h2>
      </p>
      <div className="contact-info">
          <h2>Our Contact Information</h2>
          <ul>
            <li>
              <strong>Email:</strong> contact@example.com
            </li>
            <li>
              <strong>Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 1234 Main Street, City, Country
            </li>
          </ul>
        </div>
      <p class="text-blk subHeading">
        </p>
    </div>
    <div class="responsive-container-block rightSide">
      <img class="number1img" src="https://smallbusiness-staging.s3.amazonaws.com/uploads/2016/06/1-930.jpg" alt="expense tracker icon 1"/>
      <img class="number2img" src="https://is1-ssl.mzstatic.com/image/thumb/Purple115/v4/22/07/b2/2207b233-7d31-8c65-92a6-fc20a9f5e02b/source/512x512bb.jpg" alt="expense tracker icon 2"/>
      <img class="number3img" src="https://www.boardandlife.com/wp-content/uploads/2019/09/monthly-expense-tracker-desk-space.jpg" alt="expense tracker icon 3"/>
      <img class="number5img" src="https://media.istockphoto.com/id/528729752/vector/mobile-banking-concept-flat-stylish-icon-design.jpg?s=612x612&w=0&k=20&c=mkSv3DEwHbq6CuqddHV2tWtO0wDrJYw2Ch_mw_T7NHI=" alt="expense tracker icon 4"/>
      {/* <iframe allowfullscreen="allowfullscreen" class="number4vid" poster="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/b242.png" src="https://www.youtube.com/embed/svg%3E?">
      </iframe> */}
      <img class="number7img" src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhwZW5zZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="expense tracker icon 5"/>
      <img class="number6img" src="https://i.pinimg.com/736x/d0/00/76/d00076e5ca48c27caff497c29dba1272--expense-tracker-dashboards.jpg" alt="expense tracker icon 6"/>
    </div>
    
        
  </div>    
</div>
                    {/* <div className='about' style={{ height: "80%" }}></div> */}
                </div>

    )

}