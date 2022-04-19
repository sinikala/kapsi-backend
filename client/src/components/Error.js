import { Typography } from '@mui/material'
import theme from '../theme/theme'

const Error = ({ message }) => {
  return (
    <Typography className='error' variant='subtitle2' gutterBottom={true} sx={{ color: theme.palette.error.main }}>
      {message}
    </Typography>
  )
}
export default Error