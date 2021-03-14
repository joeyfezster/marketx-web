export type GroupDealResponse = {
  id: string
}

export type CreateGroupDealPayload = {
  data: CreateGroupDealApiData
  onSuccess?: (response: GroupDealResponse) => void
  onError?: (error: string) => void
}

export type CreateGroupDealApiData = {
  group_creator: string
  group_name: string
  minimum_agg_threshold: number
  minimum_participation: number
  paticipants_can_invite_friends: boolean
}

export type DealParticipantResponse = {
  id: string
}

export type CreateDealParticipantPayload = {
  data: CreateDealParticipantApiData
  onSuccess?: (response: DealParticipantResponse) => void
  onError?: (error: string) => void
}

export type CreateDealParticipantApiData = {
  id?: string
  participant?: string | undefined
  committed_participation?: number
  deal?: string
}

export type CreateGroupDealData = {
  data: {
    groupName: string
    yourCommitment: number
    minimumAggregatedThreshold: number
    minimumParticipation: number
    usersCanInviteFriends: boolean
  },
  onSuccess: () => void,
}