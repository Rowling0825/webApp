import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Star from '../../components/Star/index.jsx'

import './style.less'
class DetailInfo extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const data = this.props.data
		return (
			<div id="detail-info-container">
			    <div className="info-container clear-fix">
			        <div className="info-img-container float-left">
			            <img src={data.img} />
			        </div>
			        <div className="info-content">
			            <h1>{data.title}</h1>
			            <div className="star-container">
			              {/*star因为在其他地方也要引用 所以需要做成组件*/}
			                <Star star={data.star}/>
			                <span className="price">￥{data.price}</span>
			            </div>
			            <p className="sub-title">{data.subTitle}</p>
			        </div>
			    </div>
			    <p className="info-desc" dangerouslySetInnerHTML={{__html:data.desc}}></p>
			</div>
			
			)
	}
}

export default DetailInfo