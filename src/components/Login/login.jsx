import { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { homeAppUrl } from "../../constants";

const initialState = {
    name: "",
    password: "",
};
export const Login = () => {
    const [userObj, setUserObj] = useState(initialState);
    const [success, setSuccess] = useState({});
    const redirect = useNavigate();
    const [currentUserSession, setCurrentUserSession] = useState(JSON.parse(sessionStorage.getItem('userAuth')));
    const [profileDetails, setProfileDetails] = useState(sessionStorage.getItem('profileUpdated'));
    

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
                        "password": userObj?.password
                    }
                }
            }
        ]
        axios.post(`${homeAppUrl}/login/`, requestObject).then((res) => {
            if (res) {
                const resp = JSON.parse(res.data)
                setSuccess(resp[0]);
            }
        }).catch((e) => {
            setSuccess({ "message": "An error occured", "status": "Failed" });
        })
    }

    useEffect(() => {
        if (success?.User !== undefined) {
            sessionStorage.removeItem('userAuth');
            sessionStorage.setItem('userAuth', JSON.stringify(success?.User));
            sessionStorage.setItem('profileUpdated', (success?.userProfileDetails));
        }
        setCurrentUserSession(JSON.parse(sessionStorage.getItem('userAuth')));
        setProfileDetails((sessionStorage.getItem('profileUpdated')));
        setTimeout(() => {
            if(success?.User !== undefined && success?.User?.username != ''){
                if(success?.userProfileDetails == true){
                    redirect("/get-user-info");
                } else {
                    redirect("/update-profile");
                }
            }
        }, 2000);
    }, [success]);

    useEffect(() => {
        if (currentUserSession?.username?.length >0) {
            if ((profileDetails) == 'true') {
                redirect("/get-user-info");
            } else {
                redirect("/update-profile");
            }
        }
    }, [])

    return (
        <div className="loginDiv">
            <div className="loginForm" id="login">
                <div className="row">
                    <div>
                        <h4 className="loginHeading">Login</h4>
                        <span className="messageBar">
                            {success?.message && <p className={`message-${success.status}`}>
                                <span>
                                    {success?.message}
                                </span>
                            </p>}
                        </span>
                        <form className="loginFormDiv">
                            <label className="text_label">
                                Name: <input className="name_text_area" type="text" name='name' value={userObj?.name} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Password: <input className="password1_text_area" type="text" name="password" value={userObj?.password} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <input type="button" value="Login" className="loginBtn" onClick={e => handleSubmit(e)} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
