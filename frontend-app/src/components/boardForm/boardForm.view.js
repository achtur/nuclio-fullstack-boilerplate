import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./boardForm.module.css";


const baseUrl = 'http://localhost/api';

const BoardForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [success, setSuccess] = useState('false');

    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleChangeUserId = (event) => {
        setUserId(event.target.value);
    }

    const submitForm = () => {
        const url = `${baseUrl}/boards`;
        const body = {
            name: name,
            description: description,
            user_id: userId,
        };
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
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
                setSuccess('Your data has been submitted');
                console.log("Data from board form sent to DB =>", payload);
            })
            .catch(error => console.log(error));
    };

    return (
        // <div className="form-group">

        <div className={styles.__container}>

            <p className={styles.__form__title}>CREATE BOARD</p>

            {/* No clue what this is for // TODO: Colt Steele Bootstrap */ 
                /* SOURCE: https://react-bootstrap.github.io/getting-started/introduction */}

            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
            />

            {/* SOURCE: https://react-bootstrap.github.io/components/forms/ */}

            <Form>
                <Form.Group controlId="formGridBoardName">
                    <Form.Label className={styles.__form__label}>Board Name</Form.Label>
                    <Form.Control placeholder="Your Board Name Here" onChange={handleChangeName}/>
                </Form.Group>

                <Form.Group controlId="formGridBoardDescription">
                    <Form.Label className={styles.__form__label}>Board Description</Form.Label>
                    <Form.Control placeholder="Your Board Description Here" onChange={handleChangeDescription}/>
                </Form.Group>

                <Form.Group controlId="formGridBoardUserId">
                    <Form.Label className={styles.__form__label}>User Id</Form.Label>
                    <Form.Control placeholder="Your User Id Here" onChange={handleChangeUserId}/>
                </Form.Group>

                {/* <Form.Group controlId="formGridUserId">
                    <Form.Label className={styles.__form__label}>User Id</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={handleChangeUserId}>
                        <option>Choose your User Id...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </Form.Group> // TODO - Dropdown Select User Id */}

                <Button className="btn btn-primary" variant="primary" type="submit" onClick={submitForm} >
                    Submit
                </Button>
            </Form>

            <p>{success}</p>

        </div>
    )
}

export default BoardForm;
