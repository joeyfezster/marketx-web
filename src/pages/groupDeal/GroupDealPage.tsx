import React from "react"
import { CircularProgress, Typography, TextField } from "@material-ui/core"
import { WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from 'react-share'
import { formatDistanceToNowStrict } from "date-fns"
import { parseISO } from "date-fns/esm"
import { useParams } from "react-router-dom"

import { GroupDeal, useGetGroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import logo from "../../shared/hardcodedMedia/robinhood_logo.png"
import GroupDealParticipant from "./GroupDealParticipants"
import LoggedInUserCommitment from "./LoggedInUserCommitment"
import { groupDealStyles } from './styles'

type GroupDealRouteParams = {
    id: string
}

const GroupDealPage: React.FunctionComponent = () => {
    const classes = groupDealStyles()
    const { id: groupDealID } = useParams<GroupDealRouteParams>()
    const { data: groupDeal, isValidating } = useGetGroupDeal(Number(groupDealID))
    const shortlink = window.location.href
    const render = !isValidating && groupDeal
    // const { data: participant, isValidating } = useGetDealParticipant(1)

    const renderGroupDealHeader = (groupDeal: GroupDeal) => {
        const memberCount = groupDeal.deal_participants?.length ? groupDeal.deal_participants.length + 1 : '¿'
        return (
            <div className={classes.groupDealHeaderContainer}>
                <div className={classes.groupDealDetails}>
                    <Typography variant="h5" className={classes.groupName}>
                        {`${groupDeal.group_name || 'Unknown'}`}
                    </Typography>
                    <Typography variant="overline">
                        {`${memberCount || '¿'} members`}
                    </Typography>
                    <Typography variant="overline">
                        {groupDeal.is_open ? `${timeRemaining(groupDeal.deal_deadline)} left!` : `This Deal Is Closed`}
                    </Typography>
                    <Typography variant="overline">
                        {`We need a minimum of $${groupDeal.minimum_agg_threshold | 1000000} of which $${getAggregatedCommitment(groupDeal)} has been commited`}
                    </Typography>
                </div>
                <div className={classes.companyInfoContainer}>
                    <img className={classes.companyLogo} src={logo} alt='Robinhood' />
                    <Typography>
                        Robinhood
                    </Typography>
                </div>
            </div>
        )
    }

    const renderShareSection = (groupDeal: GroupDeal) => {
        return (
            <div className={classes.groupDealShareContainer}>
                <TextField
                    label="Shortlink"
                    value={shortlink}
                    variant="outlined"
                />
                <div className={classes.shareContainer}>
                    <Typography variant="overline">Share on</Typography>
                    <WhatsappShareButton
                        className={classes.shareButton}
                        url={shortlink}
                        title={groupDeal.group_name || 'Unknown'}
                        separator=":"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TelegramShareButton
                        className={classes.shareButton}
                        url={shortlink}
                        title={groupDeal.group_name || 'Unknown'}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {isValidating && <CircularProgress />}
            {render && renderGroupDealHeader(groupDeal!!)}
            {render && renderShareSection(groupDeal!!)}
            {render && groupDeal?.deal_participants.map(p => <GroupDealParticipant dealParticipantID={p.id} dealCreatorID={groupDeal.group_creator.id} key={p.id} />)}
            {render && <LoggedInUserCommitment groupDealID={groupDeal?.id} minimumParticipation={groupDeal?.minimum_participation} />}
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
