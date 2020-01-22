import React,{Component} from 'react';
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
            <ToolBar drawerToggleclclicked = {this.sideDrawerHandler}/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerHandler} />
        <div >toolbar,sideDrawer,BackDrop</div>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )}
}
export default Layout