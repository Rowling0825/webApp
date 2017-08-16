import * as actionTypes from '../constants/store.js'
//因为这个对象是一系列有商户属性id的对象组成的数组 所以初始状态默认为初数组
const initialState = []

export default function store(state = initialState, action) {
	switch (action.type) {
		case actionTypes.STORE_UPDATE:
			return action.data
		case actionTypes.STORE_ADD:
			//后收藏的在前面 所以用unshift
			state.unshift(action.data)
			return state
		case actionTypes.STORE_RM:
			return state.filter(item => {
				if (item.id !== action.data.id) {
					return item
				}
			});
		default:
			return state
	}
}