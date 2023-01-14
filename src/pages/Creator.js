import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BaseLayout from '../components/BaseLayout'
import { apiDelete, apiGet, apiPost, apiPut } from '../utils/apiRequest'

const Creator = () => {
  const [open, setOpen] = useState(false)
  const [postsList, setPostsList] = useState([])
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const handleFileClick = (e) => {
    console.log('e.target.files[0]', e.target.files[0]?.name)
    setPostData({ ...postData, image: e.target.files[0]?.name })
  }

  const handleOpen = () => {
    setOpen(true)
    setEditMode(false)
    setPostData({
      description: '',
      image: '',
      title: '',
    })
  }
  const handleClose = () => {
    setOpen(false)
  }

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

  const onSubmitPost = () => {
    const dataObj = {
      title: postData.title,
      description: postData.description,
      image: postData.image,
    }
    if (editMode) {
      apiPut(
        `creator/updatePost/${selectedId}`,
        dataObj,
        (res) => {
          console.log('res', res)
          if (res.status == 'success') {
            handleClose()
            alert('post successfully updated')
            getAllPosts()
          } else {
            alert('Something went wrong')
          }
        },
        (err) => {
          console.log('err', err)
        },
      )
    } else {
      apiPost(
        'creator/createpost',
        dataObj,
        (res) => {
          console.log('res', res)
          if (res.status == 'succes') {
            handleClose()
            alert('post successfully added')
            getAllPosts()
          } else {
            alert('Something went wrong')
          }
        },
        (err) => {
          console.log('err', err)
        },
      )
    }
  }

  const onSubmitDelete = (id) => {
    apiDelete(
      `creator/deletePost/${id}`,
      (res) => {
        console.log('res', res)
        if (res.status == 'success') {
          getAllPosts()
          alert('Post deleted successfully')
        }
      },
      (err) => {
        console.log('err', err)
      },
    )
  }

  const handleEditClick = (item) => {
    handleOpen()
    setPostData({
      ...postData,
      title: item.title,
      description: item.description,
      image: item.image,
    })
    setEditMode(true)
    setSelectedId(item._id)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  console.log('postData', postData)

  return (
    <BaseLayout>
      <Grid container justifyContent="flex-end" p={5}>
        <Grid item xs={1}>
          <Button variant="outlined" onClick={handleOpen}>
            Add Post
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" p={5}>
        {postsList?.length > 0 &&
          postsList.map((item) => {
            return (
              <Grid item xs={3}>
                <Typography>{item.title}</Typography>
                <Typography>{item.description}</Typography>
                <Button onClick={() => handleEditClick(item)}>Edit</Button>
                <Button onClick={() => onSubmitDelete(item._id)}>Delete</Button>
              </Grid>
            )
          })}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={3}>
            <TextField
              placeholder="Title"
              name="title"
              onChange={handleInputChange}
              value={postData.title}
            />
            <TextField
              placeholder="Description"
              name="description"
              multiline
              onChange={handleInputChange}
              value={postData.description}
            />
            <TextField type="file" onChange={handleFileClick} />
          </Stack>
          <Stack direction="row">
            <Button onClick={onSubmitPost}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </BaseLayout>
  )
}

export default Creator
