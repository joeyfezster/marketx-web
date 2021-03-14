import React from "react"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from 'react-share'

import { GroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import { groupDealStyles } from './styles'


type GroupDealShareParams = {
    groupDeal: GroupDeal
}

const GroupDealShare = ({ groupDeal }: GroupDealShareParams) => {
    const classes = groupDealStyles()
    const shortlink = window.location.href

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

export default GroupDealShare
