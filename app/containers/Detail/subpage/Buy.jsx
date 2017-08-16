import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import BuyAndStore from '../../../components/BuyAndStore/index.jsx'
import {hashHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import * as storeActionFromFile from '../../../actions/store.js'

class Buy extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			//该状态表明是否收藏 默认为否 需要传给木偶组件 让其根据该状态渲染不同的表现
			isStore:false
		}
	}
	render() {
		return (
			<div>
			<BuyAndStore 
			isStore={this.state.isStore} 
			storeHandle={this.storeHandle.bind(this)} 
			buyHandle={this.buyHandle.bind(this)}/>
			</div>
			
			)
	}
	componentDidMount() {
	      // console.log(123,this.props.storeActions)
	      // 页面一渲染就要验证是否收藏
	      this.checkStoreState()
	}
	//首先要告诉组件该页面是否被收藏 可以通过stata中的isStore来确定
	//其次还要定义收藏和购买的方法 该方法要传给<BuyAndStore />（木偶组件） 让其去执行
	//接着无论收藏还是购买的时候都需要验证是否已经登录了 所以还需要一个验证登录的方法
	//1.验证是否收藏
	checkStoreState(){
		const id= this.props.id
		const store = this.props.store//redux中的数据

		//判断redux中的store是否有该商户的id some方法只要有一个满足即可 就会跳出循环
		store.some(item => {
			if(item.id ===id){
				this.setState({
					isStore:true
				})
				//跳出循环
				return true
			}
		})

	}
	//2.验证是否登录 在收藏和购买中调用
	loginCheck(){
		const id = this.props.id
		const category = this.props.category
		const keyword = this.props.keyword
		const userinfo = this.props.userinfo
		if(!userinfo.username){
			//如果没有用户名 则跳转到登录页面 并且则要传入目标router 
			//以便登录完可以自己跳转回该页面
			hashHistory.push('/login/' + encodeURIComponent('/detail/' + id+'/'+category +'/' +keyword))
			return false
		}
		return true
	}
	//3.定义收藏事件
	storeHandle(){
		//验证登录
		const loginFlag = this.loginCheck()

		if (!loginFlag) {
			return
		}
		//收藏数据 先传入商户的id
		const id = this.props.id
		const storeActions = this.props.storeActions
		if(this.state.isStore){
			//当前商户已经被收藏 点击时即要取消收藏
			storeActions.rm(id:id)
		}else{
			//当前商户尚未被收藏 点击则要收藏该商户
			storeActions.add({id:id})
		}
		//需要修改状态 跟原来状态相反即可
		this.setState({
			isStore:!this.state.isStore
		})
		
	}
	//4、定义购买事件
	buyHandle(){
		//验证登录 为登录则return
		const loginFlag = this.loginCheck()

		if (!loginFlag) {
			return
		}
		//跳转到用户中心
		hashHistory.push('/user')

	}


}




function mapStateToProps(state){
	return {
		userinfo:state.userinfo,
		store:state.store
	}
}

function mapDispatchToProps(dispatch){
	return {
		storeActions:bindActionCreators(storeActionFromFile,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)
(Buy)