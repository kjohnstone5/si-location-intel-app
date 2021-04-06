import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import LoginImage from '../images/Login-Page-Image.png';
import { useHistory } from "react-router-dom";
import FloatLabelTextBox from "../components/FloatLabelTextBox.js"
import { API_BASE_URL, ACCESS_TOKEN_NAME, ENVIRONMENT } from '../constants/apiConstants.js';
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";

export default function Login(props) {
    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const from = props.location.state || {from: {pathname: '/'}};
    const pathname = from.from.pathname;

    const [errorClass, setErrorClass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    function validateForm() {
        return state.email.length > 0 && state.password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        const payload = {
            "email": state.email,
            "password": state.password,
        }
        try {
            const api_url = ENVIRONMENT === "development" ? "/api/user/login" : API_BASE_URL + "/user/login";

            axios.post(api_url, payload, {
                headers: {
                    useCredentails: true,
                    'x-api-key': ACCESS_TOKEN_NAME,
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        userHasAuthenticated(true);
                        history.push(pathname);
                    } else {
                        onError("Not logged in");
                    }
                })
                .catch(function (error) {
                    setIsLoading(false);
                    setErrorClass("error");

                    if (error.response) {
                        // client received an error response (5xx, 4xx)
                        setErrorMessage(error.response.data);
                      } else if (error.request) {
                        // client never received a response, or request never left
                        setErrorMessage("Error Occurred on Login");
                      } else {
                        // anything else
                        setErrorMessage("Error Occurred on Login");
                      }
                });

        } catch (e) {
            onError(e);
            setIsLoading(false);
            setErrorClass("error");
            setErrorMessage("Error Occurred on Login");
        }
    };

    return (
        <div className="Login-Container">
            <div className="Login-Container-Row">
                <div className="Login">
                    <p className="Login-Header">Login</p>
                    <div className="Login-Form">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <FloatLabelTextBox
                                    inputLabel="EMAIL"
                                    inputAutoFocus="true"
                                    inputType="email"
                                    inputName="email"
                                    inputPlaceholder="Email"
                                    inputValue={state.email}
                                    inputClassName={errorClass}
                                    handleChangeProps={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <FloatLabelTextBox
                                    inputLabel="PASSWORD"
                                    inputAutoFocus="false"
                                    inputType="password"
                                    inputName="password"
                                    inputPlaceholder="Password"
                                    inputValue={state.password}
                                    inputClassName={errorClass}
                                    inputHelperText={errorMessage}
                                    handleChangeProps={handleChange}
                                />
                            </Form.Group>
                            <LoaderButton
                                block
                                size="lg"
                                type="submit"
                                isLoading={isLoading}
                                disabled={!validateForm()}>
                                Log In
                            </LoaderButton>
                        </Form>
                    </div>
                </div>
                <div className="Login-Image">
                    <img src={LoginImage} alt="" />
                </div>
            </div>
        </div>
    );
}