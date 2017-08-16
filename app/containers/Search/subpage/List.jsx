import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getSearchData} from '../../../fetch/search/search.js'
import ListComponent from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import './style.less'
const initialState = {
	data:[],//存储列表信息
			hasMore:false,//记录当前状态下，还有没有更多的数据可供加载
			isLoadingMore:false,//记录当前状态下，是“加载中...”还是点击加载更多
			page:0
}

class SearchList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = initialState//方便后面的重新设置
	}
	render() {
		return (
			<div className="home-item-list1">
			{
				this.state.data.length
				?<ListComponent data={this.state.data} keyword={this.props.keyword} category={this.props.category}/>
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
	//页面首次渲染
	componentDidMount() {
		//获取首页数据 封装下函数
		this.loadFirstPageData()
	}
	//页面再次渲染
	componentDidUpdate(prevProps, prevState) {
		//获取现在的keyword和category
	      const keyword = this.props.keyword
	      const category = this.props.category
	      //搜索条件完全相等时 忽略 不再触发
	      if (keyword === prevProps.keyword && category === prevProps.category) {
	      	return
	      }
	      //重新设置state
	      this.setState(initialState)
	      //重新加载数据
	      this.loadFirstPageData()
	}

	//获取首屏数据
	loadFirstPageData(){
		const cityName = this.props.userinfo.cityName
		const keyword = this.props.keyword || ''
		const category = this.props.category
		const result = getSearchData(0,cityName,category,keyword)
		this.resultHandle(result)
	}

	//加载更多数据
	loadMoreData(){
		//一点击就记录状态 状态变成加载中
		
		this.setState({
			isLoadingMore:true,
			page:this.state.page + 1
		})
		const cityName = this.props.userinfo.cityName
		const keyword = this.props.keyword || ''
		const page = this.state.page
		const category = this.props.category
		const result = getSearchData(page,cityName,category,keyword)
		this.resultHandle(result)
		console.log(cityName)
		//增加page的计数
		this.setState({
			isLoadingMore:false
		})

	}
	//数据处理 书上述两个加载函数的公告代码
	resultHandle(result){
		result.then((res)=>{
			return res.json()
		}).then((json)=>{
			const hasMore = json.hasMore
			const data = json.data

			//存储 注意不能覆盖原来的数据 因此需要用concat
			this.setState({
				data:this.state.data.concat(data),
				hasMore:hasMore
			})
			console.log(this.state.data.length)
		})
	}
}




function mapStateToProps(state){
	return {
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return {
		
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)
(SearchList)
