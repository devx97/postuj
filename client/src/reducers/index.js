import {combineReducers} from 'redux'
import { reducer as formsReducer } from 'redux-form'

import posts from './postsReducer'
import auth from './authReducer'

export default combineReducers({
  posts,
  auth,
  form: formsReducer,
})