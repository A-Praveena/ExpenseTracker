import React from "react";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import '../login/login.css'

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    // console.log(watch('username'));


    const submission = data => {
        // console.log("data", data);
        const userData = {
            username: data.username,
            password: data.password
        }
        // console.log(userData)
        axios.post("http://localhost:3005/tokens", userData)
            .then(async (response) => {
                // console.log("Succesfully logged in",response)
                // console.log("Response received from the backend:", response.data); // Add this line
                // console.log("response message", response.data.message);
                // console.log("response data", response.data.user);
                // console.log("response data", response.data.status);


                if (response.data.status === true) {
                     // Assuming your backend sends the user ID as response.data.user.id
                const userId = response.data.user.id;

                // Store the user ID in local storage
                localStorage.setItem('userId', userId);

                // console.log("local storage User_id",userId)
                    window.location.href = '/Dashboard/${userId}';
                    // localStorage.setItem('auth', JSON.stringify(true))
                    // auth = true
                    // console.log('auth1', auth)

                }

            })
            .catch(async (err) => {
                console.log("error", err);
                // auth = false
                localStorage.setItem('auth', JSON.stringify(false))

                Swal.fire({
                    icon: "error",
                    title: "Invalid credentials!!!",
                    text: "Username or password is typed incorrectly",
                })
            })
    }

    return (
        <div>
            <div className="Nav-bar">
                <div className="Expense-head">
                    <h1><Link to="/" style={{textDecoration:"none",color:"#FFA500"}}> Expense Tracker</Link></h1>
                </div>

            </div>
            <div className="login-section">
                <div className="login">
                    <div className="login-background">
                        <div className='register' style={{ height: "80%" }}>
                            <div className='sign-in'>
                                <h2>Sign In</h2>
                                <hr className="horizontal-line"></hr>

                                <form id='form' className='login-form' onSubmit={handleSubmit(submission)}>
                                    <div className="login-form-content">
                                        <label>User Name</label>
                                        <input type="text" {...register("username", { required: true })} placeholder='Username' />
                                        {/* <div className='errors'>
                                            {errors.username?.type === "required" && "*Username is required"}
                                        </div> */}
                                    </div>
                                    <div className='login-errors'>
                                            {errors.username?.type === "required" && "*Username is required"}
                                        </div>
                                    <div className="login-form-content">
                                        <label>Password</label>
                                        <input type="password" {...register("password", { required: true })} placeholder='Password' />
                                        {/* <div className='errors'>
                                            {errors.password?.type === "required" && "*Password is required"}
                                        </div> */}
                                    </div>
                                    <div className='login-errors'>
                                            {errors.password?.type === "required" && "*Password is required"}
                                        </div>
                                    
                                    <button className='login-btn' >Submit</button>
                                    <div className="login-form-forgot">
                                    {/* <span>Forgot password?</span> */}
                                    <div>
                                        <span>Don't have an account, <span><Link to="/Register" style={{ color: "#ffdf1a" }} >Sign Up</Link></span></span>
                                    </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}