import React from "react"
import Typography from "@material-ui/core/Typography"
import { formatDistanceToNow } from "date-fns"
import LinearProgress from "@material-ui/core/LinearProgress"
import { parseISO } from "date-fns/esm"
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
        const aggCommitment: number = groupDeal?.deal_participants.reduce((acc, participant) => acc + participant.committed_participation, 0)
        return aggCommitment
    }

    const progress = Math.min((getAggregatedCommitment(groupDeal) * 100) / (groupDeal.minimum_agg_threshold || 1000000), 100)

    return (
        <div className={classes.groupDealHeaderSection}>
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
                </div>
                <div className={classes.companyInfoContainer}>
                    <img className={classes.companyLogo} src={logo} alt='Robinhood' />
                    <Typography>
                        Robinhood
                    </Typography>
                </div>
            </div>
            <LinearProgress className={classes.progress} color={progress < 100 ? 'secondary' : 'primary'} variant="determinate" value={progress} />
            <Typography variant="overline">
                {`Pledged $${getAggregatedCommitment(groupDeal).toLocaleString()} of $${minAggThreshold.toLocaleString()} goal`}
            </Typography>
        </div>
    )
}

export default GroupDealHeader
