import {
  UserResponse,
  LoginUserPayload,
  RegisterUserPayload,
} from './types'

export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_PENDING = 'LOGIN_USER_PENDING',
  LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED',
  LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED',
  REGISTER_USER = 'REGISTER_USER',
  REGISTER_USER_PENDING = 'REGISTER_USER_PENDING',
  REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED',
  REGISTER_USER_REJECTED = 'REGISTER_USER_REJECTED',
}

/************************* Action Interfaces ******************************/

export interface LoginUserActionType {
  type: AuthActionTypes.LOGIN_USER
  payload: LoginUserPayload
}

export interface LoginUserPendingActionType {
  type: AuthActionTypes.LOGIN_USER_PENDING
}

export interface LoginUserFulfilledActionType {
  type: AuthActionTypes.LOGIN_USER_FULFILLED
  data: UserResponse
}

export interface LoginUserRejectedActionType {
  type: AuthActionTypes.LOGIN_USER_REJECTED
  error: string
}

export interface RegisterUserActionType {
  type: AuthActionTypes.REGISTER_USER
  payload: RegisterUserPayload
}

export interface RegisterUserPendingActionType {
  type: AuthActionTypes.REGISTER_USER_PENDING
}

export interface RegisterUserFulfilledActionType {
  type: AuthActionTypes.REGISTER_USER_FULFILLED
  data: UserResponse
}

export interface RegisterUserRejectedActionType {
  type: AuthActionTypes.REGISTER_USER_REJECTED
  error: string
}

/************************* Action Constructors ******************************/

export const LoginUserAction = (payload: LoginUserPayload): LoginUserActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload,
})

export const LoginUserPendingAction = (): LoginUserPendingActionType => ({
  type: AuthActionTypes.LOGIN_USER_PENDING,
})
export const LoginUserFulfilledAction = (data: UserResponse): LoginUserFulfilledActionType => ({
  type: AuthActionTypes.LOGIN_USER_FULFILLED,
  data,
})
export const LoginUserRejectedAction = (error: string): LoginUserRejectedActionType => ({
  type: AuthActionTypes.LOGIN_USER_REJECTED,
  error,
})

export const RegisterUserAction = (payload: RegisterUserPayload): RegisterUserActionType => ({
  type: AuthActionTypes.REGISTER_USER,
  payload,
})

export const RegisterUserPendingAction = (): RegisterUserPendingActionType => ({
  type: AuthActionTypes.REGISTER_USER_PENDING,
})
export const RegisterUserFulfilledAction = (data: UserResponse): RegisterUserFulfilledActionType => ({
  type: AuthActionTypes.REGISTER_USER_FULFILLED,
  data,
})
export const RegisterUserRejectedAction = (error: string): RegisterUserRejectedActionType => ({
  type: AuthActionTypes.REGISTER_USER_REJECTED,
  error,
})

/************************* Type Composition ******************************/

export type AuthAction =
  | LoginUserActionType
  | LoginUserPendingActionType
  | LoginUserFulfilledActionType
  | LoginUserRejectedActionType
  | RegisterUserActionType
  | RegisterUserPendingActionType
  | RegisterUserFulfilledActionType
  | RegisterUserRejectedActionType
