import React, { useState, useEffect } from 'react';
import styles from './listPins.module.css';
import PinCard from "../pinCard/pinCard.view";



const ListPins = () => {

    const [pins, setPins] = useState([]); // TODO Hooks


    /** Amb l'Eudald aconseguim permís per accedir a la DB des de React (FE)
     * Tot el que hi ha aquí a sota excepte la linia "setIsFetching(false)"
     * ja està posat, d'una altra manera, en el fetch que tinc a sota, i que funciona
     * Potser en un futur afegirem una linia de "setIsFetching(false)" o algo...


     const fetchPins = () => {
        fetch('http://localhost/api/pins')
            .then(response => response.json())
            .then(response => {
               console.log(response)
               setPins(response)
               setIsFetching(false) // TODO near future UseState Fetching
            })
     }


     */


    useEffect(() => {
        /* const url = 'https://sheetdb.io/api/v1/4mueuudmwry9n'; */
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
                }
            )
            .then(payload => {
                    console.log("Data from DB loaded");
                    setPins(payload);
                }
            )
            .catch(error => console.log(error));
    }, []);


    return (
        <div>
            {pins && pins.map(pin => {
                return (
                    <PinCard
                        name={pin.note}
                        image_url={pin.media_url}
                    />
                );
            })}
        </div>
    );
};

export default ListPins;












/**

    useEffect ( () => {
        const url = 'https://sheetdb.io/api/v1/4mueuudmwry9n';
        const options = {
            method: 'GET',
            headers: new Headers(),
        };

        fetch(url, options)
            .then (response => {
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then (payload => {
                console.log("saved")
                setPins(payload);
            })
            .catch(error => console.log(error))
    }, [])









}

*/
