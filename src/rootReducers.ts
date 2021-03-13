import { combineReducers } from 'redux'
import { authReducer } from 'pages/auth/state/authReducer'
import { groupReducer } from 'pages/home/state/groupReducer'

const rootReducer = combineReducers({
  authState: authReducer,
  groupState: groupReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
