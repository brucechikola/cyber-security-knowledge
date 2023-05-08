import { combineReducers } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
const reducer = combineReducers({ dataSlice })

export default reducer