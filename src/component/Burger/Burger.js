import React from 'react';
import classes from './Burger.module.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import {withRouter} from 'react-router-dom';

const burger = (props)=>{
    
    let transformIngridient = Object.keys(props.ingridients)
    .map(igKey=>{
            return [...Array(props.ingridients[igKey])].map((_,i)=>{
                return <BurgerIngridient key = {igKey+i} type = {igKey}/>
            });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
    
    if (transformIngridient.length===0){
        transformIngridient = <p>Please start adding ingredients</p>
    }
    
    return(
        <div className= {classes.Burger}>
            <BurgerIngridient type = 'bread-top'/>
            {transformIngridient}
            <BurgerIngridient type = 'bread-bottom'/>
        </div>
    );
};

export default withRouter(burger);