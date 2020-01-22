import React ,{Component} from 'react';
import Order from '../../component/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
    state={
        order :[],
        loading : true,

    }
    componentDidMount(){
        axios.get('/orders.json').then(res=>{
            const fetcehed = []
            for (let key in res.data){
                fetcehed.push({...res.data[key],
                id:key});
            }
            this.setState({loading:false,order:fetcehed})
            console.log(res.data)
        }).catch(err=>{
            this.setState({loading:false})
        });
    }

    render(){
        return(
            <div> 
                {this.state.order.map(order=>(
                    <Order key = {order.id}
                    ingridients = {order.ingridients}
                    price = {+order.price}></Order>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios) 