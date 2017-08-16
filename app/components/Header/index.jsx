import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchInput from '../SearchInput/index.jsx'
import {hashHistory} from 'react-router';
import './style.less'

class Header extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	//标题不能写死 因为这个组件是许多页面都需要用的 所以需要写前面传过来的值
	render() {
		return (
			<div id="common-header">
			<span className="back-icon" onClick={this.clickHandle.bind(this)}>
			    <i className="icon-chevron-left"></i>
			</span>
			{
				this.props.title
				?<h1>{this.props.title}</h1>
				:<SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
			}
			
			
			</div>
			)
	}
	clickHandle(){
		//根据是否传进来指定的返回路由来对返回进行分类
		
		const backRouter = this.props.backRouter
		if(backRouter){
		//登录 用户中心 城市  search页面都需要返回到主页面
		//所以归为一类
			hashHistory.push(backRouter)
		}else{
			//用户详情页由于在未登录状态下需要跳转到登录页面
			//采用hash方式 登陆后需要根据hash前的页面设置跳转参数再hash回来
            const checking = this.props.check()
			const category = this.props.category
			const keyword = this.props.keyword
			//所以先检测是否登录
            if(checking){
            	if(category === 'undefined'){
            		hashHistory.push('/')
            	}else{
            		if(keyword !== 'undefined'){	
            	 	hashHistory.push('/search/'+category +'/' +keyword)
            	 }else{
            	 	hashHistory.push('/search/'+category)
            	 }
            	}     
		    }else{
		    	//未登录则直接返回即可
			      window.history.back()
		    }
		}		
		
	}
	enterHandle(value){
		hashHistory.push('/search/all/' + encodeURIComponent(value))
	}

}

export default Header