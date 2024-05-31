import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './TodoSlice'

//Redux store
export default configureStore({
    reducer:{
        todos: todoReducer,
    }
})