import { Typography } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import { useGetDealParticipant } from "shared/utils/swrHooks/useGetDealParticipant"
import { RootState } from "store"

type GroupDealParticipantProps = {
    dealParticipantID: number | undefined
    dealCreatorID: number | undefined
}

const GroupDealParticipant: React.FunctionComponent<GroupDealParticipantProps> = ({
    dealParticipantID,
    dealCreatorID,
}) => {
    const { data: participant, isValidating } = useGetDealParticipant(Number(dealParticipantID))
    
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    if (dealParticipantID == loggedInUser.data?.id) return null

    const isCreator = dealParticipantID === dealCreatorID
    const createdBy = isCreator ? '*' : ''

    return (
        <div>
            {!isValidating && participant && (
                <div>
                    <Typography>
                        {`${createdBy}username: ${participant.participant.username}`}
                    </Typography>
                    <Typography>
                        {/* remove this for user privacy */}
                        {`Email: ${participant.participant.email}`}
                    </Typography>
                    <Typography>
                        {`Commitment: $${participant.committed_participation}`}
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default GroupDealParticipant
