import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route
                            path="/profile"
                            element={<Profile userObj={userObj} />}
                        />
                        <Route path="*" element={<Auth to="/" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Auth />} />
                        <Route path="*" element={<Auth to="/" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
