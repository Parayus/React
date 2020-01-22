import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const addIngridient = (name)=>{
    return{
        type:actionTypes.ADD_INGRIDIENT,
        ingridientName:name
    }
}

export const removeIngridient = (name)=>{
    return{
        type:actionTypes.DELETE_INGRIDIENT,
        ingridientName:name
    }
}
export const fetchIngirdientFailed = ()=>{
    return{
        type:actionTypes.FETCH_INGRIDIENT_FAILED
    }
}
export const setIngridient = (ingridient)=>{
    return{
        type:actionTypes.SET_INGRIDIENTS,
        ingridients: ingridient
    }
}

export const initIngridients = ()=>{
    return dispatch =>{
        axios.get('https://burgerbuilder-7621e.firebaseio.com/ingredients.json')
        .then(response=>{
        dispatch(setIngridient(response.data))}).catch(error=>{
            dispatch(fetchIngirdientFailed())
        });
    }
    }
