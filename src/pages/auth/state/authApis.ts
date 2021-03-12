import axios from 'axios'
import apiPaths from 'shared/apiPaths'
import { RegisterUserApiData } from './types'

export const loginUserApi = (identifier: string, password: string) =>
  axios.post(apiPaths.LOGIN, {
    identifier,
    password,
  })

export const registerUserApi = (data: RegisterUserApiData) => axios.post(apiPaths.REGISTER, data)
