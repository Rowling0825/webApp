var app = require('koa')();
var router = require('koa-router')();

/*router.get('/', function*(next) {
	this.body = 'hello koa !'
});

router.get('/api', function*(next) {
	this.body = 'test data'
});*/

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function*(next) {
	this.body = homeAdData
});

//首页 --猜你喜欢
var homeListData = require('./home/list.js')
var lastListData = require('./home/lastList.js')
router.get('/api/homelist/:city/:page', function*(next) {
	const params = this.params
	const paramsCity = params.city
	const paramsPage = params.page


	if (paramsPage < 8) {
		this.body = homeListData
	} else {
		this.body = lastListData
	}
});

//搜索结果页 --搜索结果 --两个参数
var searchListData = require('./search/list.js')

router.get('/api/search/:page/:city/:category', function*(next) {
		// 参数
		const params = this.params
		const paramsPage = params.page
		const paramsCity = params.city
		const paramsCategory = params.category

		console.log('当前页数：' + paramsPage)
		console.log('当前城市：' + paramsCity)
		console.log('当前类别：' + paramsCategory)
		if (paramsPage < 8) {
			this.body = searchListData
		} else {
			this.body = lastListData
		}

	})
	//搜索结果页 三个参数
router.get('/api/search/:page/:city/:category/:keyword', function*(next) {
	// 参数
	const params = this.params
	const paramsPage = params.page
	const paramsCity = params.city
	const paramsCategory = params.category
	const paramsKeyword = params.keyword

	console.log('当前页数：' + paramsPage)
	console.log('当前城市：' + paramsCity)
	console.log('当前类别：' + paramsCategory)
	console.log('关键字：' + paramsKeyword)
	if (paramsPage < 8) {
		this.body = searchListData
	} else {
		this.body = lastListData
	}

})

//开发详情页--商户信息
var detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function*(next) {
		console.log('商户详情页')
			//参数
		const params = this.params
		const id = params.id

		console.log('商户id:' + id)
		this.body = detailInfo
	})
	//详情页--用户评论
var detailComment = require('./detail/comment.js')
var LastComment = require('./detail/lastComment.js')
router.get('/api/detail/comment/:page/:id', function*(next) {
	console.log('详情页 - 用户点评')

	const params = this.params
	const page = params.page
	const id = params.id
	console.log('商户id: ' + id)
	console.log('当前页数: ' + page)
	if (page < 8) {
		this.body = detailComment
	} else {
		this.body = LastComment
	}

})

//用户订单信息
var orderList = require('./OrderList/orderList.js')
router.get('/api/orderlist/:username', function*(next) {
	console.log('订单信息')

	const params = this.params
	const username = params.username

	console.log("用户名：" + username)

	this.body = orderList
})

//提交评论
router.post('/api/submitComment', function*(next) {
	console.log('提交评论')

	//获取参数
	this.body = {
		errno: 0,
		msg: 'ok'
	}
})

// 开始服务并生成路由
app.use(router.routes())
	.use(router.allowedMethods());
app.listen(3000);