import apiPaths from 'shared/apiPaths'
import useSWR, { SWRResponse } from 'swr'

export type DealParticipant = {
    id: number
    participant: {
        id: number
        username: string
        email: string
    }

    committed_participation: number

    deal: {
        id: number
    }
}

export const useGetDealParticipant = (dealParticipantID: number): SWRResponse<DealParticipant, Error> => {
    const url = apiPaths.DEAL_PARTICIPANT(dealParticipantID)
    const swr = useSWR(url)
    return { ...swr, data: swr.data }
}

export const useFindDealParticipant = (userID: number | undefined, groupDealID: number | undefined): SWRResponse<DealParticipant, Error> => {
    //querying with id=0 returns an empty array. Finding the undefined thus returns an empty result without errors
    const url = `${apiPaths.DEAL_PARTICIPANTS}?participant_eq=${userID || 0}&deal_eq=${groupDealID || 0}`
    const swr = useSWR(url)
    return { ...swr, data: swr.data?.[0] }
}
