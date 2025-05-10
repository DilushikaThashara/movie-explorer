import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton
} from '@mui/material';
import { PlayArrow, ArrowBack } from '@mui/icons-material';

const API_KEY = '1cd02a1492457a5b981197c740a5ce0e';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, similarRes, recommendedRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`),
        ]);
        setMovie(detailsRes.data);
        setCast(detailsRes.data.credits.cast.slice(0, 6));
        setSimilar(similarRes.data.results.slice(0, 10));
        setRecommended(recommendedRes.data.results.slice(0, 10));
        setLoading(false);
      } catch (err) {
        console.error('Failed to load movie details:', err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', paddingTop: '20px' }} />;

  const trailer = movie.videos.results.find(v => v.type === "Trailer");

  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  return (
    <div style={{
      backgroundColor: darkMode ? '#121212' : '#fff',
      color: darkMode ? '#fff' : '#000',
      padding: '20px',
      minHeight: '100vh'
    }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ color: darkMode ? '#fff' : '#000', marginBottom: '10px' }}
      >
        <ArrowBack fontSize="large" />
      </IconButton>

      {/* Light/Dark Toggle */}
      <Button
        variant="outlined"
        onClick={handleDarkModeToggle}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: darkMode ? '#fff' : '#000',
          borderColor: darkMode ? '#fff' : '#000',
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '50vh',
        marginBottom: '30px',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(5px)',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: -1,
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: '10px' }}>
            {movie.tagline || "An epic tale awaits"}
          </Typography>
          {trailer && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{ fontSize: '14px', padding: '6px 16px' }}
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </Button>
          )}
        </div>
      </div>

      {/* Movie PosterDetails */}
      <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: darkMode ? '#1c1c1c' : '#f5f5f5' }}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{ borderRadius: '10px' }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ color: darkMode ? '#fff' : '#000' }}>
                Rating: {movie.vote_average}
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? '#ccc' : '#444' }}>
                {movie.release_date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.6' }}>
            {movie.overview}
          </Typography>
          {trailer && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h6" gutterBottom>Trailer Preview</Typography>
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allowFullScreen
                title="Trailer"
                style={{ borderRadius: '10px' }}
              ></iframe>
            </div>
          )}
        </Grid>
      </Grid>

      {/* Cast */}
      <Typography variant="h5" gutterBottom>Top Cast</Typography>
      <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
        {cast.map(actor => (
          <Grid item key={actor.id} xs={6} sm={4} md={2} textAlign="center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : 'https://via.placeholder.com/100x150?text=No+Image'
              }
              alt={actor.name}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}>
              {actor.name}
            </Typography>
            <Typography variant="caption" sx={{ color: darkMode ? '#ccc' : '#555' }}>
              {actor.character}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Similar Movies */}
      <Typography variant="h5" gutterBottom>Similar Movies</Typography>
      <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
        {similar.map(movie => (
          <Grid item key={movie.id} xs={6} sm={4} md={2} component={Link} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ backgroundColor: darkMode ? '#1c1c1c' : '#f5f5f5' }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                sx={{ borderRadius: '10px' }}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recommended Movies */}
      <Typography variant="h5" gutterBottom>Recommended Movies</Typography>
      <Grid container spacing={2}>
        {recommended.map(movie => (
          <Grid item key={movie.id} xs={6} sm={4} md={2} component={Link} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ backgroundColor: darkMode ? '#1c1c1c' : '#f5f5f5' }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                sx={{ borderRadius: '10px' }}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MoviePage;
