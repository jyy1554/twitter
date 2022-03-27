import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

function Profile() {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(authService);
        navigate("/");
    };

    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default Profile;
