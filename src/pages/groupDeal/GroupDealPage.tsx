import { CircularProgress, Typography } from "@material-ui/core"
import { formatDistanceToNowStrict } from "date-fns"
import { parseISO } from "date-fns/esm"
import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GroupDeal, useGetGroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import { RootState } from "store"
import logo from "../../shared/hardcodedMedia/robinhood_logo.png"

type GroupDealRouteParams = {
    id: string
}


const GroupDealPage: React.FunctionComponent = () => {
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    const { id: groupDealID } = useParams<GroupDealRouteParams>()
    const { data: groupDeal, isValidating } = useGetGroupDeal(Number(groupDealID))
    console.log(`logged in user`, loggedInUser)
    // const { data: participant, isValidating } = useGetDealParticipant(1)
    return (
        <div>
            {isValidating && <CircularProgress />}
            {groupDeal && (
                renderGroupDealHeadder(groupDeal)
            )}
            <hr></hr>
            {groupDeal && (
                <div>
                    <Typography>
                        "Social Media Share Section"
                    </Typography>
                </div>
            )}
            <hr></hr>
            {/* {groupDeal && (renderGroupDealParticipants(groupDeal, loggedInUser.data?.id))} */}
        </div>
    )
}

export default GroupDealPage


const timeRemaining = (timestamp: string) => {
    return formatDistanceToNowStrict(parseISO(timestamp), { unit: 'hour' })
};

const getAggregatedCommitment = (groupDeal: GroupDeal): number => {
    let acc: number = groupDeal.deal_participants.map(p => p.committed_participation).reduceRight((a, b) => a + b)
    return groupDeal.group_creator.committed_participation + acc
}

const renderGroupDealHeadder = (groupDeal: GroupDeal) => {
    return (
        <div>
            <img src={logo} alt='Robinhood' width="166" height="100" />
            <Typography>
                Robinhood
            </Typography>
            <Typography>
                {`Group Name: ${groupDeal.group_name || 'Unknown'}`}
            </Typography>
            <Typography>
                {`${groupDeal.deal_participants?.length || '¿'} members`}
            </Typography>
            <Typography>
                {groupDeal.is_open ? `${timeRemaining(groupDeal.deal_deadline)} left!` : `This Deal Is Closed`}
            </Typography>
            <Typography>
                {`We need a minimum of $${groupDeal.minimum_agg_threshold | 1000000} of which $${getAggregatedCommitment(groupDeal)} has been commited`}
            </Typography>
        </div>
    )
}

