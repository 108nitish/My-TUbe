import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { useIt } from "../context.jsx";

const SignIn = () => {
    const { setShowSignIn, setUser, URL } = useIt();
    const [currState, setCurrState] = useState("Sign In");
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");  
    const [successMessage, setSuccessMessage] = useState("");  

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(""); 
        setSuccessMessage("");

        let url =  URL +   (currState === "Sign In" ? "auth/signin" : "auth/signup");

        try {
            const response = await axios.post(url, data);
            console.log("Response from backend:", response);  // Add this line to check the response

            if (response.status === 200) {
                if (currState === "Sign In") { 
                    setUser(response.data); 
                    localStorage.setItem("token-tube", JSON.stringify(response.data));
                    setShowSignIn(false);  
                } else { 
                    setSuccessMessage("Account created successfully! You can now sign in.");
                    setCurrState("Sign In");
                }
            }else{
                setErrorMessage(response.data);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Something went wrong..."); // Show error message
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <div className="closesignin" onClick={() => setShowSignIn(false)}>X</div>
                </div>
                 
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name="name" type="text" onChange={onChangeHandler} value={data.name} placeholder="Your name" required />
                    )}
                    <input name="email" type="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
                    <input name="password" type="password" onChange={onChangeHandler} value={data.password} placeholder="Your Password" required />
                </div>

                {currState === "Sign Up" && (
                    <div className="login-popup-condition">
                        <label>
                            <input type="checkbox" required /> I agree to the terms and conditions.
                        </label>
                    </div>
                )}

                <button type="submit">{currState === "Sign Up" ? "Create Account" : "Sign In"}</button>

                {currState === "Sign In" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Sign In")}>Sign In here</span></p>
                )}
            </form>
        </div>
    );
};

export default SignIn;
