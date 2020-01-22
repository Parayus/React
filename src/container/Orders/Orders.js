import React ,{Component} from 'react';
import Order from '../../component/Order/Order'
import axios from '../../axios-order';
import{connect} from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/index'
class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        return(
            <div> 
                {this.props.orders.map(order=>(
                    <Order key = {order.id}
                    ingridients = {order.ingridients}
                    price = {+order.price}></Order>
                ))}
            </div>
        );
    }
}
const mapStatetoProps=  state =>{
    return{
        orders:state.orderReducer.orders,
        loading:state.orderReducer.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actionTypes.fetchOrder(token,userId))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders,axios))