import React from 'react';
import './Button.css';

const Button = (props) => {
    const { value, color, click } = props;

    const styleColor = {
        background-color: color,
    };

    return (

        <input
            type = {'button'}
            className = {"element"}
            style = {styleColor}
            onClick = {(value:MouseEvent<HTMLInputElement>) => clickFunction (value)}> 
            {value}
        </input>
    );
};

export default Button;

// Al document Calculadora.js:
// <Button value={1} color={'grey'} clickFunction={addNumber} />   CANVIAR 1 per 2, 3, 4...