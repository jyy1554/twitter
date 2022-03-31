import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";

function Profile({ userObj }) {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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
    const onChange = (e) => {
        const { value } = e.target;
        setNewDisplayName(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {
                displayName: newDisplayName,
            });
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default Profile;
