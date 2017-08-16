import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader/index.jsx'
import Category from '../../components/Category/index.jsx';
import {connect} from 'react-redux'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List.jsx'
//第一种方式跳转方式 link
import { Link } from 'react-router';

class Home extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
			    <HomeHeader cityName={this.props.userinfo.cityName}/>
			    <Category/>
			    <div style={{height:'15px'}}></div>
			    <Ad />
			    <List cityName={this.props.userinfo.cityName}/>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return {
		
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)
(Home)



