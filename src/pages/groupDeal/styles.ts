import { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/styles'

export const groupDealStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        groupDealHeaderSection: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid gray',
            padding: '20px',
        },
        progress: {
            color: 'red'
        },
        groupDealHeaderContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        groupDealShareContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid gray',
            padding: '20px',
            marginTop: '20px',
        },
        groupDealMembersContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid gray',
            padding: '20px',
            marginTop: '20px',
        },
        commitmentSection: {
            display: 'flex',
            width: '100%',
            border: '1px solid gray',
            padding: '20px',
            marginTop: '20px',
            justifyContent: 'space-between',
        },
        commitmentContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        commitmentInput: {
            marginRight: '10px'
        },
        dealParticipantContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px'
        },
        userDetails: {
            display: 'flex',
            alignItems: 'center'
        },
        userDetail: {
            marginRight: '10px',
        },
        commitment: {
            background: '#22ce99',
            color: 'white',
            padding: '0 20px',
            borderRadius: '20px'
        },
        shareContainer: {
            display: 'flex',
            marginTop: '20px'
        },
        shareButton: {
            marginLeft: '10px',
            outline: 'none'
        },
        companyInfoContainer: {
            padding: '10px',
            textAlign: 'center'
        },
        groupDealDetails: {
            display: 'flex',
            flexDirection: 'column'
        },
        groupName: {
            textTransform: 'capitalize'
        },
        companyLogo: {
            width: '100px'
        }
    }),
)
