import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from '../../../fetch/detail/detail.js'


import DetailInfo from '../../../components/DetailInfo/index.jsx'
class info extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			info:false
		}
	}
	render() {
		return (
			<div>
			{
				this.state.info
				?<DetailInfo data={this.state.info}/>
				:<div>该商户已下线</div>
			}
			
			</div>
			)
	}
	componentDidMount() {
	      this.getInfo()
	}
	getInfo(){
		const idIndex = this.props.id
		const result = getInfoData(idIndex)
		result.then(res => {
			return res.json()
		}).then(json => {
			this.setState({
				info:json
			})
		})
	}
}

export default info