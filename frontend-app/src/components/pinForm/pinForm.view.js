import React, { useState, useEffect } from 'react';
import styles from './pinForm.module.css';

const PinForm = () => {

    const [note, setNote] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [boardId, setBoardId] = useState();
    const [boards, setBoards] = useState([]);
    const [success, setSuccess] = useState('false');

    const submitForm = () => {
        const url = 'http://localhost/api/pins';
        const body = {
            note: note,
            media_url: mediaUrl,
            board_id: boardId,
        };
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(body),
        };

        fetch(url, options) // TODO falla aqui!
            .then(response => {
                if (response.status === 200 ||
                    response.status === 201) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then(payload => {
                setSuccess('Your data has been submitted');
                console.log("Data from pin form sent to DB");
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        const url = 'http://localhost/api/boards';
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
                }
            )
            .then(payload => {
                    console.log("Board data from DB loaded");
                    setBoards(payload);
                }
            )
            .catch(error => console.log(error));
    }, []);

    const handleChangeNote = (event) => {
        setNote(event.target.value);
    }
    const handleChangeMediaUrl = (event) => {
        setMediaUrl(event.target.value);
    }
    const handleChangeBoardId = (event) => {
        setBoardId(event.target.value);
    }

    return (
        <div className={styles.__container}>
            <p style={{fontWeight: "bold"}}>PIN FORM</p>

            <label htmlFor="note-form">Note</label>  {/* label "for" instead of "htmlFor"? */}
            <input id="note-form" type={"text"} value={note} onChange={handleChangeNote} />   {/* same as "onChange={e => setNote(e.target.value)" */}

            <label htmlFor="media-form">Media url</label>
            <input id="media-form" type={"text"} value={mediaUrl} onChange={handleChangeMediaUrl}/>

            <label htmlFor="boardName-form">Board name</label>
            <select value={boardId} onChange={handleChangeBoardId}>
                {
                    boards.map((board) => {
                        return (<option key={'board-select' + board.id} value={board.id}>{board.name}</option>)
                    })
                }
            </select>

            <input type={"button"} value={"Submit"} onClick={submitForm} />

            <p>{success}</p>
        </div>
    );
}

export default PinForm;
