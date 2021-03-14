import Typography from "@material-ui/core/Typography"
import { formatDistanceToNow } from "date-fns"
import { parseISO } from "date-fns/esm"
import React from "react"
import { GroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import logo from "../../shared/hardcodedMedia/robinhood_logo.png"
import { groupDealStyles } from './styles'


type GroupDealHeaderParams = {
    groupDeal: GroupDeal
}

const GroupDealHeader = ({ groupDeal }: GroupDealHeaderParams) => {
    const classes = groupDealStyles();

    const memberCount = groupDeal.deal_participants?.length || '¿'
    const minAggThreshold = groupDeal?.minimum_agg_threshold || 1000000

    const timeRemaining = (timestamp: string) => {
        return formatDistanceToNow(parseISO(timestamp))
    };

    const getAggregatedCommitment = (groupDeal: GroupDeal): number => {
        let acc: number = groupDeal?.deal_participants.map(p => p.committed_participation).reduceRight((a, b) => a + b, 0)
        return acc
    }

    return (
        <div className={classes.groupDealHeaderContainer}>
            <div className={classes.groupDealDetails}>
                <Typography variant="h5" className={classes.groupName}>
                    {`${groupDeal.group_name || 'Unknown'}`}
                </Typography>
                <Typography variant="overline">
                    {`${memberCount} members`}
                </Typography>
                <Typography variant="overline">
                    {groupDeal.is_open ? `${timeRemaining(groupDeal?.deal_deadline)} left!` : `This Deal Is Closed`}
                </Typography>
                <Typography variant="overline">
                    {`We need a minimum of $${minAggThreshold.toLocaleString()} of which $${getAggregatedCommitment(groupDeal).toLocaleString()} has been commited`}
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

export default GroupDealHeader
