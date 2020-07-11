import React, { useState } from 'react';
import styles from './pinCard.module.css';     // lo de "module" es un standard de poner nombres, pero hay muchos standards
import PropTypes from 'prop-types';     // para meterle tipos a JS
import PinCardActionsView from "./pinCardActions/pinCardActions.view";

const PinCard = ({image_url, name}) => {
    // Hooks - por def no hay nada - setIsHovered es un setter
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={styles.__container}     // Es lo mismo que "className = (styles.pinCard__container}"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.__image__container}>
                <img src={image_url} className={styles.__image} alt="pinImage"/>
                {isHovered && <PinCardActionsView />}
            </div>
            <span className={styles.__pinName}>{name}</span>


        </div>
    )
}

PinCard.propTypes = {
    image_url: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
}

export default PinCard;