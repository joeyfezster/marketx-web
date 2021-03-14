import React from "react"
import { CircularProgress, Typography } from "@material-ui/core"
import { useParams } from "react-router-dom"

import { GroupDeal, useGetGroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import GroupDealParticipant from "./GroupDealParticipants"
import LoggedInUserCommitment from "./LoggedInUserCommitment"
import GroupDealHeader from "./GroupDealHeader"
import GroupDealShare from "./GroupDealShare"
import { groupDealStyles } from './styles'
import { mutate } from "swr"
import apiPaths from "shared/apiPaths"

type GroupDealRouteParams = {
    id: string
}

const GroupDealPage: React.FunctionComponent = () => {
    const classes = groupDealStyles()
    const { id: groupDealID } = useParams<GroupDealRouteParams>()
    const { data: groupDeal, isValidating, revalidate } = useGetGroupDeal(Number(groupDealID))
    const shortlink = window.location.href
    const shouldRender = !isValidating || groupDeal

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


    const handleCommitment = (loggedInUserDealParticipantID: string | undefined) => {
        revalidate()
        mutate(apiPaths.DEAL_PARTICIPANT(loggedInUserDealParticipantID))
    }

    return (
        <div className={classes.root}>
            {isValidating && !shouldRender && <CircularProgress />}
            {shouldRender &&
                <>
                    <GroupDealHeader groupDeal={groupDeal!!} />
                    <GroupDealShare groupDeal={groupDeal!!} />
                    {renderMembersSection(groupDeal!!)}
                    <LoggedInUserCommitment groupDealID={groupDeal?.id} minimumParticipation={groupDeal?.minimum_participation} onCommitment={handleCommitment} />
                </>}
        </div>
    )
}

export default GroupDealPage
