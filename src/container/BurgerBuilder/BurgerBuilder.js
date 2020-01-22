import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../component/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions/index'




class BurgerBuilder extends Component{
    state = {
        purchasing : false,
    }

    componentDidMount(){

        this.props.onInitIngridients();
        
        
    }
    purchaseContinueHandler = ()=>{
        this.props.onInitPurchase()
        // alert('You Continue')
        const queryParams  = [];
        for (let i in this.state.ingridients){
            queryParams.push(encodeURI(i)+'='+encodeURI(this.state.ingridients[i]))
        }
        queryParams.push('price'+'='+this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({pathname:'/checkout',
        search:'?'+queryString
        });
    }
    purchaseHandler=()=>{
        if (this.props.isAuth){
        this.setState({purchasing:true});
        }else{
                this.props.onSetRedirect('/checkout')
                this.props.history.push('/auth')
            }
        }
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    updatePurchaseState=(price)=>{
        this.setState({purchasable:price>4})
    }
    
    render(){
        const disalbeInfo = {...this.props.ings}

        for (let key in disalbeInfo){
            disalbeInfo[key]  = disalbeInfo[key]<=0
        }
        let orderSummary = null

        let burger = this.props.error?<p>ERROR!!!!</p>:(<Spinner/>)

        if (this.props.ings){
            burger = (<Aux>
            <Burger ingridients = {this.props.ings}></Burger>
            <BuildControls
            ingridientAdded ={this.props.onIngridientAdded}
            ingridientRemoved = {this.props.onIngridientDeleted}
            disabled = {disalbeInfo}
            purchasable = {!(this.props.totalPrice>4)}
            isAuth={this.props.isAuth}
            price = {this.props.totalPrice}
            ordered = {this.purchaseHandler}
            />
            </Aux>);
            orderSummary = (<OrderSummary ingridients = {this.props.ings} 
                continue = {this.purchaseContinueHandler}
                cancel  ={this.purchaseCancelHandler}
                totalPrice = {this.props.totalPrice}></OrderSummary>)
        }
        

        return(
            <Aux>
            <Modal show = {this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            </Aux>
        );
    }
}
const mapStatetoProps = state =>{
    return{
        ings:state.burgerBuilder.ingridients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token!==null,
        built:state.burgerBuilder.building
    };
}
const mapDispatchtoProps = dispatch=>{
    return{
        onIngridientAdded:(igName)=>dispatch(actionType.addIngridient(igName)),
        onIngridientDeleted:(igName)=>dispatch(actionType.removeIngridient(igName)),
        onInitIngridients:()=>dispatch(actionType.initIngridients()),
        onInitPurchase :()=>dispatch(actionType.purchaseInit()),
        onSetRedirect :(path)=>dispatch(actionType.authRedirect(path))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurgerBuilder,axios));