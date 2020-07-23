import React from 'react';
import {
    Link,
} from "react-router-dom";
import styles from "./navBar.module.css";
import SearchBar from "../searchBar/searchBar.view";
import { BOARD, BOARD_FORM, HOME, LIST_PINS, PINS_FORM } from "../../routes/routes";


const NavBar = () => {
    return (
        <div>
        <header className={styles.__navbar}>

            <div className={styles.__navbar__logo}>
                <Link to={HOME}><img src={"https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png"} alt='Logo' width="22"/></Link>
            </div>

            <SearchBar />

            <div className={styles.__navbar__item}>
                <Link to={LIST_PINS}>My pins</Link>
            </div>

            <div className={styles.__navbar__item}>
                <Link to={BOARD}>My board #id</Link>
            </div>

            <div className={styles.__navbar__item}>
                <Link to={PINS_FORM}>Create pins</Link>
            </div>

            <div className={styles.__navbar__item}>
                <Link to={BOARD_FORM}>Create boards</Link>
            </div>

        </header>
    </div>
    )
}

export default NavBar;


