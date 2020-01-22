import React,{Component} from 'react';
import CheckoutSummary from '../../component/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../../container/checkout/contactData/ContactData';

class Checkout extends Component{
    
    

    checkoutCancelledHandler = ()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary =<Redirect to='/'/>
        
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased?<Redirect to='/' />:null;
            summary = (<div>
                {purchasedRedirect}
            <CheckoutSummary ingridients=  {this.props.ings}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data' } component={ContactData} />
            </div>)
        }

        return(
            <div>
                {summary}
                
            </div>
        );}
}

const mapStatetoProps = state =>{
    return {
        ings : state.burgerBuilder.ingridients,
        purchased:state.orderReducer.purchased
    }
}
export default connect(mapStatetoProps)(Checkout);