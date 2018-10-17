import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '.'
import rootSaga from './saga'
import { loadBoardsSaga } from './boards/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// run redux sagas
sagaMiddleware.run(rootSaga)

// Load boards
sagaMiddleware.run(loadBoardsSaga)

export default store
