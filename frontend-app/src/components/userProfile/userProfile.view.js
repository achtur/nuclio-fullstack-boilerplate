import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { getToken, setJWT } from '../../utils/localStorage.utils';
import styles from './userProfile.module.css';

const baseUrl = 'http://localhost/api';

const UserProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState('false');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const me = () => {
        const url = `${baseUrl}/auth/me`;
        const body = {
            email,
            username,
        };
        const myToken = getToken(); // ASK fetch ME
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
                authorization: `Bearer ${myToken.access_token}`, // ASK fetch ME
            }),
            mode: 'cors',
            body: JSON.stringify(body),
        };

        console.log(options.body);

        fetch(url, options)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then((payload) => {
                setJWT(payload.access_token); // ASK fetch me
                setSuccess('This is your user profile');
                console.log('Email and Username sent??? to DB =>', payload);
            })
            .catch((error) => console.log(error));
    };

    // TUTORIA - User Profile?
    // FIXME - User Profile?

    return (
        <>
            <div className={styles.__container}>
                <div>
                    <FontAwesomeIcon icon={faUserCircle} size="6x" />
                </div>
                <p className={styles.__username}>Aquí el username {username}</p>

                <div className={styles.__user__info__container}>
                    <div className={styles.__user__info}>
                        <p className={styles.__user__info__label}>Email:{username}</p>
                        <p className={styles.__user__info__label}>First Name:{username}</p>
                        <p className={styles.__user__info__label}>Last Name:{username}</p>
                    </div>
                    <div className={styles.__user__info}>
                        <p className={styles.__user__info__content}>Aquí el email{username}</p>
                        <p className={styles.__user__info__content}>Aquí el first name{username}</p>
                        <p className={styles.__user__info__content}>Aquí el last name{username}</p>
                    </div>
                </div>
                <div className={styles.__user__bio__container}>
                    <p className={styles.__user__bio__label}>Bio:{username}</p>
                    <p className={styles.__user__bio__content}>Aquí la bio{username}</p>
                </div>
                <div className={styles.__successMessage}>
                    <p>{success}</p>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
