import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getAdData} from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd/index.jsx'

class Ad extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data:[]
		}
	}
	//该组件只负责接收数据 展示交给木偶数据
	render() {
		return (
			<div>
			{/*如果state中的data有数值 则渲染木偶组件*/}
			{
				this.state.data.length
				?<HomeAd data={this.state.data}/>
				: <div>加载中...</div>
			}
			</div>
			)	
	}
	componentDidMount() {
		const result = getAdData()//获取的是一个promise对象
		result.then((res) =>{
			return res.json()
		}).then((json) => {
			const data = json
			if(data.length){
				//获取数据并赋值给该组件的状态
				this.setState({
					data:data
				})
			}
		})

	      
	}
}

export default Ad