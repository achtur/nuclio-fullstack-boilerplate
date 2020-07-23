import 'bootstrap/dist/css/bootstrap.min.css';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { default as Button, default as Form } from 'react-bootstrap/Form';
import styles from "./pinForm.module.css";


const baseUrl = 'http://localhost/api';


const PinForm = () => {

    const [note, setNote] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [boardId, setBoardId] = useState();
    const [boards, setBoards] = useState([]);
    const [success, setSuccess] = useState('false');

    const handleChangeNote = (event) => {
        setNote(event.target.value);
    }
    const handleChangeMediaUrl = (event) => {
        setMediaUrl(event.target.value);
    }
    const handleChangeBoardId = (event) => {
        setBoardId(event.target.value);
    }

    const submitForm = () => {
        const url = `${baseUrl}/pins`;
        const body = {
            note: note,
            media_url: mediaUrl,
            board_id: boardId,
        };
       // const myToken = getToken(); // ASK - Auth Pin?
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
              //  'authorization': `Bearer ${myToken.access_token}` // ASK - Auth Pin?
            }),
            mode: 'cors',
            body: JSON.stringify(body),
        };

        console.log(body) 
        console.log("-------")
        console.log(options) 
        //debugger;

        fetch(url, options)
            .then(response => {
                if (response.status === 200 ||
                    response.status === 201) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then(payload => {
                // setJWT(payload.access_token) // ASK - Auth Pin?
                setSuccess('Your data has been submitted');
                console.log("Data from pin form sent to DB =>", payload);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        const url = `${baseUrl}/boards`;
        const options = {
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
        };

        fetch(url, options)
            .then(response => {
                if (response.status >= 200 || response.status < 300) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then(payload => {
                console.log("Board data from DB loaded");
                setBoards(payload);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        // <div className="form-group">

        <div className = {styles.__container}>

            <p className={styles.__form__title}>CREATE PIN</p>

            {
                /* No clue what this is for --- // TODO: Colt Steele Bootstrap */ 
                /* SOURCE: https://react-bootstrap.github.io/getting-started/introduction */
            }

            <link
            rel = "stylesheet"
            href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity = "sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin = "anonymous"
            />

            {
                /* SOURCE: https://react-bootstrap.github.io/components/forms/ */
            }

            <Form>
                <Form.Group controlId = "formGridPinNote">
                    <Form.Label className = {styles.__form__label}>Note</Form.Label>
                    <Form.Control placeholder = "Your Note Here" onChange = {handleChangeNote} />
                </Form.Group>

                <Form.Group controlId = "formGridPinMediaUrl">
                    <Form.Label className = {styles.__form__label}>Media Url</Form.Label>
                    <Form.Control placeholder = "Your Media Url Here" onChange = {handleChangeMediaUrl}/>
                </Form.Group>

                <Form.Group controlId = "formGridPinBoardName" >
                    <Form.Label className = {styles.__form__label}>Board Name</Form.Label>
                    <Form.Control as = "select" defaultValue = "Choose a board name..." onChange = {handleChangeBoardId}>
                        {
                            /*
                            <option>Choose a board name...</option> // ASK - Default value?
                            */
                        }

                        {
                            boards.map((board) => {
                                return ( <option key = {'board-select' + board.id} value = {board.id}> {board.name} </option>)
                            })
                        }
                    </Form.Control>
                </Form.Group>

                <Button className={ cx("btn btn-dark", styles.__form__button__item) } variant = "dark" type = "submit" onClick = {submitForm}>Submit</Button>

            </Form>

            <div className={styles.__form__successMessage}>
                <p>{success}</p>
            </div>
        </div>
    )
}

        export default PinForm;