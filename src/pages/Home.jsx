import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import {
  getTrendingMovies,
  searchMovies,
  getGenres,
} from '../api/tmdb';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { Brightness7, Brightness4 } from '@mui/icons-material';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const observer = useRef();

  // Fetch genres and initial movies
  useEffect(() => {
    loadGenres();
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchQuery(lastSearch);
      handleSearch(lastSearch);
    } else {
      loadTrendingMovies(1, selectedGenre);
    }
  }, []);

  const loadGenres = async () => {
    const genreData = await getGenres();
    setGenres(genreData);
  };

  const loadTrendingMovies = async (pageNum = 1, genreId = '') => {
    setLoading(true);
    const data = await getTrendingMovies(genreId, pageNum);

    setMovies((prev) => {
      const newMovies = data.filter((m) => !prev.some((p) => p.id === m.id));
      return [...prev, ...newMovies];
    });

    setHasMore(data.length > 0);
    setLoading(false);
  };

  const loadSearchResults = async (query, pageNum = 1) => {
    setLoading(true);
    const results = await searchMovies(query, pageNum);

    setMovies((prev) => {
      if (pageNum === 1) return results;
      const newResults = results.filter((m) => !prev.some((p) => p.id === m.id));
      return [...prev, ...newResults];
    });

    setHasMore(results.length > 0);
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearching(true);
    setMovies([]);
    setPage(1);
    localStorage.setItem('lastSearch', query);
    await loadSearchResults(query, 1);
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    setSearching(false);
    setSearchQuery('');
    setMovies([]);
    setPage(1);
    localStorage.removeItem('lastSearch');
    loadTrendingMovies(1, genreId);
  };

  const handleFavoriteClick = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Infinite scroll observer
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            if (searching) {
              loadSearchResults(searchQuery, nextPage);
            } else {
              loadTrendingMovies(nextPage, selectedGenre);
            }
            return nextPage;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searching, searchQuery, selectedGenre]
  );

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
        color: isDarkMode ? '#fff' : '#000',
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #2c3e50, #34495e)'
            : 'linear-gradient(135deg, #e74c3c, #f39c12)',
          color: '#fff',
          padding: '30px 20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Discover Trending Movies
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'light' }}>
          Explore the latest and greatest in cinema, from blockbusters to hidden gems.
        </Typography>
      </Box>

      <Container sx={{ paddingTop: 3 }}>
        {/* Search and Favorites Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <SearchBar onSearch={handleSearch} />
          <Button
            onClick={() => navigate('/favorites')}
            variant="outlined"
            color="primary"
            sx={{ marginLeft: '16px', padding: '6px 16px', borderRadius: 3 }}
          >
            Go to Favorites
          </Button>
        </Box>

        {/* Theme and Logout */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#444' : '#fff', borderRadius: '50%', padding: '12px' }}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ padding: '8px 16px', borderRadius: 3 }}>
            Logout
          </Button>
        </Box>

        {/* Genre Filter */}
        <FormControl sx={{ marginBottom: 2, width: 200 }}>
          <InputLabel sx={{ color: isDarkMode ? '#fff' : '#000' }}>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            label="Genre"
            sx={{
              backgroundColor: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              '& .MuiSelect-icon': {
                color: isDarkMode ? '#fff' : '#000',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#fff' : '#000',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#ddd' : '#007bff',
              },
              '& .MuiSelect-root': {
                paddingRight: '30px', // Adjust padding to give space for the dropdown icon
              },
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Heading */}
        <Typography variant="h4" fontWeight="bold" sx={{ marginTop: '30px' }}>
          {searching ? `Search Results for: "${searchQuery}"` : 'Trending Movies'}
        </Typography>

        {/* Movie Grid */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={3}
          sx={{ marginTop: 3 }}
        >
          {movies.map((movie, index) => {
            const isLast = index === movies.length - 1;
            return (
              <div ref={isLast ? lastMovieRef : null} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onFavoriteClick={handleFavoriteClick}
                  isFavorite={favorites.some((fav) => fav.id === movie.id)}
                />
              </div>
            );
          })}
        </Box>

        {/* Loader */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Home;
