import React,{Component} from 'react';
import CheckoutSummary from '../../component/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../container/checkout/contactData/ContactData';
class Checkout extends Component{
    state = {
        ingridients:null,
        price : 0
        }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingridient={}
        let price = 0
        for (let params of query.entries()){
            if(params[0]==='price'){
                price = +params[1]            
            }else{

                ingridient[params[0]]=+params[1]
            }
        }
        
        this.setState({ingridients:ingridient,price:price});
    }

    checkoutCancelledHandler = ()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingridients=  {this.state.ingridients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data' }  
                render = {(props)=>(<ContactData 
                ingridients = {this.state.ingridients} 
                price = {this.state.price} {...props}/>)}/>
            </div>
        
        );}
}
export default Checkout;