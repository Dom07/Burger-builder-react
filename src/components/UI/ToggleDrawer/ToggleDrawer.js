import React from 'react';
import classes from './ToggleDrawer.css';

const toggleDrawer = (props) => {
    return(
        <div className={classes.ToggleDrawer} onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default toggleDrawer;