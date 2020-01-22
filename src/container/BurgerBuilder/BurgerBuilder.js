import React,{Component} from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../component/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGRIDIENT_PRICES = {
    bacon:.7,
    cheese:.4,
    meat:1.3,
    salad:.5
};

class BurgerBuilder extends Component{
    state = {
        ingridients:null,
        totalPrice: 4,
        purchasable:false,
        purchasing : false,
        loading:false,
    }

    componentDidMount(){
        axios.get('https://burgerbuilder-7621e.firebaseio.com/ingredients.json').then(response=>{
        this.setState({ingridients:response.data})
        })
    }
    purchaseContinueHandler = ()=>{
        
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
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    updatePurchaseState=(price)=>{
        this.setState({purchasable:price>4})
    }
    addIngridient = (type)=>{
        const oldCount = this.state.ingridients[type];
        const updateCount = oldCount+1
        const UpdateIngridient = {
            ...this.state.ingridients
        }
        UpdateIngridient[type] = updateCount;
        const PriceAdittion = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+PriceAdittion;
        this.setState({totalPrice:newPrice,ingridients:UpdateIngridient});
        console.log('Add Ingridient');
        this.updatePurchaseState(newPrice);
    }
    removeIngridient = (type)=>{
        const oldCount = this.state.ingridients[type];
        if (oldCount <=0){
            return;
        }
        const updateCount = oldCount-1;
        
        const UpdateIngridient = {
            ...this.state.ingridients
        }
        UpdateIngridient[type] = updateCount;
        const PriceSub = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-PriceSub;
        this.setState({totalPrice:newPrice,ingridients:UpdateIngridient});
        this.updatePurchaseState(newPrice);
        console.log('Add Ingridient');
    }
    render(){
        const disalbeInfo = {...this.state.ingridients}

        for (let key in disalbeInfo){
            disalbeInfo[key]  = disalbeInfo[key]<=0
        }
        let orderSummary = null

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        let burger = (<Spinner/>)

        if (this.state.ingridients){
            burger = (<Aux>
            <Burger ingridients = {this.state.ingridients}></Burger>
            <BuildControls
            ingridientAdded ={this.addIngridient}
            ingridientRemoved = {this.removeIngridient}
            disabled = {disalbeInfo}
            purchasable = {!this.state.purchasable}
            price = {this.state.totalPrice}
            ordered = {this.purchaseHandler}
            />
            </Aux>);
            orderSummary = (<OrderSummary ingridients = {this.state.ingridients} 
                continue = {this.purchaseContinueHandler}
                cancel  ={this.purchaseCancelHandler}
                totalPrice = {this.state.totalPrice}></OrderSummary>)
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
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

export default withErrorHandler(BurgerBuilder,axios);