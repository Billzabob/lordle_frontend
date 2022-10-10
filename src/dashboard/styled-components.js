import { Button, styled } from '@mui/material'

export const StyledButton = styled(Button)(({theme}) => ({
  '&:hover': {
    backgroundImage: 'radial-gradient(#C2A052 50%, #A8F8FE 150%)',
    color: 'black'
  },
  fontWeight: 'bold'
}))