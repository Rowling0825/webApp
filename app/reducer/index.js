import {
	combineReducers
} from 'redux' //redux提供了combineReducers方法，用于reducer的拆分，不同函数负责不同的属性

import userinfo from './userinfo' //引入一个reducer
import store from './store.js' //引入另外一个跟store相关的reducer

const rootReducer = combineReducers({
		userinfo,
		store
	})
	//上述userinfo的写法的前提是其state的属性名和子reducer的属性名相等
export default rootReducer