import { CircularProgress, Typography } from "@material-ui/core"
import { formatDistanceToNowStrict } from "date-fns"
import { parseISO } from "date-fns/esm"
import React from "react"
import { useParams } from "react-router-dom"
import { GroupDeal, useGetGroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import logo from "../../shared/hardcodedMedia/robinhood_logo.png"
import GroupDealParticipant from "./GroupDealParticipants"

type GroupDealRouteParams = {
    id: string
}


const GroupDealPage: React.FunctionComponent = () => {
    const { id: groupDealID } = useParams<GroupDealRouteParams>()
    const { data: groupDeal, isValidating } = useGetGroupDeal(Number(groupDealID))
    const render = !isValidating && groupDeal
    // const { data: participant, isValidating } = useGetDealParticipant(1)
    return (
        <div>
            {isValidating && <CircularProgress />}
            {render && (
                renderGroupDealHeadder(groupDeal!!)
            )}
            {render && (
                <div>
                    <hr></hr>
                    <Typography>
                        "Social Media Share Section"
                    </Typography>
                    <hr></hr>
                </div>
            )}
            {render && groupDeal?.deal_participants.map(p => <GroupDealParticipant dealParticipantID={p.id} dealCreatorID={groupDeal.group_creator.id} key={p.id} />)}

        </div>
    )
}

export default GroupDealPage


const timeRemaining = (timestamp: string) => {
    return formatDistanceToNowStrict(parseISO(timestamp), { unit: 'hour' })
};

const getAggregatedCommitment = (groupDeal: GroupDeal): number => {
    let acc: number = groupDeal?.deal_participants.map(p => p.committed_participation).reduceRight((a, b) => a + b, 0)
    return acc
}

const renderGroupDealHeadder = (groupDeal: GroupDeal) => {
    const memberCount = groupDeal.deal_participants?.length
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
                {`${memberCount || '¿'} members`}
            </Typography>
            <Typography>
                {groupDeal.is_open ? `${timeRemaining(groupDeal.deal_deadline)} left!` : `This Deal Is Closed`}
            </Typography>
            <Typography>
                {`We need a minimum of $${groupDeal.minimum_agg_threshold || 1000000} of which $${getAggregatedCommitment(groupDeal)} has been commited`}
            </Typography>
        </div>
    )
}

