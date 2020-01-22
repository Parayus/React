import React,{Component} from 'react'
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../component/UI/spinner/spinner';
import Input from "../../../component/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../../store/actions/index'
class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type :'text',
                    placeholder:'Name'
                },
                value:'',
            validation:{
                required:true
            },
        valid:false,
        touched:false
    },
            street:{
                elementType:'input',
                elementConfig:{
                    type :'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
            valid:false,
            touched:false},
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type :'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true
                },
            valid:false,
            touched:false},
            country:{
                elementType:'input',
                elementConfig:{
                    type :'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
            valid:false,
            touched:false},
            email:{
                elementType:'input',
                elementConfig:{
                    type :'text',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
            valid:false,
            touched:false},
        delivey:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ]
            },
            value:'fastest',
        validation:{},
        valid:true}
    },
    formIsValid:false,
}
    checkValidity(value,rules){
        let isValid = false
        if (rules.required){
            isValid = value.trim()!=='';
        }
        return isValid
    }
    orderHandler = (event)=>{
        event.preventDefault();//this dont send request and reload our page
        

        const formData= {}
        for (let formElementData in this.state.orderForm){
            formData[formElementData] = this.state.orderForm[formElementData].value
        }
        const order = {
            ingridients:this.props.ingridients,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)
        
    }

    inputChangedHandler = (event,inputIdentifier)=>{

        const newOrderForm = {
            ...this.state.orderForm
        };
        const UpdatedForm = {
            ...newOrderForm[inputIdentifier]
        };
        UpdatedForm.value = event.target.value;
        UpdatedForm.valid = this.checkValidity(UpdatedForm.value,UpdatedForm.validation)
        UpdatedForm.touched = true
        newOrderForm[inputIdentifier]  = UpdatedForm;
        let formValid = true
        for (let inputIdentifiers in newOrderForm){
            formValid = newOrderForm[inputIdentifiers].valid && formValid
        }
        this.setState({orderForm:newOrderForm,formIsValid:formValid});

    }
    render(){
        const formElementArray = []
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit = {this.orderHandler}>
            {formElementArray.map(formElement =>(
                <Input
                key = {formElement.id}
                 elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    inValid = {formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed = {(event)=>this.inputChangedHandler(event,formElement.id)}/>
            ))}
            <Button inputtype = 'input' btnType= 'Success' 
            disabled = {!this.state.formIsValid}>Order</Button>

        </form>)
        if (this.props.loading){
            form = (<Spinner></Spinner>)
        }
        return(
            <div className = {classes.ContactData}>
                <h4>Enter Contact Data</h4>
         
            {form}
            </div>
        );
    }
}
const mapStatetoProps = state =>{
    return{
        ingridients:state.burgerBuilder.ingridients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orderReducer.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchtoProps =  dispatch =>{
    return{
        onOrderBurger: (orderData,token)=>dispatch(actionType.purchaseBurger(orderData,token))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData,axios));