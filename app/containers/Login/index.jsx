import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import {hashHistory} from 'react-router'
import LoginComponent from '../../components/Login/index.jsx'

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		//定义是否正在检查登录状态的 状态
		this.state={
			checking:true
		}
	}
	render() {
		return (
			<div>
			    <Header title="登录" backRouter='/'/>
			    {
			    	this.state.checking
			    	?<div>等待中</div>
			    	:<LoginComponent loginHandle={this.loginHandle.bind(this)}/>
			    }
			</div>
			
			)
	}
	//进入页面之后首先要进行登录验证
	//如果已经登录则要跳转到用户之前正在浏览的页面
	//如果尚未登录 则显示登录页面
	componentDidMount() {
	      this.doCheck()
	}
	doCheck(){
		const userinfo = this.props.userinfo
		if (userinfo.username){
			//已经登录 跳转到用户中心页
			this.goUserPage()
		}else{
			//尚未登录
			this.setState({
				checking:false
			})
		}
		
	}
	goUserPage(){
		hashHistory.push('/user')
	}
	//登录成功之后的业务处理 传入的参数是用户的用户名
	//该用户名是登录页面传进来的
	loginHandle(username){
		//首先要保存用户名 y因为要改变userinfo所以采用let
		const actions = this.props.userInfoActions
		let userinfo = this.props.userinfo
		//其次改变reduxz中的userinfo中的username值
		userinfo.username = username
		actions.update(userinfo)
		console.log(userinfo)
		//跳转链接
		const params = this.props.params
		const router = params.router
		if(router){
			//跳转到指定页面
			hashHistory.push(router)
		}else{
			//跳转到默认页面
			this.goUserPage()
		}
	}
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)