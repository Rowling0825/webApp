import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
//该组件主要展示的是加载更多部分
class LoadMore extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div className="load-more" ref="wrapper">
			    {
			    	this.props.isLoadingMore
			    	?<span>加载中...</span>
			    	:<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
			    }
			</div>
			)
	}
	loadMoreHandle(){
		//执行传递过来的loadMoreData函数
		this.props.LoadMoreFn()
	}
	componentDidMount() {
		const loadMoreFn = this.props.LoadMoreFn
		const wrapper = this.refs.wrapper
		//监听scroll 增加节流 注意理解
		let timeoutId
		function callback (){
			console.log(1111)
			const top = wrapper.getBoundingClientRect().top
			//console.log(top)
			const windowHeight = window.screen.height
			if (top && top < windowHeight){
				//当加载更多部分（wrapper)已经滚动到暴露在页面的可视范围之内的时候执行函数
				loadMoreFn()
			}

		}
	    window.addEventListener('scroll',function(){
	    	if(this.props.isLoadingMore){
	    		return
	    	}
	    	//如果在50ms之内再次触发了scroll事件 那么之前的set就作废 所以要清空
	    	if(timeoutId){
	    		clearTimeout(timeoutId)
	    	}
	    	//如果在这次scroll事件触发的50ms内如果没有发生再一次scroll事件 则触发callback事件
	    	//保证连续滚动的时候不会触发
	    	//timeoutId表示计数器编号的整数值
	    	timeoutId = setTimeout(callback,50)
	    	console.log(timeoutId)
	

	    }.bind(this),false)
	}
	componentDidUpdate(prevProps, prevState) {
	      console.log()

	}


	}


export default LoadMore