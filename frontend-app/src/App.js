import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css/fonts.css';
import Board from './components/board/board.view';
import BoardForm from './components/boardForm/boardForm.view';
import ListPins from './components/listPins/listPins.view';
import NavBar from './components/navBar/navBar.view';
import PinForm from './components/pinForm/pinForm.view';
import UserProfile from './components/userProfile/userProfile.view';
import Home from './pages/home/home.view';
import { BOARD, BOARD_FORM, HOME, LIST_PINS, PINS_FORM, USER_PROFILE } from './routes/routes';

function App() {
    return (
        <Router>
            <NavBar />

            <Switch>
                {/* ASK - Redirect - is this the best way??? */}
                <Route exact path={HOME}>
                      {localStorage.getItem('JWT_KEY') ? <Redirect to={LIST_PINS} /> : <Home />}
                </Route>
                <Route exact path={USER_PROFILE}>
                    <UserProfile />
                </Route>
                <Route exact path={LIST_PINS}>
                    <ListPins />
                </Route>
                <Route exact path={PINS_FORM}>
                    <PinForm />
                </Route>
                <Route path={BOARD_FORM}>
                    <BoardForm />
                </Route>
                <Route path={BOARD}>
                    <Board />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

/* SOURCE React Router: https://reactrouter.com/web/guides/quick-start */

/* NOTE: LOCAL and GLOBAL classes - HOW TO

1) Use a LOCAL className

    import styles from "./navBar.module.css";

    Ex: <div className={styles.__navbar__item}>


2) Use a GLOBAL className

    import './App.css'; (SOLO EN APP YA ES SUFICIENTE, PASA A TODOS LOS HIJOS!)

    <button className="button button--blue">My blue button</button>


3) APPEND 2 classNames

    import cx from 'classnames';

    Ex 1 (two LOCAL classes):
        <div className={ cx(styles.__navbar__title, styles.__navbar__item) }>Blablabla</div>

    Ex 2 (one GLOBAL and one LOCAL class):
        <p className={ cx('warningglobalstyle', styles.__warning_local_style) }>Blablabla</p>

*/

/* ASK - CSS for App - import styles
** when I try >>> import styles from "./App.module.css"; >>> OK
** when I try >>> import styles from "./App.css"; >>> ERROR - should I be using this one???
SOURCE 1: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
SOURCE 2: https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e#.re1pdcz87
"A CSS Module is a CSS file in which all class names and animation names are scoped locally by default."
*/

/* ASK - backend-api/docker-compose (1).yml ??? */

// TODO NavBar inside each of the components?
