import React from 'react';
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolBar = (props)=>(
<header className = {classes.ToolBar}>
    <DrawerToggle clicked = {props.drawerToggleclclicked}/>
    <div className={classes.Logo}>
    <Logo />
    </div>
    <nav className= {classes.DesktopOnly}>
        <NavigationItems isAuth = {props.isAuth}></NavigationItems>
    </nav>

</header>
);

export default toolBar;