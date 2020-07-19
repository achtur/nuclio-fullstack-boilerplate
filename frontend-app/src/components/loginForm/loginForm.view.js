import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { default as Button, default as Form } from 'react-bootstrap/Form';
import styles from "./loginForm.module.css";


const baseUrl = 'http://localhost/api';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('false');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const submitForm = () => {
        const url = `${baseUrl}/auth/login`;
        const body = {
            email: email,
            password: password,
        };
        const myToken = getToken(); //TODO fetch ME
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
                'authorization': `Bearer ${myToken.access_token}` // TODO fetch ME

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
                setJWT(payload.access_token) // TODO LOGIN
                setSuccess('You have been succesfully logged in');
                console.log("Email and Password sent to DB =>", payload);
            })
            .catch(error => console.log(error));
    };

    return (
        // <div className="form-group">

        <div className={styles.__container}>
            <p className={styles.__form__label}>Welcome to Picturest</p>

            {/* No clue what this is for --- // TODO Ask Bootstrap */}
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

                <Button className="btn btn-success" variant="primary" type="submit" onClick={submitForm} align="center">
                    Login
                </Button>

                <Button className="btn btn-danger" variant="danger" type="submit" onClick={submitForm} align="center">
                    Logout
                </Button>
            </Form>

            <p>{success}</p>

        </div>
    )
}

export default LoginForm;
