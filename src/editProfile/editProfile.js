import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../editProfile/editProfile.css'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");




export default function EditProfile() {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [firstName, setFirstName] = useState(userData[0]?.firstname || '');
    const [lastName, setLastName] = useState(userData[0]?.lastname || '');
    const [username, setUsername] = useState(userData[0]?.username || '');
    const [email, setEmail] = useState(userData[0]?.email || '');
    const [phone, setPhone] = useState(userData[0]?.phone || '');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/users/${userId}`);
                setUserData(response.data.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userId]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        //    navigate("/dashboard")
        setIsEditing(false);

    };

    const handleSave = async (formData) => {
        setIsEditing(false);
        const updatedUserData = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
        };

        try {
            const response = await axios.put(`http://localhost:3005/users/${userId}`, updatedUserData);
            if (response.data.status === true) {
                localStorage.setItem('auth', JSON.stringify(true));
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                });
                // Fetch updated user data after successful update
                const updatedResponse = await axios.get(`http://localhost:3005/users/${userId}`);
                setUserData(updatedResponse.data.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div>
            <div className="register-section">
                <div className="profile-edit">
                    <div className="profile-background">
                        <div className='editprofile' style={{ height: "80%", width: "30%" }}>
                            <div className='sign-up'>
                                <h2>
                                    <div className="profile-avatar">
                                        <div className="avatar">
                                            <img src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg" />
                                        </div>
                                        <a class="menu-link">Hi, {userName}</a>
                                    </div>
                                </h2>
                                <hr className="horizontal-line"></hr>
                                {!isEditing ? (
                                    <form id='edit-profile-form' className='edit-profile-form'>

                                        <div className="edit-profile-form-content">
                                            <label>First Name</label>
                                            <span>{userData[0]?.firstname}</span>

                                        </div>

                                        <div className="edit-profile-form-content">
                                            <label>Last Name</label>
                                            <span>{userData[0]?.lastname}</span>

                                        </div>

                                        <div className="edit-profile-form-content">
                                            <label>User Name</label>
                                            <span>{userData[0]?.username}</span>
                                        </div>


                                        <div className="edit-profile-form-content">
                                            <label>Your Email</label>
                                            <span>{userData[0]?.email}</span>

                                        </div>

                                        <div className="edit-profile-form-content">
                                            <label>Phone No</label>
                                            <span>{userData[0]?.phone}</span>

                                        </div>
                                        <div className="edit-profile-button">
                                            <button className='edit-btn' onClick={handleEdit}>Edit profile</button>
                                        </div>
                                    </form>
                                ) : (
                                    <form className='edit-profile-form' onSubmit={handleSubmit(handleSave)}>
                                        <div>
                                            <div className="edit-profile-content">
                                                <label>First Name</label>
                                                <input type="text"
                                                    placeholder={userData[0]?.firstname || "First Name"}
                                                    className="input-field"
                                                    {...register("firstname")} />
                                            </div>
                                            <div className="edit-profile-content">
                                                <label>Last Name</label>
                                                <input type="text"
                                                    placeholder={userData[0]?.lastname || "Last Name"}
                                                    className="input-field"
                                                    {...register("lastname")} />
                                            </div>
                                            <div className="edit-profile-content">
                                                <label>User Name</label>
                                                <input type="text"
                                                    placeholder={userData[0]?.username || "User Name"}
                                                    className="input-field"
                                                    {...register("username")} />
                                            </div>
                                            <div className="edit-profile-content">
                                                <label>Your Email</label>
                                                <input type="text"
                                                    placeholder={userData[0]?.email || "Your Email"}
                                                    className="input-field"
                                                    {...register("email")} />
                                            </div>
                                            <div className="edit-profile-content">
                                                <label>Phone No</label>
                                                <input type="text"
                                                    placeholder={userData[0]?.phone || "Phone No"}
                                                    className="input-field"
                                                    {...register("phone")} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="edit-profile-buttons">
                                                <button type="submit" className="save-btn">
                                                    Save Changes
                                                </button>
                                                <button type="button" className="cancel-btn" onClick={handleCancel}>
                                                    Cancel
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>




                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}