import React from 'react';
import LoginForm from "../../components/loginForm/loginForm.view";
import styles from './home.module.css';

const Home = () => {

    return (
        <div className={styles.__home_container}>
            <LoginForm />
            {/* <BoardPick /> */}
        </div>
    );

};

export default Home;
