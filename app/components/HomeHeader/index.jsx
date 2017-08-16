import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import {hashHistory} from 'react-router'
import SearchInput from '../SearchInput/index.jsx'
import './style.less'

class HomeHeader extends React.Component{
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			kwd:''
		}
	}
	render(){
		return (
			<div id="home-header" className="clear-fix">
			    <div className="home-header-left float-left">
			    <Link to='/city' className='link-style'>
			        <span>{this.props.cityName}</span>
			        &nbsp;
			        <i className="icon-angle-down"></i>
			    </Link>
			    </div>
			    <div className="home-header-right float-right">
			    <Link to="/login" className='link-style'>
			        <i className="icon-user"></i>
			        </Link>
			    </div>
			    <SearchInput value='' enterHandle={this.enterHandle.bind(this)}/>
			</div>
			)
	}
	enterHandle(value){	
		hashHistory.push('/search/all/' + encodeURIComponent(value))
	}
	

}

export default HomeHeader