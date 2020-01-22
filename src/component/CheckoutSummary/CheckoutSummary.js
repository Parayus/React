import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkoutSummary = (props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope its tastes good!!</h1>
            <div style = {{width:'100%',margin:'auto'}}>
            <Burger ingridients  = {props.ingridients}></Burger>
            </div>
            <Button btnType = 'Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType = 'Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
export default checkoutSummary;