import React from 'react';
import classes from './Order.module.css';


const order = (props)=>{
    const ingridient = [];
    for (let ingridientName in props.ingridients ){
        ingridient.push({
            name:ingridientName,
            Price:props.ingridients[ingridientName]
        })
    }
    const ingridientOutput = ingridient.map(igKey=>{
    return<span 
    style = {{textTransform:'capitalize',
            display:'inline-block',
        margin:'0 8px',
    border:'1px solid #ccc',
padding:'5px'}}
    key = {igKey.name}>{igKey.name} ({igKey.Price})</span>
    })

    return(<div className={classes.Order}> 
        <p>Ingridients :{ingridientOutput} </p>
        <p>Price :{props.price.toFixed(2)} </p>
    </div>)
    
}

export default order;