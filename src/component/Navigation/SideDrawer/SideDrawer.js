import React from "react";
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import BackDrop from "../../UI/BackDrop/Backdrop";
import Aux from "../../../hoc/aux";

const sideDrawer = (props)=>{
    let attachClasses = [classes.SideDrawer,classes.Close]
    if (props.open){
        attachClasses = [classes.SideDrawer,classes.Open]
    }
    
    return(
        <Aux>
        <BackDrop show = {props.open} clicked = {props.closed}></BackDrop>
        
        <div className = {attachClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo height = "11%"/>
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;