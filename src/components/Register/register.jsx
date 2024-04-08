import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { homeAppUrl } from "../../constants";
import {useNavigate } from 'react-router-dom';

const initialState = {
    name: "",
    email: "",
    password: "",
    password1: ""
};
export const Register = () => {
    const redirect = useNavigate();
    const [userObj, setUserObj] = useState(initialState);
    const [success, setSuccess] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserObj((prevState) => ({ ...prevState, [name]: value }));
    };


    const handleSubmit = (e) => {
        const requestObject = [
            {
                "body": {
                    "userAuthDetails": {
                        "username": userObj?.name,
                        "email": userObj?.email,
                        "password": userObj?.password
                    }
                }
            }
        ]
        axios.post(`${homeAppUrl}/add-user/`, requestObject).then((res) => {
            if (res) {
                const resp = JSON.parse(res.data)
                setSuccess(resp[0])
                setTimeout(() => {
                     if(resp[0].status == 'Success'){
                        redirect('/login');
                    }
                }, 3000);
            }
        })
    }
    return (
        <div className="registerDiv">
            <div className="registerForm" id="register">
                <div className="row">
                    <div>
                        <h4 className="registerHeading">Register</h4>
                        <span className="messageBar">
                            {success?.message && <p className={`message-${success.status}`}>
                                <span>
                                    {success?.message}
                                </span>
                            </p>}
                        </span>
                        <form>
                            <label className="text_label">
                                Name: <input className="name_text_area" type="text" name='name' value={userObj?.name} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Mail Id: <input className="mail_text_area" type="email" name="email" value={userObj?.email} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Password: <input className="password1_text_area" type="text" name="password" value={userObj?.password} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Confirm Password:<input className="password2_text_area" type="text" name="password1" value={userObj?.password1} onChange={e => handleChange(e)} />
                            </label>
                            <input type="button" value="Register" className="registerBtn" onClick={e => handleSubmit(e)} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
