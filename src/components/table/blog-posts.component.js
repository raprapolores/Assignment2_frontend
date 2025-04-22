import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Pagination, CircularProgress} from '@mui/material';
import axios from 'axios';
import { BaseUrl } from "../../constants";
import FavoriteIcon from '@mui/icons-material/Favorite';
const TableProperties = () => {

  const [page, setPage] = useState(1); 
  const [allPosts, setAllPosts] = useState([]);
  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
      const fetchPosts = async () => {
  
        if (!token) {
          return;
        }
  
        try {
          const response = await axios.get(`${BaseUrl}/api/blogposts/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setAllPosts(response.data);
        } catch (err) {
          console.error("Failed to fetch blog posts:", err);
        }
      };
  
      fetchPosts();
    }, [token]);

    const propertiesPerPage = 4;
    const displayedPosts = allPosts.slice(
        (page - 1) * propertiesPerPage,
        page * propertiesPerPage
      );
    const handleLikePost = (post_id) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/blogposts/' + post_id + '/like/',
            headers: {
                    Authorization: `Token ${token}`
            },
        };

        axios
            .request(config)
            .then((response) => {
                setLiked(!liked); 
            })
            .catch((error) => {
                console.log(error);
            });
    }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{position: 'relative', marginTop: '100px'}}>
        <Container>
        <Typography sx={{marginBottom: '50px'}} variant="h3" align="center" gutterBottom>
            Latest Blogs
        </Typography>
        {allPosts ? ( 
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            {displayedPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id} size={12}>
                <Card>
                {/* <CardMedia
                    component="img"
                    height="300"
                    image={getRandomImageUrl()}
                    alt={property.title}
                /> */}
                <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                    {post.content}
                    </Typography>
                       {/* Location Icon and City Name */}
                    <Box style={{ display: 'flex', marginTop: '10px' }}>
                        {/* <PlaceIcon fontSize="small"/> */}
                        <Typography variant="body2" color="textSecondary">
                            {/* {property.city} */}
                        </Typography>
                    </Box>

                    {/* Property Details: Bedroom, Bathroom, Garage */}
                    <Box display="flex" justifyContent="flex-start" sx={{ marginTop: '10px' }}>
                        <FavoriteIcon fontSize="large" color="error" onClick={() => handleLikePost(post.id)}/>
                        <Typography variant="h6" color="textSecondary">
                            {post.like_count}
                        </Typography>
                    </Box>
                </CardContent>

                {/* View More Button Below Card */}
                {/* <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleViewMore(property)}
                        >
                        View More
                    </Button>
                </Box> */}
                </Card>
            </Grid>
            ))}
        </Grid>
        ): <CircularProgress />}
        {/* Pagination */}
        <Pagination
            count={Math.ceil(allPosts.length / propertiesPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
        />
        {/* <PropertyDetailsModal
            open={openModal}
            property={selectedProperty}
            onClose={handleCloseModal}
        /> */}
        </Container>
    </Box>
  );
};

export default TableProperties;
