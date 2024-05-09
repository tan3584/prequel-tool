const iconData = {
    "Southern steppes": {
        "icon": "southern_steppes.png"
    }
};



export default iconMapping  = (name) => {
    return iconData[name] ? iconData[name].icon : null;
}