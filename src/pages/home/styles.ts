import { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/styles'

export const homePageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        buyOptionsContainer: {
            padding: '20px',
            width: '500px',
            minHeight: '500px'
        },
        buyOptions: {
            marginTop: '40px'
        },
        buyOption: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            border: '1px solid gray',
            marginTop: '20px'
        },
        createGroupFormContainer: {
            padding: '20px',
            width: '500px',
            minHeight: '500px'
        },
        createGroupForm: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '40px',
        },
        formItem: {
            marginTop: '20px'
        }
    }),
)
