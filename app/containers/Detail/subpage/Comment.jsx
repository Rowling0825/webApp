import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detail.js'
import CommentList from '../../../components/CommentList/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'
import './style.less'

class Comment extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state={
			data:[],
			hasMore:false,
			page:0,
			isLoadingMore:false
		}
	}
	render() {
		return (
			<div className="detail-comment-subpage">
			<h2>用户点评</h2>
			{
				this.state.data.length
				?<CommentList data={this.state.data}/>
				:<div>加载中...</div>
			}
			{
				this.state.hasMore
				?<LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.loadMoreData.bind(this)}/>
				:<div className="no-more">没有更多了</div>
			}
			
			</div>
			)
	}
	componentDidMount() {
		this.LoadFirstData()
	      
	}
	//获取首屏数据
	LoadFirstData(){
		const id = this.props.id
		const result = getCommentData(0,id)
		this.resultHandle(result)
	}


	loadMoreData(){
		//设置状态为加载中
		this.setState({
			isLoadingMore:true,
			page:this.state.page + 1
		})
		const page = this.state.page
		const id = this.props.id
		const result= getCommentData(page,id)
		this.resultHandle(result)
		//数据从后端加载好之后要将状态改为加载好
		this.setState({
			isLoadingMore:false
		})


	}
	//调用fetch中的函数获取后台数据
	resultHandle(result){
		result.then(res => {
			return res.json()
		}).then(json => {
			const hasMore = json.hasMore
			const data = json.data

			this.setState({
				data:this.state.data.concat(data),
				hasMore:hasMore
			})
		})
	}


}

export default Comment