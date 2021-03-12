import produce, { Draft } from 'immer'
import { Reducer } from 'redux'

import { AuthAction, AuthActionTypes } from './authActions'
import { UserResponse } from './types'

export type AuthState = {
  loggedInUser: {
    data: UserResponse | null
  }
  userLogin: {
    pending: boolean
    fulfilled: boolean
    rejected: boolean
    error: string | ''
  }
  userRegistration: {
    pending: boolean
    fulfilled: boolean
    rejected: boolean
    error: string | ''
  }
}

export const initialState: AuthState = {
  loggedInUser: {
    data: null,
  },
  userLogin: {
    pending: false,
    fulfilled: false,
    rejected: false,
    error: '',
  },
  userRegistration: {
    pending: false,
    fulfilled: false,
    rejected: false,
    error: '',
  },
}

export const authReducer: Reducer<AuthState, AuthAction> = produce((draft: StateDraft, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_PENDING:
      draft.userLogin.pending = true
      draft.userLogin.fulfilled = false
      draft.userLogin.rejected = false
      draft.userLogin.error = ''
      draft.loggedInUser.data = null
      break
    case AuthActionTypes.LOGIN_USER_FULFILLED:
      draft.userLogin.pending = false
      draft.userLogin.fulfilled = true
      draft.userLogin.rejected = false
      draft.userLogin.error = ''
      draft.loggedInUser.data = action.data
      break
    case AuthActionTypes.LOGIN_USER_REJECTED:
      draft.userLogin.pending = false
      draft.userLogin.fulfilled = false
      draft.userLogin.rejected = true
      draft.userLogin.error = action.error
      draft.loggedInUser.data = null
      break

    case AuthActionTypes.REGISTER_USER_PENDING:
      draft.userRegistration.pending = true
      draft.userRegistration.fulfilled = false
      draft.userRegistration.rejected = false
      draft.userRegistration.error = ''
      draft.loggedInUser.data = null
      break
    case AuthActionTypes.REGISTER_USER_FULFILLED:
      draft.userRegistration.pending = false
      draft.userRegistration.fulfilled = true
      draft.userRegistration.rejected = false
      draft.userRegistration.error = ''
      draft.loggedInUser.data = action.data
      break
    case AuthActionTypes.REGISTER_USER_REJECTED:
      draft.userRegistration.pending = false
      draft.userRegistration.fulfilled = false
      draft.userRegistration.rejected = true
      draft.userRegistration.error = action.error
      draft.loggedInUser.data = null
      break
  }
}, initialState)

type StateDraft = Draft<AuthState>
