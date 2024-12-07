import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const SignUpPage = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const history = useHistory();

    const onSignUpClicked = async (e) => {
        alert("Sign up functionality not implemented yet");
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
            <h1>Sign Up</h1>
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
                <input
                    type="password"
                    value={confirmPasswordValue}
                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
                    placeholder="Confirm Password"
                />
                <hr />
                <button
                    disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
                    type="submit"
                    onClick={onSignUpClicked}
                >
                    Sign Up
                </button>
                <button onClick={() => history.push("/login")}>
                    Already have an account? Log In
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
