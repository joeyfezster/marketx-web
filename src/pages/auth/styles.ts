import { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/styles'

export const authStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      margin: 'auto',
    },
    formHeader: {
      display: 'flex',
      justifyContent: 'center'
    },
    formItem: {
      marginTop: '15px'
    }
  }),
)
