import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../../UI/ToggleDrawer/ToggleDrawer';

const toolBar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ToggleDrawer toggle={props.clicked}/>
            <Logo height="80%" />
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
};

export default toolBar;