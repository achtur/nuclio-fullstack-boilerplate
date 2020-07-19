import React, {useEffect, useState} from 'react';
import styles from './saveAndRemoveToken.module.css';
import {deleteToken, getToken, setJWT} from "../../utils/localStorage.utils";




const SaveAndRemoveToken = () => {
    const [token, setToken] = useState({});
    const [reloadToken, setReloadToken] = useState(false);

    useEffect(() => {
        const tokenLS = getToken();
        setToken(tokenLS);
    }, [reloadToken])

    const saveToken = () => {
        setJWT('test_token');
        setReloadToken(!reloadToken)
    };

    const removeToken = () => {
        deleteToken();
        setReloadToken(!reloadToken);
    }

    return (
        <div className={styles.__home_container}>
            <h1>Pinterest home</h1>
            <p>{token.token}</p>
            <input type={'button'} onClick={saveToken} value={'SAVE TOKEN'}/>
            <input type={'button'} onClick={removeToken} value={'REMOVE TOKEN'}/>
        </div>
    );
};

export default SaveAndRemoveToken;