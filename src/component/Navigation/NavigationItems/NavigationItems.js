import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem' ;
const navigationitems = (props)=>(
    <ul className = {classes.Navigation}>
    <NavigationItem link = '/' >Burger Builder</NavigationItem> 
    {props.isAuth?<NavigationItem activeClassName ={classes.active} link  = '/orders'>Orders</NavigationItem>:null}
    {!props.isAuth?<NavigationItem activeClassName ={classes.active} link  = '/auth'>Authenticate</NavigationItem>:
    <NavigationItem activeClassName ={classes.active} link  = '/logout'>Logout</NavigationItem>}
    </ul>
);
// boolean prop active
export default navigationitems