import produce, { Draft } from 'immer'
import { Reducer } from 'redux'

import { GroupAction, GroupActionTypes } from './groupActions'
import { GroupDealResponse, DealParticipantResponse } from './types'

export type GroupState = {
  groupDeal: {
    pending: boolean
    fulfilled: boolean
    rejected: boolean
    data: GroupDealResponse | null
    error: string | ''
  },
  dealParticipant: {
    pending: boolean
    fulfilled: boolean
    rejected: boolean
    data: DealParticipantResponse | null
    error: string | ''
  },
  updateDealParticipant: {
    pending: boolean
    fulfilled: boolean
    rejected: boolean
    data: DealParticipantResponse | null
    error: string | ''
  }
}

export const initialState: GroupState = {
  groupDeal: {
    pending: false,
    fulfilled: false,
    rejected: false,
    data: null,
    error: '',
  },
  dealParticipant: {
    pending: false,
    fulfilled: false,
    rejected: false,
    data: null,
    error: '',
  },
  updateDealParticipant: {
    pending: false,
    fulfilled: false,
    rejected: false,
    data: null,
    error: '',
  },
}

export const groupReducer: Reducer<GroupState, GroupAction> = produce((draft: StateDraft, action: GroupAction) => {
  switch (action.type) {
    case GroupActionTypes.CREATE_GROUP_DEAL_PENDING:
      draft.groupDeal.pending = true
      draft.groupDeal.fulfilled = false
      draft.groupDeal.rejected = false
      draft.groupDeal.error = ''
      draft.groupDeal.data = null
      break
    case GroupActionTypes.CREATE_GROUP_DEAL_FULFILLED:
      draft.groupDeal.pending = false
      draft.groupDeal.fulfilled = true
      draft.groupDeal.rejected = false
      draft.groupDeal.error = ''
      draft.groupDeal.data = action.data
      break
    case GroupActionTypes.CREATE_GROUP_DEAL_REJECTED:
      draft.groupDeal.pending = false
      draft.groupDeal.fulfilled = false
      draft.groupDeal.rejected = true
      draft.groupDeal.error = action.error
      draft.groupDeal.data = null
      break
    case GroupActionTypes.CREATE_DEAL_PARTICIPANT_PENDING:
      draft.dealParticipant.pending = true
      draft.dealParticipant.fulfilled = false
      draft.dealParticipant.rejected = false
      draft.dealParticipant.error = ''
      draft.dealParticipant.data = null
      break
    case GroupActionTypes.CREATE_DEAL_PARTICIPANT_FULFILLED:
      draft.dealParticipant.pending = false
      draft.dealParticipant.fulfilled = true
      draft.dealParticipant.rejected = false
      draft.dealParticipant.error = ''
      draft.dealParticipant.data = action.data
      break
    case GroupActionTypes.CREATE_DEAL_PARTICIPANT_REJECTED:
      draft.dealParticipant.pending = false
      draft.dealParticipant.fulfilled = false
      draft.dealParticipant.rejected = true
      draft.dealParticipant.error = action.error
      draft.dealParticipant.data = null
      break
    case GroupActionTypes.UPDATE_DEAL_PARTICIPANT_PENDING:
      draft.updateDealParticipant.pending = true
      draft.updateDealParticipant.fulfilled = false
      draft.updateDealParticipant.rejected = false
      draft.updateDealParticipant.error = ''
      draft.updateDealParticipant.data = null
      break
    case GroupActionTypes.UPDATE_DEAL_PARTICIPANT_FULFILLED:
      draft.updateDealParticipant.pending = false
      draft.updateDealParticipant.fulfilled = true
      draft.updateDealParticipant.rejected = false
      draft.updateDealParticipant.error = ''
      draft.updateDealParticipant.data = action.data
      break
    case GroupActionTypes.UPDATE_DEAL_PARTICIPANT_REJECTED:
      draft.updateDealParticipant.pending = false
      draft.updateDealParticipant.fulfilled = false
      draft.updateDealParticipant.rejected = true
      draft.updateDealParticipant.error = action.error
      draft.updateDealParticipant.data = null
      break
  }
}, initialState)

type StateDraft = Draft<GroupState>
