import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewMyBlog.css';
import {BaseUrl} from "../constants";
import Button from '@mui/material/Button';
import { Box, Container, Typography, Grid, Card, CardContent, Dialog, DialogActions, DialogContent, 
  DialogTitle, DialogContentText, TextField, TextareaAutosize } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ViewMyBlog = () => {
const token = localStorage.getItem("token");

const [posts, setPosts] = useState([]);
const [error, setError] = useState("");
const [open, setOpen] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [id, setId] = useState('');
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [titleEdit, setTitleEdit] = useState('');
const [contentEdit, setContentEdit] = useState('');
const [success, setSuccess] = useState('');
const [loading, setLoading] = useState('');


useEffect(() => {
    const fetchPosts = async () => {

      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`${BaseUrl}/api/blogposts/my`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      }
    };

    fetchPosts();
  }, [posts, token]);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClickEditOpen = (item) => {
  setOpenEdit(true);
  setId(item.id);
  setTitleEdit(item.title);
  setContentEdit(item.content);
};

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }


  function handleTitleEditChange(e) {
    setTitleEdit(e.target.value);
  }

  function handleContentEditChange(e) {
    setContentEdit(e.target.value);
  }

  // Create new Blog
  function CreateBlog() {
    setLoading(true);

    let data = JSON.stringify({
        title,
        content,
        // image
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BaseUrl + '/api/blogposts/create/',
        headers: {
             Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        data,
    };

    axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setLoading(false);
            setOpen(false); // Close modal on successful API call
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
}

// Delete Blog
function DeleteBlog(post_id) {
  setLoading(true);
  let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: BaseUrl + '/api/blogposts/' + post_id + '/delete/',
      headers: {
        Authorization: `Token ${token}`,
      }
  };

  axios.request(config)
      .then((response) => {
          console.log(JSON.stringify(response.data));
          setSuccess('Blog deleted successfully');
          setLoading(false);
      })
      .catch((error) => {
          console.log(error);
          setLoading(false);
      });
}

// Edit Blog
function EditBlog(id) {

  setLoading(true);
  let data = JSON.stringify({
    title: titleEdit,
    content: contentEdit
  });
  let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: BaseUrl + '/api/blogposts/' + id + '/',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setSuccess('Blog updated successfully');
    setLoading(false)
    setOpenEdit(false);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false)
  });

}

return (
  <Box sx={{position: 'relative', marginTop: '100px'}}>
      <Container>
      <Typography sx={{marginBottom: '50px'}} variant="h3" align="center" gutterBottom>
          My Blog Posts
      </Typography>
      {error && <p className="error-message">{error}</p>}
      {success && (
          <Typography display="flex" justifyContent="center" alignItems="center" color='success'>{success}</Typography>
        )}
      <Grid display="flex" justifyContent="center" alignItems="center" size="grow" container spacing={2} sx={{marginBottom: '20px'}}>
      <React.Fragment>
        <Button variant="contained" color="inherit" onClick={handleClickOpen}>
          Create Post
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Create new Blog</DialogTitle>
          <DialogContent>
              <DialogContentText>
                Share to others what's on your mind...
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Blog Title"
                type="text"
                fullWidth
                onChange={handleTitleChange}
                variant="standard"
              />
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Blog description"
                style={{ width: 500 , height: 100, marginTop: 20}}
                onChange={handleContentChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={CreateBlog} type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
            </DialogActions>
          </Dialog>
          {/*EDIT AREA */}
          <Dialog
          open={openEdit}
          onClose={handleClose}
        >
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogContent>
              <DialogContentText>
                Share to others what's on your mind...
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                type="text"
                fullWidth
                defaultValue={titleEdit}
                onChange={handleTitleEditChange}
                variant="standard"
              />
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Blog description"
                defaultValue={contentEdit}
                style={{ width: 500 , height: 100, marginTop: 20}}
                onChange={handleContentEditChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button onClick={() => EditBlog(id)} type="submit" disabled={loading}>{loading ? 'Updating...' : 'Edit'}</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
          {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id} size={12}>
              <Card>
              {/* <CardMedia
                  component="img"
                  height="300"
                  image={getRandomImageUrl()}
                  alt={post.title}
              /> */}
              <CardContent>
                  <Typography variant="h3">{post.title}</Typography>
                  <Typography variant="h5" color="textSecondary">
                  {post.content}
                  </Typography>
                     {/* Location Icon and City Name */}
                  <Box style={{ display: 'flex', marginTop: '10px' }}>
                      <FavoriteIcon fontSize="large" color="error"/>
                      <Typography variant="h4" color="textSecondary">
                          {post.like_count}
                      </Typography>
                  </Box>
              </CardContent>

              {/* View More Button Below Card */}
              <Box>
                <Grid container spacing={2} margin={'20px'} justifyContent="end">
                  <Grid item size={2}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleClickEditOpen(post)}
                      >
                      Edit
                  </Button>
                  </Grid>
                  <Grid item size={2}>
                  <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      disabled={loading}
                      onClick={() => DeleteBlog(post.id)}
                      >
                      {loading ? 'Deleting...' : 'Delete'}
                  </Button>
                  </Grid>
                  </Grid>
              </Box>
              </Card>
          </Grid>
          ))}
      </Grid>
      </Container>
  </Box>
);
};

export default ViewMyBlog;
