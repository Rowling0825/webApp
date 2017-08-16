import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class CityList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			chengshi:['北京','上海','杭州','广州','苏州','深圳','南京','天津','重庆','厦门','武汉','西安']
		}
	}
	render() {
		const chengshi = this.state.chengshi
		return (
			<div className="city-list-container">
			<h3>热门城市</h3>
			<ul className="clear-fix">
			{
				chengshi.map((item,index) => {
					return (
						<li key={index}>
					{/*<span onClick={this.clickHandler.bind(this)}>成都</span>*/}
					<span onClick={this.clickHandle.bind(this,item)}>{item}</span>
						</li>
						
					)

				})
			}
		   
			</ul>
			</div>
		)
	}
	clickHandle(newCity){

		const changeFn = this.props.changeFn
		changeFn(newCity)	
	}
	//总结；获取点击目标的文本信息可以有两种方式
	//第一种就是现在所显示的 把城市信息存在数组中放在state中 然后采用map将城市名字信息传入点击函数
	//这样点击函数就可以获取到所点击城市的信息
	//第二种就是采用e传入 可以根据e.target.innerText获取目标元素的文本信息 此处就是选择城市的名字
	/*clickHandler(e){
		console.log(e.target.innerText)
		const ces=e.target.innerText
		const changeFn = this.props.changeFn
		changeFn(ces)	
	}*/
}

export default CityList
