import { Button, TextField, Typography } from '@material-ui/core'
import { CreateDealParticipantAction, UpdateDealParticipantAction } from 'pages/home/state/groupActions'
import { DealParticipantResponse } from 'pages/home/state/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFindDealParticipant } from 'shared/utils/swrHooks/useGetDealParticipant'
import { RootState } from 'store'
import { groupDealStyles } from './styles'

type LoggedInUserCommitmentProps = {
    groupDealID: number | undefined,
    minimumParticipation: number | undefined,
    onCommitment: (loggedInUserDealParticipantID: string | undefined) => void,
}

const LoggedInUserCommitment: React.FunctionComponent<LoggedInUserCommitmentProps> = ({
    groupDealID,
    minimumParticipation,
    onCommitment
}) => {
    const classes = groupDealStyles()
    const { loggedInUser } = useSelector((state: RootState) => state.authState)
    const { data: dealParticipant, isValidating } = useFindDealParticipant(Number(loggedInUser.data?.id), groupDealID)
    const [commitment, setCommitment] = useState<number>(dealParticipant?.committed_participation || 0)
    const [loggedInUserIsParticipant, setLoggedInUserIsParticipant] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const isParticipant = Boolean(dealParticipant && (dealParticipant.committed_participation > 0))
        setLoggedInUserIsParticipant(isParticipant)
        if (dealParticipant?.committed_participation) {
            setCommitment(dealParticipant.committed_participation)
        }
    }, [dealParticipant])

    if (!loggedInUser || !loggedInUser.data) {
        return null
    }

    const createNewDealParticipant = () => {
        dispatch(CreateDealParticipantAction({
            data: {
                participant: loggedInUser?.data?.id,
                committed_participation: commitment,
                deal: groupDealID?.toString()
            },
            onSuccess(response: DealParticipantResponse) {
                onCommitment(response.id)
            }
        }))
    }

    const updateExistingDealParticipant = () => {
        dispatch(UpdateDealParticipantAction({
            data: {
                id: dealParticipant?.id.toString(),
                committed_participation: commitment
            },
            onSuccess() {
                onCommitment(dealParticipant?.id.toString())
            }
        }))
    }

    const handleClick = () => {
        if (minimumParticipation && commitment < minimumParticipation) {
            alert(`A minimum of $${minimumParticipation?.toLocaleString()} is required to participate`)
            return
        }
        if (loggedInUserIsParticipant) {
            updateExistingDealParticipant()
        }
        else {
            createNewDealParticipant()
        }
    }

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
                    {loggedInUserIsParticipant ? "Update" : "Commit to Invest"}
                </Button>
            </div>
        </div>
    );
}

export default LoggedInUserCommitment

