import React, { useState } from "react";
import { authService } from "../fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;
            if (newAccount) {
                //create account
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            } else {
                //login
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (e) => {
        const { name } = e.target;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Login"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Login" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
