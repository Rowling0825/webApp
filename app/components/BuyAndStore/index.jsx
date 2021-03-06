import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class BuyAndStore extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div className="buy-store-container clear-fix">
			    <div className="item-container float-left">
			    {/*首先判断是否已收藏*/}
			    {
				    this.props.isStore
				    ?<button className="selected" onClick={this.storeClickHadle.bind(this)}>已收藏</button>
				    :<button onClick={this.storeClickHadle.bind(this)}>收藏</button>
			    }
			    </div>
			    <div className="item-container float-right">
			        <button onClick={this.buyClickHandle.bind(this)}>购买</button>
			    </div>
			</div>
			)
	}
	storeClickHadle(){
		this.props.storeHandle()
	}
	buyClickHandle(){
		this.props.buyHandle()
	}
}

export default BuyAndStore