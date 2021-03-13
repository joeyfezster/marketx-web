import { call, put, takeEvery, all } from 'redux-saga/effects'

import {
  GroupActionTypes,
  CreateGroupDealActionType,
  CreateDealParticipantActionType,
  UpdateDealParticipantActionType
} from './groupActions'
import {
  createGroupDealApi,
  createDealParticipantApi,
  updateDealParticipantApi
} from './groupApis'

function* createGroupDeal(action: CreateGroupDealActionType): any {
  yield put({ type: GroupActionTypes.CREATE_GROUP_DEAL_PENDING })
  try {
    const groupDeal = yield call(createGroupDealApi, action.payload?.data)
    yield put({ type: GroupActionTypes.CREATE_GROUP_DEAL_FULFILLED, data: groupDeal.data })
    action.payload.onSuccess && action.payload.onSuccess(groupDeal.data)
  } catch (e) {
    let error = e.response?.data?.message
    if (Array.isArray(error)) {
      error = e.response?.data?.message[0]?.messages[0]?.message
    }
    yield put({
      type: GroupActionTypes.CREATE_GROUP_DEAL_REJECTED,
      error,
    })
    action.payload.onError && action.payload.onError(error)
  }
}

function* createGroupDealSaga() {
  yield takeEvery(GroupActionTypes.CREATE_GROUP_DEAL, createGroupDeal)
}

function* createDealParticipant(action: CreateDealParticipantActionType): any {
  yield put({ type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_PENDING })
  try {
    const dealParticipant = yield call(createDealParticipantApi, action.payload?.data)
    yield put({ type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_FULFILLED, data: dealParticipant.data })
    action.payload.onSuccess && action.payload.onSuccess(dealParticipant.data)
  } catch (e) {
    let error = e.response?.data?.message
    if (Array.isArray(error)) {
      error = e.response?.data?.message[0]?.messages[0]?.message
    }
    yield put({
      type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_REJECTED,
      error,
    })
    action.payload.onError && action.payload.onError(error)
  }
}

function* createDealParticipantSaga() {
  yield takeEvery(GroupActionTypes.CREATE_DEAL_PARTICIPANT, createDealParticipant)
}

function* updateDealParticipant(action: UpdateDealParticipantActionType): any {
  yield put({ type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_PENDING })
  try {
    const dealParticipant = yield call(updateDealParticipantApi, action.payload.data?.id, action.payload?.data)
    yield put({ type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_FULFILLED, data: dealParticipant.data })
    action.payload.onSuccess && action.payload.onSuccess(dealParticipant.data)
  } catch (e) {
    let error = e.response?.data?.message
    if (Array.isArray(error)) {
      error = e.response?.data?.message[0]?.messages[0]?.message
    }
    yield put({
      type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_REJECTED,
      error,
    })
    action.payload.onError && action.payload.onError(error)
  }
}

function* updateDealParticipantSaga() {
  yield takeEvery(GroupActionTypes.UPDATE_DEAL_PARTICIPANT, updateDealParticipant)
}

export default function* groupSagas() {
  yield all([createGroupDealSaga(), createDealParticipantSaga(), updateDealParticipantSaga()])
}
