import React from "react";
import Navbar, { userInfo } from "./Navbar";

function Profile() {
    return (
        <>
            <Navbar />
            <div  className="profile-div">
            <div style={{margin : "auto"}}>
                <h3> Your Name : {userInfo.name} </h3>
                <h3> Your Email : {userInfo.email}</h3>
            </div>
            </div>
        </>
    );
}

export default Profile