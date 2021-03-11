import { all, fork } from 'redux-saga/effects'
import authSagas from 'pages/auth/state/authSagas'

export default function* rootSaga() {
  yield all([fork(authSagas)])
}
