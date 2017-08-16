import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFormOtherFile from '../../actions/userinfo.js'
import Header from '../../components/Header/index.jsx'
import CurrentCity from '../../components/CurrentCity/index.jsx'
import CityList from '../../components/CityList/index.jsx'

import LocalStore from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'

import {hashHistory} from 'react-router'

class City extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	//城市组件也要分成头部(选择城市) 中部(当前城市) 下部等三个组件
	render() {
		return (
			<div>
			    <Header title="选择城市" backRouter='/'/>
			    <CurrentCity cityName={this.props.userinfo.cityName}/>
			    <CityList changeFn={this.changeCity.bind(this)}/>
			</div>
			)
	}
	//修改城市名字的方法要放在智能组件中 然后传给子组件（木偶组件）来触发
	changeCity(newCity){
		//将新选择的城市设置为当前城市
		if (newCity == null){
			return
		}
		//修改redux
		const userinfo = this.props.userinfo
		userinfo.cityName = newCity
		this.props.userInfoActions.update(userinfo)
		//修改 localStorage
		LocalStore.setItem(CITYNAME,newCity)
		console.log(LocalStore.getItem(CITYNAME))
		//跳转到首页??
		hashHistory.push('/')
	}
}




function mapStateToProps(state){
	return {
		userinfo:state.userinfo
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
(City)
