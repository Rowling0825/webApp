import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import RouteMap from './router/routeMap'

import './static/css/common.less'
import './static/css/font.css'//引入icon-font图标


const store = configureStore()
/*//测试fetch功能
import {getData,postData} from './fetch/data.js'

getData();
postData();*/

render(
	<Provider store={store}>
		<RouteMap history={hashHistory}/>
	</Provider>
,
	document.getElementById('root')
)

