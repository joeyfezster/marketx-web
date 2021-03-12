import apiPaths from 'shared/apiPaths'
import useSWR, { SWRResponse } from 'swr'
import { DealParticipant } from './useGetDealParticipant'

export type GroupDeal = {
    id: number
    group_name: string
    group_creator: DealParticipant
    deal_participants: DealParticipant[]
    minimum_agg_threshold: number
    minimum_participation: number
    is_open: boolean
    paticipants_can_invite_friends: boolean
    deal_deadline: Date
}

export const useGetGroupDeal = (groupDealID: number): SWRResponse<GroupDeal, Error> => {
    const url = apiPaths.GROUP_DEAL(groupDealID)
    const swr = useSWR(url)
    return { ...swr, data: swr.data }
}
