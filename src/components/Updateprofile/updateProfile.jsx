import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { homeAppUrl } from "../../constants";


const initialState = {
    dateOfBirth: "",
    age: "",
    prefix: "+91",
    phoneNumber: "",
    idProofType: 'Aadhar Card',
    idProofNumber: "",
    doorNo: "",
    streetName: "",
    areaName: "",
    villageName: "",
    talukName: "",
    districtName: "",
    stateName: "",
    pincode: ""
};
export const UpdateDetails = () => {
    const redirect = useNavigate();
    const [userObj, setUserObj] = useState(JSON.parse(sessionStorage.getItem('userAuth')));
    const [userDetailsObj, setUserDetailsObj] = useState(initialState);
    const [success, setSuccess] = useState({});
    const [districtApiData, setDistrictApiData] = useState([]);
    const idProofTypes = ['Aadhar Card', 'Voter Id', 'Driving License', 'Pan Card']

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetailsObj((prevState) => ({ ...prevState, [name]: value }));
    };

    const calculate_age = () => {
        var today = new Date();
        var birthDate = new Date(userDetailsObj?.dateOfBirth);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        setUserDetailsObj((prevState) => ({ ...prevState, age: age_now }));
    }

    const handleSubmit = (e) => {
        const requestObject = [
            {
                "body": {
                    "authUserDetails": {
                        "username": userObj?.username,
                        "email": userObj?.email
                    },
                    "userPersonalDetails": {
                        "prefix": "+91",
                        "phoneNumber": userDetailsObj?.phoneNumber,
                        "age": userDetailsObj?.age,
                        "dateOfBirth":userDetailsObj?.dateOfBirth,
                        "address": {
                            "doorNo": userDetailsObj?.doorNo,
                            "streetName": userDetailsObj?.streetName,
                            "areaName": userDetailsObj?.areaName,
                            "villageName": userDetailsObj?.villageName,
                            "talukName": userDetailsObj?.talukName,
                            "districtName": userDetailsObj?.districtName,
                            "stateName": userDetailsObj?.stateName,
                            "pincode": userDetailsObj?.pincode
                        },
                        "idproofDetails": {
                            "idProofType": userDetailsObj?.idProofType,
                            "idProofNumber": userDetailsObj?.idProofNumber
                        }
                    }
                }
            }
        ]
        axios.post(`${homeAppUrl}/add-personal-details/`, requestObject).then((res) => {
            if (res) {
                const resp = JSON.parse(res.data)
                setSuccess(resp[0])
                setTimeout(() => {
                    console.log(">>>>",resp[0]);
                    if(resp[0]?.status=='Success'){
                        sessionStorage.setItem('profileUpdated',true)
                        redirect("/get-user-info");
                    }
                }, 3000);
            }
        })
    }

    useEffect(() => {
        axios.get(`${homeAppUrl}/get-all-districts/`).then((res) => {
            if (res) {
                setDistrictApiData(res?.data);
            }
        }).catch((e) => {
            setSuccess({ "message": "An error occured", "status": "Failed" })
        })
        setUserObj(JSON.parse(sessionStorage.getItem('userAuth')));
    }, []);

    useEffect(() => {
        calculate_age();
    }, [userDetailsObj?.dateOfBirth])
    return (
        <div className="updateDetailsDiv">
            <div className="updateDetailsForm" id="updateDetails">
                <div className="row">
                    <div>
                        <h4 className="updateDetailsHeading">Update Profile Details</h4>
                        <span className="messageBar">
                            {success?.message && <p className={`message-${success.status}`}>
                                <span>
                                    {success?.message}
                                </span>
                            </p>}
                        </span>
                        <form>
                            <label className="text_label">
                                Name:
                                <input className="name_text_area" type="text" disabled value={userObj?.username} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Mail Id:
                                <input className="mail_text_area" type="email" disabled value={userObj?.email} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Date of Birth:
                                <input className="dob_text_area" type="date" name="dateOfBirth" value={userDetailsObj?.dateOfBirth} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Phone No:
                                <input className="phone_text_area" type="number" name="phoneNumber" value={userDetailsObj?.phoneNumber} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Id Proof Type:
                                <select className="idtype_text_area" type="text" name="idProofType" value={userDetailsObj?.idProofType} onChange={e => handleChange(e)} >
                                    {idProofTypes.map((type, index) => {
                                        return (
                                            <option key={index} value={type} > {type}</option>
                                        )
                                    })}
                                </select>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Id Proof No:
                                <input className="idnumber_text_area" type="number" name="idProofNumber" value={userDetailsObj?.idProofNumber} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Door No:
                                <input className="doorno_text_area" type="text" name="doorNo" value={userDetailsObj?.doorNo} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Street Name:
                                <input className="street_text_area" type="text" name="streetName" value={userDetailsObj?.streetName} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Area Name:
                                <input className="area_text" type="text" name="areaName" value={userDetailsObj?.areaName} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Village Name:
                                <input className="village_text_area" type="text" name="villageName" value={userDetailsObj?.villageName} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Taluk Name:
                                <input className="taluk_text_area" type="text" name="talukName" value={userDetailsObj?.talukName} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                District:
                                <select className="district_text_area" type="text" name="districtName" value={userDetailsObj?.districtName} onChange={e => handleChange(e)} >
                                    {districtApiData.map((dist, index) => {
                                        return (
                                            <option key={index} value={dist?.districtName} > {dist?.districtName}</option>
                                        )
                                    })}
                                </select>
                                {/* <input className="district_text_area" type="select"  name="districtName" value={userDetailsObj?.districtName} onChange={e => handleChange(e)} /> */}
                            </label>
                            <br></br>
                            <label className="text_label">
                                State:
                                <input className="state_text_area" type="text" name="stateName" value={userDetailsObj?.stateName} onChange={e => handleChange(e)} />
                            </label>
                            <br></br>
                            <label className="text_label">
                                Pincode:
                                <input className="country_text_area" type="number" name="pincode" value={userDetailsObj?.pincode} onChange={e => handleChange(e)} />
                            </label>
                        </form>
                        <input type="button" value="Update Details" className="updateBtn" onClick={e => handleSubmit(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
};
