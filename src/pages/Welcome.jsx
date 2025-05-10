import React from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const backgroundImage = 'https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg'; // You can use any TMDb backdrop URL

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      
      <Container
        maxWidth="sm"
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 4,
          p: 6,
          color: 'white',
          textAlign: 'center',
          boxShadow: 20,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          🎬 Movie Explorer
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover trending movies, explore details, and save favorites!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 4,
            px: 4,
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: '#ff3d00',
            '&:hover': {
              backgroundColor: '#dd2c00',
            },
          }}
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Welcome;
