import React,{Component} from 'react'
import Aux from '../../../hoc/aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    componentWillMount(){
        console.log('[OrderSummary] WillUpdate');
    }
    render(){
        const ingridientSummary = Object.keys(this.props.ingridients).map(igKey =>{
            return(<li key = {igKey}><span style = {{textTransform :'capitalize'}}>{igKey}</span>:x{this.props.ingridients[igKey]}
            </li>)
            });
        return(
            <Aux>
            <h3>Your Order</h3>
    <p>A delicious burger with following ingridients:</p>
    <ul>
        {ingridientSummary}
    </ul>
    <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
    <p>Continue to Checkout</p>
    <Button btnType = 'Success' clicked = {this.props.continue}>CONTINUE</Button>
    <Button btnType = 'Danger' clicked = {this.props.cancel}>CANCEL</Button>
        </Aux>

        );
    }
    
} 


export default OrderSummary;