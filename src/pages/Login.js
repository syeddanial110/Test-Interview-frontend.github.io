import { Button, Grid, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../utils/apiRequest'
import { setToken } from '../utils/Auth'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const onFormSubmit = (val) => {
    const dataObj = {
      email: formData.email,
      password: formData.password,
      role: formData.role.toLowerCase(),
    }
    if (val == 'signin') {
      apiPost(
        'auth/signin',
        dataObj,
        (res) => {
          console.log('res', res)
          if (res.success) {
            setToken(res.data.successResult.token)
            if (
              res.data.successResult.user.role.toLowerCase() == formData.role
            ) {
              navigate(`/${formData.role.toLowerCase()}`)
            } else {
              alert('This user with this role does not exist')
            }
          } else {
            alert(res.data.errorResult)
          }
        },
        (err) => {
          console.log('err', err)
        },
      )
    }
    if (val == 'signup') {
      apiPost(
        'auth/signup',
        dataObj,
        (res) => {
          console.log('res', res)
          if (res.success) {
            alert(
              'Your are successfully registerd your account click on login button',
            )
          } else {
            alert(res.data.errorResult)
          }
        },
        (err) => {
          console.log('err', err)
        },
      )
    }

    // if (formData.role.toLowerCase() == 'admin') navigate('/admin')
    // if (formData.role.toLowerCase() == 'creator') navigate('/creator')
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Grid item xs={6}>
        <Stack spacing={2}>
          <TextField
            placeholder="Email"
            onChange={handleInputChange}
            name="email"
          />
          <TextField
            placeholder="Password"
            onChange={handleInputChange}
            name="password"
          />
          <TextField
            placeholder="role  - admin/creator"
            onChange={handleInputChange}
            name="role"
          />
          <Button variant="outlined" onClick={() => onFormSubmit('signin')}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => onFormSubmit('signup')}>
            Sign Up?
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Login
