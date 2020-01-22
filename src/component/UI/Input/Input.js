import React from 'react';
import classes from './Input.module.css';
 const input = (props)=>{
    let inputElement = null 
    const inputInvalid = [classes.InputElement]
    if(!props.inValid && props.shouldValidate &&props.touched){
        inputInvalid.push(classes.Invalid)
    }
    switch(props.elementType){
      case ('input'):
          inputElement = <input  className = {inputInvalid.join(' ')} {...props.elementConfig} 
          value = {props.value}  onChange = {props.changed}/>
          break;
        case('textarea'):
            inputElement = <textarea className = {inputInvalid.join(' ')} 
            {...props.elementConfig} onChange = {props.changed} value = {props.value}/>
            break;
        case('select'):
    inputElement = <select onChange = {props.changed} className = {inputInvalid.join(' ')}  
    value = {props.value}>{props.elementConfig.options.map(option =>(<option key = {option.value} value = {option.value}>{option.displayValue}</option>))}</select>
    break;
        default:
            inputElement = <input onChange = {props.changed} className = {inputInvalid.join(' ')}
             {...props.elementConfig} value = {props.value}/>

     }
     return(
        <div className={classes.Input}>
        <label className = {classes.Label}>{props.label}</label>
        {inputElement}
    </div>
     )
 }
 export default input
    