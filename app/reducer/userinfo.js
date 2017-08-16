//采用*实现模块的整体加载 用*指定一个对象，所有输出值都加载在这个对象上
import * as actionTypes from '../constants/userinfo'

const initialState = {} //初始化初始对象

//第一步 定义计算规则
export default function userinfo(state = initialState, action) {
	switch (action.type) {
		//修改城市
		case actionTypes.USERINFO_UPDATE:
			return action.data
		default:
			return state
	}
}