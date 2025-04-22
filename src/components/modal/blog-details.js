// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CardMedia } from '@mui/material';

// const BlogDetails = ({ open, property, onClose }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//         {/* Property Image at the top of the modal */}
//         <CardMedia
//             component="img"
//             height="300"
//             image={property?.imageUrl}
//             alt={property?.title}
//             sx={{ objectFit: 'cover', borderBottom: '1px solid #e0e0e0' }}
//         />
//         <DialogTitle>{property?.title}</DialogTitle>
//         <DialogContent>
//             <Typography variant="h5" color="primary" gutterBottom>
//             {property?.description}
//             </Typography>

//             <Typography variant="h6" gutterBottom>
//             City: <span style={{ color: 'gray' }}>{property?.city}</span>
//             </Typography>

//             <Typography variant="body1" gutterBottom>
//             <strong>Bedrooms:</strong> {property?.bedrooms}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//             <strong>Bathrooms:</strong> {property?.bathrooms}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//             <strong>Garage:</strong> {property?.garages}
//             </Typography>
//         </DialogContent>

//         <DialogActions>
//         <Button onClick={onClose} color="primary">
//             Close
//         </Button>
//         </DialogActions>
//     </Dialog>
//   );
// };

// export default BlogDetailsModal;
