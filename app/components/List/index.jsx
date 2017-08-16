import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item/index.jsx'
import {Link} from 'react-router'

import './style.less'

class List extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const data = this.props.data
		const keyword = this.props.keyword
		const category = this.props.category
		return (
			<div>
				{
					category
					?(
					keyword
					?data.map((item,index) => {
						return <Link className="link-style" key={index} to={"/detail/" + item.id +'/' +category +'/' + keyword }><Item key={index} data={item}/></Link>
					})
					:data.map((item,index) => {
						return <Link className="link-style" key={index} to={"/detail/" + item.id +'/' +category }><Item key={index} data={item}/></Link>
					})
					)
					:data.map((item,index) => {
						return <Link className="link-style" key={index} to={"/detail/" + item.id }><Item key={index} data={item}/></Link>
					})

					
					
				}
			</div>
			)
	}
}

export default List