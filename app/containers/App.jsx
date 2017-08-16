import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import { CITYNAME } from '../config/localStoreKey.js'

import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo.js'

class App extends React.Component {
	//es6中getInitialState的写法
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			initDone:false
		}
	}
	render(){
		return (
			<div>
			{
				this.state.initDone
				?this.props.children 
				:<div>加载中...</div>
			}
			</div>
		)
	}

	componentDidMount() {
		//注意this的指向  该处指向这个App的组件
		/*
	    setTimeout(function (){
        //该处this 指向 Windows 所以需要解决
	    	this.setState({
	    		initDone:true
	    	})
	    },1000)  */
	    //方法一 that = this
        //方法二 es6中的箭头函数
       /* setTimeout(() => {
        	this.setState({
        		initDone:true
        	})
        },1000)*/
        //从localstorerage里面获取城市
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null){
        	LocalStore.setItem(CITYNAME,'成都')
        	cityName = LocalStore.getItem(CITYNAME)
        }
        //将城市信息存储到redux 
        this.props.userInfoActions.update({
        	cityName:cityName
        })
        this.setState({
        		initDone:true
        	})    
	}	
}

function mapStateToProps(state){
	return {

	}
}

function mapDispatchToProps(dispatch){
	return {
		userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)
(App)

