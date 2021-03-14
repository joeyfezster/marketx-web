import React from "react"
import { CircularProgress, Typography } from "@material-ui/core"
import { useParams } from "react-router-dom"

import { GroupDeal, useGetGroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import GroupDealParticipant from "./GroupDealParticipants"
import LoggedInUserCommitment from "./LoggedInUserCommitment"
import GroupDealHeader from "./GroupDealHeader"
import GroupDealShare from "./GroupDealShare"
import { groupDealStyles } from './styles'

type GroupDealRouteParams = {
    id: string
}

const GroupDealPage: React.FunctionComponent = () => {
    const classes = groupDealStyles()
    const { id: groupDealID } = useParams<GroupDealRouteParams>()
    const { data: groupDeal, isValidating } = useGetGroupDeal(Number(groupDealID))
    const render = !isValidating && groupDeal

    const renderMembersSection = (groupDeal: GroupDeal) => {
        return (
            <div className={classes.groupDealMembersContainer}>
                <Typography variant="h5">
                    Members
                </Typography>
                {groupDeal?.deal_participants.map(p => <GroupDealParticipant dealParticipantID={p.id} dealCreatorID={groupDeal.group_creator.id} key={p.id} />)}
            </div>
        )
    }

    return (
        <div className={classes.root}>
            {isValidating && <CircularProgress />}
            {render && <GroupDealHeader groupDeal={groupDeal!!} />}
            {render && <GroupDealShare groupDeal={groupDeal!!} />}
            {render && renderMembersSection(groupDeal!!)}
            {render && <LoggedInUserCommitment groupDealID={groupDeal?.id} minimumParticipation={groupDeal?.minimum_participation} />}
        </div>
    )
}

export default GroupDealPage
