import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from "react-router-dom";
import styles from "./App.module.css";
import Board from "./components/board/board.view";
import BoardForm from "./components/boardForm/boardForm.view";
import ListPins from "./components/listPins/listPins.view";
import PinForm from "./components/pinForm/pinForm.view";

import NavBar from "./components/navBar/navBar.view";

import Home from "./pages/home/home.view";
import { BOARD, BOARD_FORM, HOME, LIST_PINS, PINS_FORM } from "./routes/routes";



function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path={HOME}>
                    <Home />
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

/* SOURCE Append 2 classNames:
** import cx from 'classnames';
** Ex: <div className={ cx(styles.__navbar__title, styles.__navbar__item) }>Blablabla</div>
*/

/* ASK - SearchBar Component - is this the right way to concile it with React Route Dom? 
<Route path={SEARCH_BAR}>
    <SearchBar />
</Route>
*/

/* ASK - CSS for App - import styles
** when I try >>> import styles from "./App.module.css"; >>> OK
** when I try >>> import styles from "./App.css"; >>> ERROR - should I be using this one???
SOURCE 1: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
SOURCE 2: https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e#.re1pdcz87
"A CSS Module is a CSS file in which all class names and animation names are scoped locally by default."
*/

/* ASK - NavBar - should it be a separate component? Tree structure...? >>> Router (Link + Switch)? SLACK*/

/* ASK - backend-api/docker-compose (1).yml ??? */