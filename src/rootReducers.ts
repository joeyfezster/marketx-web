import { combineReducers } from 'redux'
import { authReducer } from 'pages/auth/state/authReducer'

const rootReducer = combineReducers({
  authState: authReducer,
})

export default rootReducer
