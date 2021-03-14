import { Button, TextField, Typography } from '@material-ui/core'
import { CreateDealParticipantAction, UpdateDealParticipantAction } from 'pages/home/state/groupActions'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFindDealParticipant } from 'shared/utils/swrHooks/useGetDealParticipant'
import { RootState } from 'store'
import { groupDealStyles } from './styles'

type LoggedInUserCommitmentProps = {
    groupDealID: number | undefined,
    minimumParticipation: number | undefined,
}

const LoggedInUserCommitment: React.FunctionComponent<LoggedInUserCommitmentProps> = ({
    groupDealID,
    minimumParticipation
}) => {
    const classes = groupDealStyles()
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    const { data: dealParticipant, isValidating } = useFindDealParticipant(Number(loggedInUser.data?.id), groupDealID)
    const [commitment, setCommitment] = useState<number>(dealParticipant?.committed_participation || 0)
    const dispatch = useDispatch()

    const loggedInUserIsAlreadyAParticipant = !isValidating && dealParticipant && dealParticipant.committed_participation

    if (!loggedInUser || !loggedInUser.data) {
        return null
    }

    const createNewDealParticipant = () => {
        dispatch(CreateDealParticipantAction({
            data: {
                participant: loggedInUser?.data?.id,
                committed_participation: commitment,
                deal: groupDealID?.toString()
            }
        }))
    }

    const updateExistingDealParticipant = () => {
        dispatch(UpdateDealParticipantAction({
            data: {
                id: dealParticipant?.id.toString(),
                committed_participation: commitment
            }
        }))
    }

    const handleClick = () => {
        if (minimumParticipation && commitment < minimumParticipation) {
            alert(`A minimum of ${minimumParticipation} is required to participate`)
            return
        }
        if (loggedInUserIsAlreadyAParticipant) {
            updateExistingDealParticipant()
        }
        else {
            createNewDealParticipant()
        }
        window.location.reload();
    }

    if (!isValidating) {
        return (
            <div className={classes.commitmentSection}>
                <Typography variant="h5">
                    Your Commitment
                </Typography>
                <div className={classes.commitmentContainer}>
                    <TextField
                        className={classes.commitmentInput}
                        required
                        label="Your Commitment"
                        type="number"
                        variant="outlined"
                        value={commitment}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCommitment(Number(event.target.value))
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        {loggedInUserIsAlreadyAParticipant ? "Update" : "Commit to Invest"}
                    </Button>
                </div>
            </div>
        );
    }

    return null
}

export default LoggedInUserCommitment

