import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderListData,postComment} from '../../../fetch/user/orderlist.js'
import './style.less'
import OrderListComponent from '../../../components/OrderList/index.jsx'

class OrderList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:[]
		}
	}
	render() {
		return (
			<div className="order-list-container">
			    <h2>您的订单</h2>
			    {
			    	this.state.data.length
			    	?<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
			    	:<div>您还未购买任何东西</div>
			    }
			</div>
			)
	}
	componentDidMount() {
		//先获取用户名
		const username=this.props.username
		if(username){
			this.loadOrderList(username)

	      	}

	}
	loadOrderList(username){
		const result = getOrderListData(username)
		result.then(res => {
			return res.json()
		}).then(json => {
			this.setState({
				data:json
			})
		})
	}
	//提交评价 交互数据都要在智能组件中进行
	submitComment(id,value,callback){
		const result=postComment(id,value)
		result.then(res => {
			return res.json()
		}).then(json => {
			if(json.errno === 0){
				//已经评价
				callback()
			}
		})

	}
}

export default OrderList