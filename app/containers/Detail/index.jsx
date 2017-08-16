import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx'
import Info from './subpage/info.jsx'
import Comment from './subpage/Comment.jsx'
import Buy from './subpage/Buy.jsx'
import {connect} from 'react-redux'

class Detail extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		//获取商户id
		const idIndex = this.props.params.id
		const category = this.props.params.category		
		const keyword = this.props.params.keyword

		return (
			<div>
			     <Header title="商户详情" type="share" check={this.checkLogin.bind(this)} 
			     id={idIndex} category={category} keyword={keyword}/>
			     <Info id={idIndex} category={category} keyword={keyword}/>
			     <Buy id={idIndex} category={category} keyword={keyword}/>
			     <Comment id={idIndex} />
			</div>
		)
	}
	checkLogin(){
		if(this.props.userinfo.username){
			return true
		}else{
			return false
		}
	}

}


function mapStateToProps(state) {
    return {
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)