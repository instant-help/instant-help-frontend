import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { ihelp, authentication } from './reducers/index'

const reducers = combineReducers({
  ihelp,
  authentication
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(

export default createStore(
  reducers, 
  composeEnhancers(applyMiddleware(thunk, logger)),
  ) 