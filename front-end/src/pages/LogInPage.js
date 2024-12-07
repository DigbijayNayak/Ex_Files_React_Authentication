import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const LogInPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const history = useHistory();

    const onLogInClicked = async (e) => {
        alert("Log in functionality not implemented yet");
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/auth/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        });
        const result = await response.json();
        console.log(result);
        history.push("/user-info");
    };
    return (
        <div className="content-container">
            <h1>Login</h1>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <form>
                <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="someone@gmail.com"
                />
                <input
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Password"
                />
                <button
                    disabled={!emailValue || !passwordValue}
                    type="submit"
                    onClick={onLogInClicked}
                >
                    Login
                </button>
                <button onClick={() => history.push("/forgot-password")} type="submit">
                    Forgot Password?
                </button>
                <button onClick={() => history.push("/sign-up")}>
                    Don't have an account? Sign Up
                </button>
            </form>
        </div>
    );
};

export default LogInPage;
