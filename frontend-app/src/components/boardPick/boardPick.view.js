import React, { useState, useEffect } from 'react';
import styles from './boardPick.module.css';

const BoardPick = () => {

    const [boardId, setBoardId] = useState();
    const [boards, setBoards] = useState([]);

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


    const handleChangeBoardId = (event) => {
        setBoardId(event.target.value);
    }

    return (
        <div className={styles.__container}>
            <label htmlFor="boardName-form">Board name</label>
            <select value={boardId} onChange={handleChangeBoardId}>
                {
                    boards.map((board) => {
                        return (<option key={'board-select' + board.id} value={board.id}>{board.name}</option>)
                    })
                }
            </select>
        </div>
    );

}

export default BoardPick;
