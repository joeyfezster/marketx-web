import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from './rootSagas'
import rootReducers from './rootReducers'
import { useDispatch } from 'react-redux'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authState'],
}

const sagaMiddleware = createSagaMiddleware() as SagaMiddleware<RootState>
const middleware = applyMiddleware(sagaMiddleware)
const composed = composeWithDevTools(middleware)

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(persistedReducer, composed)
export const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
