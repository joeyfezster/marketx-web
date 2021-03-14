import React from 'react';
import { withFormik, FormikProps, Form } from 'formik';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CreateGroupDealData } from './state/types'
import { homePageStyles } from './styles'

type CreateGroupFormProps = {
    onSubmit: (data: CreateGroupDealData) => void
    onSuccess: () => void
}

type FormValues = {
    groupName: string
    minimumAggregatedThreshold: number
    yourCommitment: number
    minimumParticipation: number
    usersCanInviteFriends: boolean
}

const CreateGroupForm = (props: CreateGroupFormProps & FormikProps<FormValues>) => {
    const {
        isSubmitting,
        values,
        setFieldValue,
    } = props;
    const classes = homePageStyles()

    return (
        <div className={classes.createGroupFormContainer}>
            <Typography variant="h5">Name your group</Typography>
            <Form className={classes.createGroupForm}>
                <TextField
                    className={classes.formItem}
                    required
                    name="groupName"
                    label="Group Name"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('groupName', event.target.value, false)
                    }}
                />
                <TextField
                    className={classes.formItem}
                    type="number"
                    required
                    name="minimumAggregatedThreshold"
                    label="Minimum Aggregated Threshold ( $ )"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('minimumAggregatedThreshold', event.target.value, false)
                    }}
                />
                <TextField
                    className={classes.formItem}
                    type="number"
                    required
                    name="yourCommitment"
                    label="Your Commitment ( $ )"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('yourCommitment', event.target.value, false)
                    }}
                />
                <TextField
                    className={classes.formItem}
                    type="number"
                    required
                    name="minimumParticipation"
                    label="Minimum Participation"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('minimumParticipation', event.target.value, false)
                    }}
                />
                <FormControlLabel
                    className={classes.formItem}
                    control={<Checkbox
                        checked={values.usersCanInviteFriends}
                        color="primary"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('usersCanInviteFriends', event.target.checked, false)
                        }}
                        name="checkedA"
                    />}
                    label="Allow members to invite others to join"
                />
                {isSubmitting
                    ?
                    <Button
                        className={classes.formItem}
                        variant="contained"
                        color="primary"
                        disabled
                    >
                        <CircularProgress size={25} />
                    </Button>
                    :
                    <Button
                        className={classes.formItem}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Continue
                    </Button>
                }
            </Form>
        </div>
    );
}

export default withFormik<CreateGroupFormProps, FormValues>({
    mapPropsToValues: () => ({
        groupName: "",
        minimumAggregatedThreshold: 0,
        yourCommitment: 0,
        minimumParticipation: 0,
        usersCanInviteFriends: true
    }),
    validate: values => {
        const errors: Record<string, string> = {};

        if (!values.groupName) {
            errors.groupName = 'Required';
        }
        if (values.minimumAggregatedThreshold <= 0) {
            errors.minimumAggregatedThreshold = 'Required';
        }
        if (values.yourCommitment <= 0) {
            errors.yourCommitment = 'Required';
        }
        if (values.minimumParticipation <= 0) {
            errors.minimumParticipation = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        setSubmitting(true)
        props.onSubmit({
            data: {
                groupName: values.groupName,
                yourCommitment: values.yourCommitment,
                minimumAggregatedThreshold: values.minimumAggregatedThreshold,
                minimumParticipation: values.minimumParticipation,
                usersCanInviteFriends: values.usersCanInviteFriends
            },
            onSuccess: () => {
                setSubmitting(false)
            }
        })
    },

    displayName: 'CreateGroupForm',
})(CreateGroupForm);
