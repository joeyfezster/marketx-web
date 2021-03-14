import React from "react"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, WeiboShareButton, WeiboIcon } from 'react-share'

import { GroupDeal } from "shared/utils/swrHooks/useGetGroupDealData"
import { groupDealStyles } from './styles'
import { useSelector } from "react-redux"
import { RootState } from "store"


type GroupDealShareParams = {
    groupDeal: GroupDeal
}

const GroupDealShare = ({ groupDeal }: GroupDealShareParams) => {
    const classes = groupDealStyles()
    const shortlink = window.location.href

    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    const loggedInUserIsGroupCreator = Number(loggedInUser?.data?.id) === groupDeal?.group_creator?.participant
    const participantsCanInviteFriends = groupDeal?.paticipants_can_invite_friends

    if (!loggedInUserIsGroupCreator && !participantsCanInviteFriends) {
        return null
    }

    const title = groupDeal?.group_name || 'Unknown'
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
                    title={title}
                    separator=":"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                    className={classes.shareButton}
                    url={shortlink}
                    title={title}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TwitterShareButton
                    className={classes.shareButton}
                    url={shortlink}
                    title={title}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                    className={classes.shareButton}
                    url={shortlink}
                    title={title}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <RedditShareButton
                    className={classes.shareButton}
                    url={shortlink}
                    title={title}
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>
                <WeiboShareButton
                    className={classes.shareButton}
                    url={shortlink}
                    title={title}
                >
                    <WeiboIcon size={32} round />
                </WeiboShareButton>
            </div>
        </div>
    );
}

export default GroupDealShare
