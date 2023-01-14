import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BaseLayout from '../components/BaseLayout'
import { apiGet } from '../utils/apiRequest'

const Admin = () => {
  const [postsList, setPostsList] = useState([])
  const [usersList, setUsersList] = useState([])

  const getAllPosts = () => {
    apiGet(
      'creator/post',
      (res) => {
        console.log('res', res)
        setPostsList(res.data.data)
      },
      (err) => {
        console.log('err', err)
      },
    )
  }
  const getAllCreators = () => {
    apiGet(
      'auth/creators',
      (res) => {
        console.log('res', res)
        setUsersList(res.data)
      },
      (err) => {
        console.log('err', err)
      },
    )
  }

  useEffect(() => {
    getAllPosts()
    getAllCreators()
  }, [])

  return (
    <BaseLayout>
      <Grid container mt={6}>
        <Grid item xs={5}>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>List of Posts</Typography>
          <Grid item container>
            {postsList.length > 0 &&
              postsList.map((item) => {
                return (
                  <Grid item xs={3} m={3}>
                    <Typography>{item.title}</Typography>
                    <Typography>{item.description}</Typography>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            List of Users
          </Typography>

          <Grid item container>
            {usersList.length > 0 &&
              usersList.map((item) => {
                return (
                  <Grid item xs={3} m={3}>
                    <Typography>{item.email}</Typography>
                    <Typography>{item.role}</Typography>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
      </Grid>
    </BaseLayout>
  )
}

export default Admin
