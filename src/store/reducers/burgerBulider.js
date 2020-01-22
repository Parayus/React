import * as actionTypes from '../actions/actionTypes' 


const INGRIDIENT_PRICES = {
    bacon:.7,
    cheese:.4,
    meat:1.3,
    salad:.5
};
const intialState = {
    ingridients : null,
    totalPrice : 4,
    error:false,
    building:false
};

 const reducer = (state = intialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGRIDIENT:

            return{
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]+1
                },
                building:true,
                totalPrice:state.totalPrice+INGRIDIENT_PRICES[action.ingridientName],
                
            };
        case actionTypes.DELETE_INGRIDIENT:
            
            return{
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]-1
                },
                building:true,
                totalPrice:state.totalPrice-INGRIDIENT_PRICES[action.ingridientName],
                
            };
        case actionTypes.SET_INGRIDIENTS:
            return{
                ...state,
                ingridients:action.ingridients,
                totalPrice:4,
                error:false,
                building:false      
            }
        case actionTypes.FETCH_INGRIDIENT_FAILED:
            return{
                ...state,
                error:true,
                building:false
            }

        default: return state;
    }

 }

 export default reducer