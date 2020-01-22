import React,{Component} from 'react';
import Layout from './component/Layout/layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/checkout/Checkout'
import {Route,Switch,withRouter,Redirect } from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/auth/Auth';
import Logout from './container/auth/logout/logout';
import {connect} from 'react-redux';
import * as actionType from './store/actions/index'

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render(){
    let route = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Route path='/auth'  component={Auth}></Route>
        <Redirect to='/'/>
      </Switch>
    )
    if(this.props.token){
      route = (
        <Switch>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Route path='/auth'  component={Auth}></Route>
        <Route path='/checkout'  component={Checkout}></Route>
        <Route path='/orders'  component={Orders}></Route>
        <Route path='/logout'  component={Logout}></Route>
        </Switch>
        )
    }
    return (
    <div >
      <Layout>  
        {route}
      </Layout>
    </div>
  );
}
}
const mapStateToProps = state =>{
  return{
    token:state.auth.token !==null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp:()=>dispatch(actionType.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
