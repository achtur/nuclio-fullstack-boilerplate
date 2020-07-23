import React, { useState, useEffect } from 'react';
import styles from './listPins.module.css';
import PinCard from "../pinCard/pinCard.view";
import Masonry from 'react-masonry-css'

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListPins = () => {

    const [pins, setPins] = useState([]);

    useEffect(() => {
        const url = 'http://localhost/api/pins';
        const options = {
            method: 'GET',
            headers: new Headers(),
        };

        fetch(url, options)
            .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);
                })
            .then(payload => {
                    console.log("Data from DB loaded");
                    setPins(payload);
                })
            .catch(error => console.log(error));
    }, []);

    const breakpointColumnsObj = {
        default: 5,
        1200: 4,
        1000: 3,
        800: 2,
        600: 1
    };

    return (
        <>
        <div className={styles.__spinner}>
            <FontAwesomeIcon icon={faSpinner} size="2x" spin /> 
        </div>

        <Masonry
        breakpointCols={breakpointColumnsObj}
        className = {styles.__masonry__grid}
        columnClassName = {styles.__masonry__grid__column}
        >
            {pins && pins.map(pin => {
                return (
                    <PinCard
                        name={pin.note}
                        description={pin.description}
                        image_url={pin.media_url}
                    />
                );
            })}
        </Masonry>
        </>
    );
};

export default ListPins;

// ASK - Spinner - Com fer que aparegui només quan no han arribat els pins? MAYBE || ?



/** Amb l'Eudald aconseguim permís per accedir a la DB des de React (FE)
 * Tot el que hi ha aquí a sota excepte la linia "setIsFetching(false)"
 * ja està posat, d'una altra manera, en el fetch que tinc aquí dalt, i que funciona
 * Potser en un futur afegirem una linia de "setIsFetching(false)" o algo...


 const fetchPins = () => {
        fetch('http://localhost/api/pins')
            .then(response => response.json())
            .then(response => {
               console.log(response)
               setPins(response)
               setIsFetching(false) // ASK Eudald - near future UseState Fetching?
            })
     }


 */