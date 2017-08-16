import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'

import './style.less'

class List extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data:[],//存储列表信息
			hasMore:false,//记录当前状态下，还有没有更多的数据可供加载
			isLoadingMore:false,//记录当前状态下，是“加载中...”还是点击加载更多
			page:1
		}
	}
	render() {
		return (
			<div className="home-item-list1">
			<h2 className="home-list-title">— 猜你喜欢 —</h2>
			{
				this.state.data.length
				?<ListComponent data={this.state.data}/>
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
		//获取首页数据 封装下函数
		this.loadFirstPageData()
	}
	//获取首屏数据
	loadFirstPageData(){
		const cityName = this.props.cityName
		const result = getListData(cityName,0)
		this.resultHandle(result)
	}

	//加载更多数据
	loadMoreData(){
		//一点击就记录状态 状态变成加载中
		this.setState({
			isLoadingMore:true
		})
		const cityName = this.props.cityName
		const page = this.state.page
		const result = getListData(cityName,page)
		this.resultHandle(result)

		//增加page的计数
		this.setState({
			page:page + 1,
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
			// console.log(this.state.data.length)
		})
	}
}

export default List