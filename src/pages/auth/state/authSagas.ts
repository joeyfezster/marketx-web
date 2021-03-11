import { call, put, takeEvery, all } from 'redux-saga/effects'

import { saveUserJWT } from 'shared/utils/loginUtils'
import {
  AuthActionTypes,
  LoginUserActionType,
  RegisterUserActionType,
} from './authActions'
import {
  loginUserApi,
  registerUserApi,
} from './authApis'

function* loginUser(action: LoginUserActionType): any {
  yield put({ type: AuthActionTypes.LOGIN_USER_PENDING })
  try {
    const user = yield call(loginUserApi, action.payload?.data?.identifier, action.payload?.data?.password)
    saveUserJWT(user.data.jwt)
    yield put({ type: AuthActionTypes.LOGIN_USER_FULFILLED, data: user.data.user })
    action.payload.onSuccess && action.payload.onSuccess()
  } catch (e) {
    let error = e.response?.data?.message
    if (Array.isArray(error)) {
      error = e.response?.data?.message[0]?.messages[0]?.message
    }
    yield put({ type: AuthActionTypes.LOGIN_USER_REJECTED, error })
    action.payload.onError && action.payload.onError(error)
  }
}

function* loginUserSaga() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, loginUser)
}

function* registerUser(action: RegisterUserActionType): any {
  yield put({ type: AuthActionTypes.REGISTER_USER_PENDING })
  try {
    const userRegistrationResponse = yield call(registerUserApi, action.payload?.data)
    yield put({ type: AuthActionTypes.REGISTER_USER_FULFILLED, data: userRegistrationResponse.data.user })
    saveUserJWT(userRegistrationResponse.data.jwt)
    action.payload.onSuccess && action.payload.onSuccess()
  } catch (e) {
    let error = e.response?.data?.message
    if (Array.isArray(error)) {
      error = e.response?.data?.message[0]?.messages[0]?.message
    }
    yield put({
      type: AuthActionTypes.REGISTER_USER_REJECTED,
      error,
    })
    action.payload.onError && action.payload.onError(error)
  }
}

function* registerUserSaga() {
  yield takeEvery(AuthActionTypes.REGISTER_USER, registerUser)
}

export default function* authSagas() {
  yield all([loginUserSaga(), registerUserSaga()])
}
