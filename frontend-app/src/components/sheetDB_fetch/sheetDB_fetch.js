import React from 'react';
import './Button.css';









const Fetch_from_url = () => {



    return (
        <div className = {styles.__homecontainer}>
            {array.map ( (person)) => {
                return (
                    <div>
                        <p>Name: {person.name}</p>
                        <p>Email: {person.email}</p>
                    </div>
                )
            }
                )
            }
        </div>
    );
};

export default Button;
