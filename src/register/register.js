import React from "react";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import '../register/register.css'

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    // console.log(watch('username'));


    const submission = data => {
        // console.log(data);
        const userData = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            password: data.password,
            phone: data.phone
        }
        axios.post("http://localhost:3005/register", userData)
            .then(async (response) => {
                // console.log("User registerd successfully");
                // console.log("response1", response.data)

                if (response.data.status === true) {
                    localStorage.setItem('auth', JSON.stringify(true))
                    Swal.fire({
                        icon: "success",
                        title: "Registation completed",
                        text: "hurray!!!!!!!!!",
                    })
                    // window.location.href="/Register"
                    document.getElementById("register-form").reset();
                }

            })
            .catch(async (err) => {
                // console.log("error", err.response.data.message);
                // auth = false
                localStorage.setItem('auth', JSON.stringify(false))

                Swal.fire({
                    icon: "error",
                    title: err.response.data.message,
                    text: "Registration failed",
                })
            })
    }

    return (
        <div>
            <div className="Nav-bar">
                <div className="Expense-head">
                    <h1><Link to="/" style={{ textDecoration: "none", color: "#FFA500" }}> Expense Tracker</Link></h1>
                </div>

            </div>
            {/* <div className="wrapper">
            


                <form className="form-right" id='register-form' onSubmit={handleSubmit(submission)}>
                    <h2 className="text-uppercase">Sign Up</h2>
                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                {...register("firstname", {
                                    required: "First Name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "First Name should contain only alphabetic characters"
                                    }
                                })}
                                className="input-field"
                            />
                            {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}

                        </div>
                        <div className="col-sm-6 mb-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                {...register("lastname", {
                                    required: "Last Name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Last Name should contain only alphabetic characters"
                                    }
                                })}
                                className="input-field"
                            />
                            {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}

                        </div>

                    </div>
                    <div className="mb-3">
                        <label>User Name</label>
                        <input type="text"{...register("username", { required: true })} name="username" id="username" className="input-field" />
                    </div>
                    <div className='errors'>
                        {errors.username?.type === "required" && "*User Name is required"}
                    </div>


                    <div className="mb-3">
                        <label>Your Email</label>
                        <input type="email" {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email address format"
                            }
                        })} className="input-field" />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label>Phone No</label>
                        <input type="phone" {...register("phone", {
                            required: "Phone No is required",
                            pattern: {
                                value: /^[0-9]{10}$/, // Adjust the regular expression for your specific phone number format
                                message: "Invalid phone number format"
                            }
                        })} className="input-field" maxLength={10} />
                        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                    </div>


                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Password must be at most 20 characters long"
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+=^]).*$/,
                                        message: "Password must meet the criteria: at least 8 characters, one digit, one uppercase letter, one lowercase letter, one special character"
                                    },
                                    validate: (value) => !/\s/.test(value) || "Password cannot contain white spaces"
                                })}
                                className="input-field"
                            />
                            {errors.password && <span className="error-message">{errors.password.message}</span>}

                        </div>
                        <div className="col-sm-6 mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === watch("password") || "Passwords do not match"
                                })}
                                className="input-field"
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}

                        </div>
                    </div>

                    <div className="form-field">
                        <button className='btn' >Create Account</button>
                        <div style={{ marginTop: "6%", marginBottom: "6%" }}>
                            <span>Already have  an account? </span>
                            <span><Link to="/Login" style={{ color: "black", textDecoration: "underline" }} >Sign In</Link></span>
                        </div>
                    </div>


                </form>
            </div> */}

            <div className="register-section">
                <div className="expense-register">
                    <div className="register-background">
                        <div className='registers' style={{ height: "80%" }}>
                            <div className='sign-up'>
                                <h2>Sign Up</h2>
                                <hr className="horizontal-line"></hr>
                                <form id='register-form' className='register-form' onSubmit={handleSubmit(submission)}>
                                    <div className="register-name-section">
                                        <div className="register-form-content">
                                            <label>First Name</label>
                                            <input type="text" {...register("firstname", {
                                                required: "*First Name is required",
                                                pattern: {
                                                    value: /^[A-Za-z]+$/,
                                                    message: "First Name should contain only alphabetic characters"
                                                }
                                            })}
                                                className="input-field"
                                            />
                                           
                                        </div>
                                        <div className="register-form-content">
                                            <label>Last Name</label>
                                            <input type="text" {...register("lastname", {
                                                required: "*Last Name is required",
                                                pattern: {
                                                    value: /^[A-Za-z]+$/,
                                                    message: "Last Name should contain only alphabetic characters"
                                                }
                                            })}
                                                className="input-field"
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="register-name-section" style={{gap:"1%"}}>
                                        <div className="register-form-content"> {errors.firstname && <span className="errors">{errors.firstname.message}</span>}</div>
                                        <div className="register-form-content">{errors.lastname && <span className="errors">{errors.lastname.message}</span>}</div>
                                    </div>
                                    <div className="register-form-content" style={{width:"100%"}}>
                                        <label>User Name</label>
                                        <input type="text"{...register("username", { required: true })} name="username" id="username" className="input-field" />

                                        <div className='errors'>
                                            {errors.username?.type === "required" && "*User Name is required"}
                                        </div>
                                    </div>

                                    <div className="register-name-section">
                                        <div className="register-form-content">
                                            <label>Your Email</label>
                                            <input type="email" {...register("email", {
                                                required: " *Email is required",
                                                pattern: {
                                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                    message: "Invalid email address format"
                                                }
                                            })} className="input-field" />
                                            
                                        </div>

                                        <div className="register-form-content">
                                            <label>Phone No</label>
                                            <input type="phone" {...register("phone", {
                                                required: "*Phone No is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/, // Adjust the regular expression for your specific phone number format
                                                    message: "Invalid phone number format"
                                                }
                                            })} className="input-field" maxLength={10} />
                                            
                                        </div>
                                    </div>
                                    <div className="register-name-section">
                                    <div className="register-form-content">
                                    {errors.email && <span className="errors">{errors.email.message}</span>}
                                    </div>
                                    <div className="register-form-content">
                                    {errors.phone && <span className="errors">{errors.phone.message}</span>}
                                    </div>
                                    </div>

                                    <div className="register-name-section">
                                        <div className="register-form-content">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                {...register("password", {
                                                    required: "*Password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long"
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: "Password must be at most 20 characters long"
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+=^]).*$/,
                                                        message: "Password must meet the following criteria:",
                                                    },
                                                    validate: (value) => !/\s/.test(value) || "Password cannot contain white spaces"
                                                })}
                                                className="input-field"
                                            />
                                            
                                        </div>

                                        <div className="register-form-content">
                                            <label>Confirm Password</label>
                                            <input
                                                type="password"
                                                {...register("confirmPassword", {
                                                    required: "*Confirm Password is required",
                                                    validate: (value) => value === watch("password") || "Passwords do not match"
                                                })}
                                                className="input-field"
                                            />
                                           
                                        </div>
                                    </div>
                                    <div className="register-name-section">
                                    <div className="register-form-content">
                                        {errors.password && (
                                                <ul className="errors"  style={{ listStyle: 'none' }}>
                                                    {errors.password.type === "required" && (
                                                        <li>Password is required</li>
                                                    )}
                                                    {errors.password.type === "minLength" && (
                                                        <li>Password must be at least 8 characters long</li>
                                                    )}
                                                    {errors.password.type === "maxLength" && (
                                                        <li>Password must be at most 20 characters long</li>
                                                    )}
                                                    {errors.password.type === "pattern" && (
                                                        <>
                                                            <li>At least 8 characters</li>
                                                            <li>One digit (0-9)</li>
                                                            <li>One uppercase letter (A-Z)</li>
                                                            <li>One lowercase letter (a-z)</li>
                                                            <li>One special character (!@#$%^&*()-+=^)</li>
                                                        </>
                                                    )}
                                                    {errors.password.type === "validate" && (
                                                        <li>Password cannot contain white spaces</li>
                                                    )}
                                                </ul>
                                            )}
                                            </div>
                                            <div  className="register-form-content"> 
                                                {errors.confirmPassword && <span className="errors">{errors.confirmPassword.message}</span>}
                                            </div>
                                            </div>
                                    <button className='reg-btn' >Submit</button>
                                    <div>
                                        <span>Already have an account ? <span><Link to="/Login" style={{ color: "#ffdf1a" }} >Sign In</Link></span></span>
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