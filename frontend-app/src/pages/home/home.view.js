import React from 'react';
import LoginForm from "../../components/loginForm/loginForm.view";
import SaveAndRemoveToken from "../../components/saveAndRemoveToken/saveAndRemoveToken.view";
import styles from './home.module.css';

const Home = () => {

    return (
        <div className={styles.__home_container}>
            <SaveAndRemoveToken />
            <LoginForm />
            {/* <BoardPick /> */}
        </div>
    );

};

export default Home;
