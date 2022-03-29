import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        onAuthStateChanged(authService, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user); //트윗 작성자를 알기 위해
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <div>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "Initializing..."
            )}
        </div>
    );
}

export default App;
