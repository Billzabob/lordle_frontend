import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({theme}) => ({
  '&:hover': {
    backgroundImage: 'radial-gradient(#41494E 40%, #A8F8FE 100%)',
  },
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}))