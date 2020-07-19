import React from 'react';
import styles from './pinCardActions.module.css';

const PinCardActionsView = () => {
    return (
        <div className={styles.__container}>
            <div className={styles.__message}>Add pin to favourites</div>
        </div>
    );
}

PinCardActionsView.propTypes = {};

export default PinCardActionsView;