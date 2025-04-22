import React from 'react';
import './Homepage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import { Carousel } from 'react-responsive-carousel';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const HomePage = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Welcome to Blog Master</h1>
        <p>Join us in the journey of sharing, connecting, and inspiring one post at a time.</p>

        <div className="carousel-wrapper">
          <Carousel
  showThumbs={false}
  autoPlay
  infiniteLoop
  showStatus={false}
  interval={3000}
>
  <div className="carousel-slide">
    <img src={image1} alt="Slide 1" />
    <img src={image2} alt="Slide 2" />
    <img src={image3} alt="Slide 3" />
  </div>
  <div className="carousel-slide">
    <img src={image4} alt="Slide 4" />
    <img src={image5} alt="Slide 5" />
  </div>
</Carousel>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
