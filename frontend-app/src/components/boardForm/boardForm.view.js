import React, { useState } from 'react';


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
        const url = 'http://localhost/api/boards';
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
                console.log("Data from board form loaded");
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <p style={{fontWeight: "bold"}}>BOARD FORM</p>
            <p>Name</p><input type="text" value={name} onChange={handleChangeName} />
            <p>Description</p><input type="text" value={description} onChange={handleChangeDescription} />
            <p>User Id</p><input type="text" value={userId} onChange={handleChangeUserId} />
            <p><input type="button" value="Submit" onClick={submitForm} /></p>
            <p>{success}</p>
        </div>
    );
}

export default BoardForm;
