import React, { useState, useEffect } from "react";
import '../Password/password.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
const userId = localStorage.getItem("userId");




export default function PasswordChange() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });



  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTogglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    let errors = {};
    if (newPassword !== confirmPassword) {
      setAlertMessage("New password and confirm password do not match.");
    } else {
      setAlertMessage("");
    }
    // Validation checks
    if (currentPassword === "") {
      errors.currentPassword = "Current password is required.";
    } else {
      errors.currentPassword = "";
    }

    if (newPassword === "") {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long.";
    } else {
      errors.newPassword = "";
    }

    if (confirmPassword === "") {
      errors.confirmPassword = "Confirm password is required.";
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    } else {
      errors.confirmPassword = "";
    }

    // Set validation errors
    setValidationErrors(errors);
    if (Object.values(errors).every((error) => error === "")) {
      const PasswordData = {
        currentpassword: currentPassword,
        newPassword: newPassword
      }
      axios.put(`http://localhost:3005/user/changepassword/${userId}`, PasswordData)
        .then(async (response) => {
          console.log("RESPONSE", response.status);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Password Changed successsfully",
            }).then(() => {
              window.location.href = `/Dashboard/${userId}`;
            });
          }

        })
    }

  };


  return (
    <div>
      <div className="register-section">
        <div className="profile-edit">
          <div className="profile-background">
            <div className='editprofile' style={{ height: "80%", width: "30%" }}>
              <div className='sign-up'>
                <h2>Change Password</h2>
                <hr className="horizontal-line"></hr>

                <form id='edit-profile-form' className='edit-profile-form' onSubmit={handleSubmit}>

                  <div className="edit-profile-form-content" style={{ marginBottom: "10%" }}>
                    <label>Current Password</label>
                    <div className="input-container">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="input-field"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <button className="eye-icon" onClick={() => handleTogglePasswordVisibility("current")}>
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                  </div>
                  {validationErrors.currentPassword && <div className="error-message">{validationErrors.currentPassword}</div>}


                  <div className="edit-profile-form-content">
                    <label>New Password</label>
                    <div className="input-container">
                      <input type={showNewPassword ? "text" : "password"} className="input-field" name="newPassword" value={passwordData.newPassword}
                        onChange={handlePasswordChange} />
                      <button className="eye-icon" onClick={() => handleTogglePasswordVisibility("new")}>
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                  </div>
                  {validationErrors.newPassword && <div className="error-message">{validationErrors.newPassword}</div>}


                  <div className="edit-profile-form-content">
                    <label>Confirm Password</label>
                    <div className="input-container">
                      <input type={showConfirmPassword ? "text" : "password"} className="input-field" name="confirmPassword" value={passwordData.confirmPassword}
                        onChange={handlePasswordChange} />
                      <button className="eye-icon" onClick={() => handleTogglePasswordVisibility("confirm")}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {validationErrors.confirmPassword && <div className="error-message">{validationErrors.confirmPassword}</div>}


                  <div className="edit-profile-button">
                    {alertMessage && <div className="alert-message">* {alertMessage}</div>}
                    <button className='edit-btn'>Change Password</button>
                  </div>
                </form>


              </div>




            </div>

          </div>

        </div>

      </div>
    </div>
  );
}