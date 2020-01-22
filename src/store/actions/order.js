import * as actionType from './actionTypes';
import axios from '../../axios-order';


export const purchaseBurgerSuccess = (id,orderData)=>{
    return{
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
};

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    }
};
export const purchaseBurgerStart = ()=>{
    return{
        type:actionType.PURCHASE_BURGER_START
    };

}

export const purchaseBurger = (orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart)

        axios.post('/orders.json?auth='+token,orderData)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
})
            .catch(error=>{
                dispatch(purchaseBurgerFail(error))
    } )
            };
        }

export const purchaseInit = ()=>{
    return{
        type:actionType.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess = (order)=>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:order
    }
}

export const fetchOrderFail = (error)=>{
    return{
        type :actionType.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrderStart = ()=>{
    return{
        type:actionType.FETCH_ORDERS_START,

    }
}

export const fetchOrder = (token,userId)=>{
    return dispatch=>{
        const queryParam = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json'+queryParam).then(res=>{
            const fetcehed = []
            for (let key in res.data){
                fetcehed.push({...res.data[key],
                id:key});
            }
            dispatch(fetchOrderSuccess(fetcehed))

        }).catch(err=>{
            dispatch((fetchOrderFail(err)))
        });
    }
}