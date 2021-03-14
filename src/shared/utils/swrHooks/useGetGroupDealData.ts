import apiPaths from 'shared/apiPaths'
import useSWR, { SWRResponse } from 'swr'

// Note: GroupParticipant is not the same as DealParticipant, as it only includes the end user's id, no email, name or other data
export type GroupParticipant = {
    id: number | undefined
    committed_participation: number
    participant: number //this is the end user id
}

export type GroupDeal = {
    id: number
    group_name: string
    group_creator: GroupParticipant
    deal_participants: GroupParticipant[]
    minimum_agg_threshold: number
    minimum_participation: number
    is_open: boolean
    paticipants_can_invite_friends: boolean
    deal_deadline: string
}

export const useGetGroupDeal = (groupDealID: number): SWRResponse<GroupDeal, Error> => {
    const url = apiPaths.GROUP_DEAL(groupDealID)
    const swr = useSWR(url)
    return { ...swr, data: swr.data }
}
