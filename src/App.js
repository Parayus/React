import React,{Component} from 'react';
import Layout from './component/Layout/layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/checkout/Checkout'
import {Route,Switch } from 'react-router-dom';
import Orders from './container/Orders/Orders';

class App extends Component {
  render(){return (
    <div >
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Route path='/checkout'  component={Checkout}></Route>
        <Route path='/orders'  component={Orders}></Route>
      </Switch>
      </Layout>
    </div>
  );
}
}

export default App;
