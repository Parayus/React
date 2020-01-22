import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/aux';
import classes from './layout.module.css';
import ToolBar from '../../component/Navigation/ToolBar/ToolBar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component{
    state = {
        showSideDrawer : false
    }
    sideDrawerHandler = ()=>{
        let side= this.state.showSideDrawer
        this.setState({showSideDrawer:!side})
    }
        render(){
        return(
        <Aux>
            <ToolBar
                isAuth = {this.props.isAuthenticated}
             drawerToggleclclicked = {this.sideDrawerHandler}/>
            <SideDrawer
                isAuth = {this.props.isAuthenticated}
             open = {this.state.showSideDrawer} closed = {this.sideDrawerHandler} />
        <div >toolbar,sideDrawer,BackDrop</div>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )}
}
const mapStatetoProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null,
    }
}
export default connect(mapStatetoProps)(Layout);