import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem' ;
const navigationitems = (props)=>(
    <ul className = {classes.Navigation}>
    <NavigationItem link = '/' >Burger Builder</NavigationItem> 
    <NavigationItem activeClassName ={classes.active} link  = '/orders'>Orders</NavigationItem>
    </ul>
);
// boolean prop active
export default navigationitems