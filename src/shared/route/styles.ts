import { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/styles'

export const headerStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '5px 20px',
            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            height: '25px'
        }
    }),
)
