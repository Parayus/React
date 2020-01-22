import React,{Component} from 'react';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './auth.module.css';
import * as actionTypes from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../component/UI/spinner/spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component{
    state = {
        controls:{
        email: {
            elementType:'input',
            elementConfig:{
                type :'email',
                placeholder:'Mail Address'
            },
            value:'',
        validation:{
            required:true,
            isEmail:false
        },
    valid:false,
    touched:false
},
password: {
    elementType:'input',
    elementConfig:{
        type :'password',
        placeholder:'Password'
    },
    value:'',
validation:{
    required:true,
    minLength:7
},
valid:false,
touched:false
}
       },
    isSignup: true,   
}

    componentDidMount(){
        if(!this.props.built && this.props.authRedirect !=='/'){
            this.props.onSetRedirect()
        }
    }
    checkValidity(value,rules){
        let isValid = false
        if (rules.required){
            isValid = value.trim()!=='';
        }
        return isValid
    }
    inputChangedHandler =(event,controlName)=>{
        const updatedControl = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid :this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControl})
    }
    onSubmitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }
    switchAuthModelHandler = ()=>{
        this.setState(prevState=>{
            return{isSignup:!prevState.isSignup}
        })
    }
    render(){
        const formElementArray = []
        for (let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement=>(
            <Input
            key = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            inValid = {formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            changed = {(event)=>this.inputChangedHandler(event,formElement.id)}
            />
        ))
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null
        if (this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }
        let auth = null
        if (this.props.isAuth){
            auth = <Redirect to={this.props.authRedirect}></Redirect>
        }
        return(
            <div className = {classes.Auth}>
                {auth}
                <form onSubmit ={this.onSubmitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType ='Success' >Log In</Button>
                </form>
        <Button btnType = 'Danger' clicked={this.switchAuthModelHandler}>
            Switch to {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}
const mapStatetoProps = state =>{
    return{
        loading:state.auth.loading,
        error : state.auth.error,
        isAuth:state.auth.token!==null,
        built:state.burgerBuilder.building,
        authRedirect:state.auth.authRedirect
    }
}
const mapDispatchToProps =dispatch=>{
    return{
        onAuth: (email,pass,isSignup)=>dispatch(actionTypes.auth(email,pass,isSignup)),
        onSetRedirect:()=>dispatch(actionTypes.authRedirect('/'))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(Auth);
