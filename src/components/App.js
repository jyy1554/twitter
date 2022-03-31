import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        onAuthStateChanged(authService, (user) => {
            user ? setUserObj(user) : setUserObj(null);
            setInit(true);
        });
    }, []);

    return (
        <div>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializing..."
            )}
        </div>
    );
}

export default App;
