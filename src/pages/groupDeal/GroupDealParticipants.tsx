import React from "react"
import { Typography } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useGetDealParticipant } from "shared/utils/swrHooks/useGetDealParticipant"
import { groupDealStyles } from "./styles";

type GroupDealParticipantProps = {
    dealParticipantID: number | undefined
    dealCreatorID: number | undefined
}

const GroupDealParticipant: React.FunctionComponent<GroupDealParticipantProps> = ({
    dealParticipantID,
    dealCreatorID,
}) => {
    const classes = groupDealStyles()
    const { data: participant, isValidating } = useGetDealParticipant(Number(dealParticipantID))

    const isCreator = dealParticipantID === dealCreatorID

    return (
        <div>
            {(!isValidating || participant) && (
                <div className={classes.dealParticipantContainer}>
                    <div className={classes.userDetails}>
                        <AccountCircleIcon className={classes.userDetail} color={isCreator ? 'primary' : 'inherit'} />
                        <Typography className={classes.userDetail} variant="overline">
                            {`${participant?.participant?.username}`}
                        </Typography>
                        <Typography className={classes.userDetail} variant="overline">
                            {/* remove this for user privacy */}
                            {`${participant?.participant?.email}`}
                        </Typography>
                    </div>
                    <Typography className={classes.commitment} variant="overline">
                        {`$${participant?.committed_participation?.toLocaleString()}`}
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default GroupDealParticipant
