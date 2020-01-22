import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls  =[
{label:'Meat',type:'meat'},
{label:'Salad',type:'salad'},
{label:'Bacon',type:'bacon'},
{label:'Cheese',type:'cheese'},
];
const buildControls = (props)=>(
    <div className = {classes.BuildControls}>
        <p  >Current Price : <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl 
             key = {ctrl.label} 
             label = {ctrl.label}
             remove = {()=>props.ingridientRemoved(ctrl.type)}
             added = {()=>props.ingridientAdded(ctrl.type)}
             disable = {props.disabled[ctrl.type]}/>
        ))}
        <button 
        className = {classes.OrderButton}
         disabled = {props.purchasable}
         onClick ={props.ordered}>
           {props.isAuth?'ORDER NOW':'Sign Up to Order'} 
            </button>
    </div>
)

export default buildControls;