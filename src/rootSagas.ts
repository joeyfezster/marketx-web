import { all, fork } from 'redux-saga/effects'
import authSagas from 'pages/auth/state/authSagas'
import groupSagas from 'pages/home/state/groupSagas'

export default function* rootSaga() {
  yield all([fork(authSagas), fork(groupSagas)])
}
