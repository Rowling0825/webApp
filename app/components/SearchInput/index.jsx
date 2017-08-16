import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import './style.less'

class SearchInput extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			kwd:''
		}
	}
	render() {
		return (
			<div className="home-header-middle">
			        <div className="search-container" >
			            <i className="icon-search"></i>
			<input type="text" className="search-input" placeholder="天府壹家自选快餐"
			        value={this.state.kwd}
			        onChange={this.ChangeHandle.bind(this)}
			        onKeyUp={this.KeyUpHandle.bind(this)}/>
			    </div>
			 </div>
			)
	}
	componentDidMount() {
	     //因为这个头部不止一个页面要用 value的值不能写死 要跟具体页面挂钩
	     this.setState({
	     	kwd:this.props.value || ''
	     })
	}
	ChangeHandle(e){
		const val = e.target.value
		this.setState({
			kwd:val
		})
	}
	KeyUpHandle(e){
		if (e.keyCode !== 13) {
			return
		}
		//具体的跳转事件不应该放在这里 因为只有首页是需要跳转的
		//所以此处应该传入this.state.kwd来触发跳转事件
		/*hashHistory.push('/search/all/' + encodeURIComponent(this.state.kwd))*/
		this.props.enterHandle(e.target.value)
	}
}

export default SearchInput