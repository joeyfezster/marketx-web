import { Typography } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import { useGetDealParticipant } from "shared/utils/swrHooks/useGetDealParticipant"
import { RootState } from "store"

const GroupDealParticipant: React.FunctionComponent<{ dealParticipantID: number | undefined }> = ({
    dealParticipantID
}) => {
    const { data: participant, isValidating } = useGetDealParticipant(Number(dealParticipantID))
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    console.log(`logged in user`, loggedInUser)


    // TODO: skip logged in user
    //     if (participant.participant == loggedInUserID) return null

    return (
        <div>
            {!isValidating && participant && (
                <div>
                    <Typography>
                        {`username: ${participant.participant.username}`}
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
