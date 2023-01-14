import { Button, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BaseLayout = (props) => {
  const navigate = useNavigate()
  const handleNavigate = (val) => {
    if (val == ' signin') {
      navigate('/')
    }
    if (val == 'signup') {
      navigate('/signup')
    }
    if (val == 'logout') {
      navigate('/')
    }
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        py={3}
        sx={{ borderBottom: '1px solid black' }}
      >
        <Grid item xs={1}>
          <Button variant="contained" onClick={() => handleNavigate('signin')}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={() => handleNavigate('signup')}>
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={() => handleNavigate('logout')}>
            Log Out
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </>
  )
}

export default BaseLayout
