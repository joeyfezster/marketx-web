import {
  GroupDealResponse,
  CreateGroupDealPayload,
  DealParticipantResponse,
  CreateDealParticipantPayload,
} from './types'

export enum GroupActionTypes {
  CREATE_GROUP_DEAL = 'CREATE_GROUP_DEAL',
  CREATE_GROUP_DEAL_PENDING = 'CREATE_GROUP_DEAL_PENDING',
  CREATE_GROUP_DEAL_FULFILLED = 'CREATE_GROUP_DEAL_FULFILLED',
  CREATE_GROUP_DEAL_REJECTED = 'CREATE_GROUP_DEAL_REJECTED',

  CREATE_DEAL_PARTICIPANT = 'CREATE_DEAL_PARTICIPANT',
  CREATE_DEAL_PARTICIPANT_PENDING = 'CREATE_DEAL_PARTICIPANT_PENDING',
  CREATE_DEAL_PARTICIPANT_FULFILLED = 'CREATE_DEAL_PARTICIPANT_FULFILLED',
  CREATE_DEAL_PARTICIPANT_REJECTED = 'CREATE_DEAL_PARTICIPANT_REJECTED',

  UPDATE_DEAL_PARTICIPANT = 'UPDATE_DEAL_PARTICIPANT',
  UPDATE_DEAL_PARTICIPANT_PENDING = 'UPDATE_DEAL_PARTICIPANT_PENDING',
  UPDATE_DEAL_PARTICIPANT_FULFILLED = 'UPDATE_DEAL_PARTICIPANT_FULFILLED',
  UPDATE_DEAL_PARTICIPANT_REJECTED = 'UPDATE_DEAL_PARTICIPANT_REJECTED',
}

/************************* Action Interfaces ******************************/

export interface CreateGroupDealActionType {
  type: GroupActionTypes.CREATE_GROUP_DEAL
  payload: CreateGroupDealPayload
}

export interface CreateGroupDealPendingActionType {
  type: GroupActionTypes.CREATE_GROUP_DEAL_PENDING
}

export interface CreateGroupDealFulfilledActionType {
  type: GroupActionTypes.CREATE_GROUP_DEAL_FULFILLED
  data: GroupDealResponse
}

export interface CreateGroupDealRejectedActionType {
  type: GroupActionTypes.CREATE_GROUP_DEAL_REJECTED
  error: string
}

export interface CreateDealParticipantActionType {
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT
  payload: CreateDealParticipantPayload
}

export interface CreateDealParticipantPendingActionType {
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_PENDING
}

export interface CreateDealParticipantFulfilledActionType {
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_FULFILLED
  data: DealParticipantResponse
}

export interface CreateDealParticipantRejectedActionType {
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_REJECTED
  error: string
}

export interface UpdateDealParticipantActionType {
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT
  payload: CreateDealParticipantPayload
}

export interface UpdateDealParticipantPendingActionType {
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_PENDING
}

export interface UpdateDealParticipantFulfilledActionType {
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_FULFILLED
  data: DealParticipantResponse
}

export interface UpdateDealParticipantRejectedActionType {
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_REJECTED
  error: string
}

/************************* Action Constructors ******************************/

export const CreateGroupDealAction = (payload: CreateGroupDealPayload): CreateGroupDealActionType => ({
  type: GroupActionTypes.CREATE_GROUP_DEAL,
  payload,
})

export const CreateGroupDealPendingAction = (): CreateGroupDealPendingActionType => ({
  type: GroupActionTypes.CREATE_GROUP_DEAL_PENDING,
})
export const CreateGroupDealFulfilledAction = (data: GroupDealResponse): CreateGroupDealFulfilledActionType => ({
  type: GroupActionTypes.CREATE_GROUP_DEAL_FULFILLED,
  data,
})
export const CreateGroupDealRejectedAction = (error: string): CreateGroupDealRejectedActionType => ({
  type: GroupActionTypes.CREATE_GROUP_DEAL_REJECTED,
  error,
})

export const CreateDealParticipantAction = (payload: CreateDealParticipantPayload): CreateDealParticipantActionType => ({
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT,
  payload,
})

export const CreateDealParticipantPendingAction = (): CreateDealParticipantPendingActionType => ({
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_PENDING,
})
export const CreateDealParticipantFulfilledAction = (data: DealParticipantResponse): CreateDealParticipantFulfilledActionType => ({
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_FULFILLED,
  data,
})
export const CreateDealParticipantRejectedAction = (error: string): CreateDealParticipantRejectedActionType => ({
  type: GroupActionTypes.CREATE_DEAL_PARTICIPANT_REJECTED,
  error,
})

export const UpdateDealParticipantAction = (payload: CreateDealParticipantPayload): UpdateDealParticipantActionType => ({
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT,
  payload,
})

export const UpdateDealParticipantPendingAction = (): UpdateDealParticipantPendingActionType => ({
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_PENDING,
})
export const UpdateDealParticipantFulfilledAction = (data: DealParticipantResponse): UpdateDealParticipantFulfilledActionType => ({
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_FULFILLED,
  data,
})
export const UpdateDealParticipantRejectedAction = (error: string): UpdateDealParticipantRejectedActionType => ({
  type: GroupActionTypes.UPDATE_DEAL_PARTICIPANT_REJECTED,
  error,
})

/************************* Type Composition ******************************/

export type GroupAction =
  | CreateGroupDealActionType
  | CreateGroupDealPendingActionType
  | CreateGroupDealFulfilledActionType
  | CreateGroupDealRejectedActionType
  | CreateDealParticipantActionType
  | CreateDealParticipantPendingActionType
  | CreateDealParticipantFulfilledActionType
  | CreateDealParticipantRejectedActionType
  | UpdateDealParticipantActionType
  | UpdateDealParticipantPendingActionType
  | UpdateDealParticipantFulfilledActionType
  | UpdateDealParticipantRejectedActionType
