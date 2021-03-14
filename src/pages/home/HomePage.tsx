import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { CreateDealParticipantAction, CreateGroupDealAction, UpdateDealParticipantAction } from './state/groupActions';
import CreateGroupFrom from './CreateGroupForm';
import { CreateGroupDealData, DealParticipantResponse, GroupDealResponse } from './state/types';
import { homePageStyles } from './styles';
import { RootState } from 'store';

enum MODAL_TYPE {
    BUY = 'BUY',
    CREATE_GROUP = 'CREATE_GROUP',
}

const HomePage = () => {
    const classes = homePageStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    const [modalVisible, setModalVisibility] = useState(false)
    const [modalType, setModalType] = useState(MODAL_TYPE.BUY)

    const renderBuyOptions = () => {
        return (
            <div className={classes.buyOptionsContainer}>
                <Typography variant="h5">How would you like to buy</Typography>
                <div className={classes.buyOptions}>
                    <div className={classes.buyOption}>
                        <Typography>Buy as an individual</Typography>
                        <ChevronRightIcon />
                    </div>
                    <div className={classes.buyOption} onClick={() => setModalType(MODAL_TYPE.CREATE_GROUP)}>
                        <Typography>Buy as an group</Typography>
                        <ChevronRightIcon />
                    </div>
                </div>
            </div>
        );
    }

    const onGroupSubmit = (payload: CreateGroupDealData) => {
        dispatch(CreateDealParticipantAction({
            data: {
                participant: loggedInUser?.data?.id,
                committed_participation: payload.data.yourCommitment
            },
            onSuccess: (response: DealParticipantResponse) => {
                dispatch(CreateGroupDealAction({
                    data: {
                        group_creator: response.id,
                        group_name: payload.data.groupName,
                        minimum_agg_threshold: payload.data.minimumAggregatedThreshold,
                        minimum_participation: payload.data.minimumParticipation,
                        paticipants_can_invite_friends: payload.data.usersCanInviteFriends
                    },
                    onSuccess: (groupDealResponse: GroupDealResponse) => {
                        dispatch(UpdateDealParticipantAction({
                            data: {
                                id: response.id,
                                deal: groupDealResponse.id
                            },
                            onSuccess: () => {
                                payload.onSuccess();
                                history.push(`/group_deal/${groupDealResponse.id}`)
                            }
                        }))
                    }
                }))
            }
        }))
    }

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setModalVisibility(!modalVisible)}
            >
                TRADE
            </Button>
            <Dialog
                open={modalVisible}
                onClose={() => setModalVisibility(false)}
            >
                {modalType === MODAL_TYPE.BUY ? renderBuyOptions() : <CreateGroupFrom onSubmit={onGroupSubmit} onSuccess={() => {}} />}
            </Dialog>
        </>
    );
}

export default HomePage;
