import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { ArrowBack } from '@mui/icons-material';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material'; 
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: darkMode ? '#121212' : '#fff',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh'
    }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ color: darkMode ? '#fff' : '#000', marginBottom: '20px' }}
      >
        <ArrowBack fontSize="large" />
      </IconButton>

      <Button
        variant="outlined"
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: darkMode ? '#fff' : '#000',
          borderColor: darkMode ? '#fff' : '#000',
        }}
        onClick={handleDarkModeToggle}
        startIcon={darkMode ? <Brightness7 /> : <Brightness4 />}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>

     
      <Typography variant="h4" sx={{ color: darkMode ? '#fff' : '#000', marginBottom: '20px' }}>
        Your Favorite Movies ❤️
      </Typography>

      <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: '20px', 
        paddingBottom: '20px'
      }}>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <Typography variant="body1" sx={{ color: darkMode ? '#fff' : '#000' }}>
            No favorites yet. Go add some!
          </Typography>
        )}
      </div>

      <Button
        variant="outlined"
        sx={{ color: darkMode ? '#fff' : '#000', borderColor: darkMode ? '#fff' : '#000', marginTop: '20px' }}
        onClick={() => navigate('/Home')}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Favorites;
