import { Button, styled } from '@mui/material'

export const StyledButton = styled(Button)(({theme}) => ({
  '&:hover': {
    backgroundImage: 'radial-gradient(#362E2B 50%, #A8F8FE 150%)',
  },
  fontWeight: 'bold'
}))