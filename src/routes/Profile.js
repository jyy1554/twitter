import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";

function Profile({ userObj }) {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(authService);
        navigate("/");
    };
    const getMyTweets = async () => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };
    useEffect(() => {
        getMyTweets();
    }, []);

    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default Profile;
