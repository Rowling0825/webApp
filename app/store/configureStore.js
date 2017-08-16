import {
	createStore
} from 'redux'
import rootReducer from '../reducer'

//根据计算规则生成srtore
export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState,
		//触发redux-devtools
		window.devToolsExtension ? window.devToolsExtension() : undefined
	)
	return store
}