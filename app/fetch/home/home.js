//因为这里只需要获取数据 所以只需要Import get
import {get
} from '../get.js'

export function getAdData() {
	const result = get('/api/homead')
	return result
}

export function getListData(city, page) {
	const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
	return result
}