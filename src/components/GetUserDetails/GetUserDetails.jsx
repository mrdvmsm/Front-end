import React, { useEffect, useState } from "react";
import "./GetUserDetails.css";
import axios from "axios";
import { homeAppUrl } from "../../constants";

export const GetUserDetails = () => {
    const [userObj, setUserObj] = useState(JSON.parse(sessionStorage.getItem('userAuth')));
    const [success, setSuccess] = useState({});

    useEffect(() => {
        const requestObject = [
            {
                "body": {
                    "authUserDetails": {
                        "username": userObj?.username,
                        "email": userObj?.email
                    }
                }
            }
        ]
        axios.post(`${homeAppUrl}/get-user-details/`,requestObject).then((res) => {
            if (res) {
                setSuccess(res.data[0]);
            }
        }).catch((e) => {
            setSuccess({ "message": "An error occured", "status": "Failed" })
        })
    }, []);

    return (
        <div className="updateDetailsDiv">
            <div className="updateDetailsForm" id="updateDetails">
                <div className="row">
                    <div>
                        <h4 className="updateDetailsHeading">Member Details</h4>
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
                                <span className="name_text_area" >{userObj?.username} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Mail Id:
                                <span className="mail_text_area" >{userObj?.email} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Zone:
                                <span className="country_text_area">{success?.userDetails?.ZoneDetails} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Age:
                                <span className="dob_text_area" >{success?.userDetails?.age } </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Date of Birth:
                                <span className="dob_text_area" >{success?.userDetails?.dateOfBirth } </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Phone No:
                                <span className="phone_text_area">{success?.userDetails?.phoneNumberDetails?.prefix} {success?.userDetails?.phoneNumberDetails?.phoneNumber}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Id Proof Type:
                                <span className="idtype_text_area">{success?.userDetails?.idProofDetails?.idProofType}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Id Proof No:
                                <span className="idnumber_text_area">{success?.userDetails?.idProofDetails?.idProofNumber} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Door No:
                                <span className="doorno_text_area">{success?.userDetails?.addressDetails?.doorNo}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Street Name:
                                <span className="street_text_area">{success?.userDetails?.addressDetails?.streetName}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Area Name:
                                <span className="area_text">{success?.userDetails?.addressDetails?.areaName} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Village Name:
                                <span className="village_text_area">{success?.userDetails?.addressDetails?.villageName}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Taluk Name:
                                <span className="taluk_text_area">{success?.userDetails?.addressDetails?.talukName}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                District:
                                <span className="district_text_area">{success?.userDetails?.addressDetails?.districtName}</span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                State:
                                <span className="state_text_area">{success?.userDetails?.addressDetails?.stateName} </span>
                            </label>
                            <br></br>
                            <label className="text_label">
                                Pincode:
                                <span className="country_text_area">{success?.userDetails?.addressDetails?.pincode} </span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
