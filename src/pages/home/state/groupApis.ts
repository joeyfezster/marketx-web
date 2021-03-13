import axios from 'axios'
import apiPaths from 'shared/apiPaths'
import { CreateGroupDealApiData, CreateDealParticipantApiData } from './types'
import { getUserJWT } from 'shared/utils/loginUtils'

export const createGroupDealApi = (data: CreateGroupDealApiData) =>  axios({
  method: 'POST',
  url: apiPaths.DEALS,
  headers: {
    Authorization: `Bearer ${getUserJWT()}`,
  },
  data
})

export const createDealParticipantApi = (data: CreateDealParticipantApiData) => axios({
  method: 'POST',
  url: apiPaths.DEAL_PARTICIPANTS,
  headers: {
    Authorization: `Bearer ${getUserJWT()}`,
  },
  data
})

export const updateDealParticipantApi = (id: string | undefined, data: CreateDealParticipantApiData) => axios({
  method: 'PUT',
  url: apiPaths.DEAL_PARTICIPANT(id),
  headers: {
    Authorization: `Bearer ${getUserJWT()}`,
  },
  data
})
