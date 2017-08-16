import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx'
import SearchList from '../Search/subpage/List.jsx'
import './style.less'

class Search extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const params = this.props.params
		return (
			<div>
			<Header keyword={params.keyword} backRouter='/'/>
			<SearchList keyword={params.keyword} category={params.category}/>
			</div>
			)
	}

	

}

export default Search