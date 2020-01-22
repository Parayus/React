import React,{Component} from 'react'
import classes from './modal.module.css';
import Aux from '../../../hoc/aux';
import BackDrop from '../BackDrop/Backdrop';
class Modal extends Component{
    // this could be a functional component doesnt need to be a class component 
    shouldComponentUpdate(nextprops,nextState){
        return (nextprops.show !==this.props.show || nextprops.children !==this.props.children)
    }
    // we don't unneccessary upate modalonly updates when OrderNow


    render(){
        return(
            <Aux>
        <BackDrop show = {this.props.show} clicked = {this.props.modalClosed}></BackDrop>
    <div className = {classes.Modal}
    style = {{
        transform:this.props.show?'translate(0)':'translate(-100vh)',
        opacity:this.props.show?'1':'0'
    }}>
        {this.props.children}
    </div>
    </Aux>

        )
    }
}
export default Modal;