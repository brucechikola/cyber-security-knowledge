import { combineReducers } from 'redux'
import auth from './auth'
import layout from './layout'
import data from './data/dataSlice'
const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        layout,
        auth,
        data,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
