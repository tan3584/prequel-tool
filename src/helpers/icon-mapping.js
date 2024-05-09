import React from 'react';

const iconData = {
    "Southern steppes": {
        "icon": "SouthernSteppes.png"
    },
    "Cherry": {
        "icon": "cherry.png"
    }
};



export const iconMapping = (name) => {
    return iconData[name] ? (
        <>
            <img className="zone-icon" src={require(`../public/img/${iconData[name].icon}`)} alt={name} />
        </>
    ) : null;
}

export default iconMapping;