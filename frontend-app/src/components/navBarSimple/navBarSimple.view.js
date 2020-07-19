import React from 'react';
import styles from './navbar.module.css';
import cx from 'classnames'
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";

const NavBar = () => (
    <Router>
        <header className={styles.__navbar}>
            <div className={ cx(styles.__navbar__title, styles.__navbar__item) }>Picturest</div>
            <div className={styles.__navbar__item}>Boards</div>
            <div className={styles.__navbar__item}><Link to="/create-boards">Create Boards</Link></div>
            <div className={styles.__navbar__item} href="/create-pins">Create Pins (onClick?)</div>

            <button className={styles.__navbar__item} href="/create-pins">Why is this button green?</button>

            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />

        </header>
    </Router>
);

export default NavBar;



/** Source <Link>:
 https://reactrouter.com/web/guides/quick-start
 TODO Tutoria navbar-simple - links
 */




/** Source CSS:
 https://codepen.io/doytch/pen/Kyypba


 const NavBar = () => (
 <header className='navbar-simple'>
 <div className='navbar__title navbar__item'>Picturest</div>
 <div className='navbar__item'>Page 1</div>
 <div className='navbar__item'>Page 2</div>
 <div className='navbar__item'>Page 3</div>
 </header>
 );

 */