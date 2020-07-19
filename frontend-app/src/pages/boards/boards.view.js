import React from 'react';
import styles from './boards.module.css';
import BoardForm from "../../components/boardPick/boardPick.view";


const Boards = () => {

    return (
        <>
            <BoardPick />
            {/* Aquí habría que llamar al componente ListPins con la url:
                const url = 'http://localhost/api/pins/board/{boardId}'  /** TODO pins from board TUTORIA */ }
        </>
    );
};

export default Boards;
