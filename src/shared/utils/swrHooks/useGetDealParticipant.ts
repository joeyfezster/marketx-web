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
