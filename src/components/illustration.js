import React from 'react';

const Illustration = (props) => {
    return (
        <figure>
            <picture>
                <source media="(min-width: 600px)" srcset={props.desktop}  alt={props.alt}/>
                {props.mobile && <img src={props.mobile} alt={props.alt} /> }
            </picture>
        </figure>
    );
};

export default Illustration;