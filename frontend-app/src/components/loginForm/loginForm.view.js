import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { default as Button, default as Form } from 'react-bootstrap/Form';
import { getToken, deleteToken, setJWT } from "../../utils/localStorage.utils";
import styles from "./loginForm.module.css";
import cx from 'classnames';


const baseUrl = 'http://localhost/api';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('false');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        const url = `${baseUrl}/auth/login`;
        const body = {
            email: email,
            password: password,
        };
        const myToken = getToken(); // ASK fetch ME
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
                'authorization': `Bearer ${myToken.access_token}` // ASK COMMENT?
            }),
            mode: 'cors',
            body: JSON.stringify(body),
        };

        console.log(options.body)

        fetch(url, options)
            .then(response => {
                if (response.status === 200 ||
                    response.status === 201) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then(payload => {
                setJWT(payload.access_token) // ASK fetch me
                setSuccess('You have successfully logged in');
                setLoggedIn(true)
                console.log("Email and Password sent to DB =>", payload);
            })
            .catch(error => console.log(error));
    };

const logout = () => {
    deleteToken();
    setSuccess("You have successfully logged out. See you next time!"); // TUTORIA - new line?
}

    return (
        // <div className="form-group">

        <div className={styles.__container}>
            <p className={styles.__form__title}>Welcome to Picturest</p>

            {/* No clue what this is for --- // TODO Ask Bootstrap COLT */}
            {/* SOURCE: https://react-bootstrap.github.io/getting-started/introduction */}

            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
            />

            {/* SOURCE: https://react-bootstrap.github.io/components/forms/ */}

            <Form>
                <Form.Group controlId="formGridEmail">
                    <Form.Label className={styles.__form__label}>Email</Form.Label>
                    <Form.Control placeholder="Your Email Here" onChange={handleChangeEmail}/>
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                    <Form.Label className={styles.__form__label}>Password</Form.Label>
                    <Form.Control placeholder="Your Password Here" onChange={handleChangePassword}/>
                </Form.Group>

                <div className={styles.__form__button__container}>
                    <Button className={ cx("btn btn-dark", styles.__form__button__item) } variant="dark" type="submit" onClick={login}>
                        Login
                    </Button>

                    {loggedIn &&
                    <Button className={ cx("btn btn-danger", styles.__form__button__item) } variant="danger" type="submit" onClick={logout}>
                        Logout
                    </Button>}

                </div>
            </Form>

            <div className={styles.__form__successMessage}>
                <p>{success}</p>
            </div>

        </div>
    )
}

export default LoginForm;

// ASK - Eudald - onClick or onSubmit? NOT WORKING