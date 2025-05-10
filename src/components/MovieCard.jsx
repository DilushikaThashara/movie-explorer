import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieCard = ({ movie, onFavoriteClick, isFavorite }) => {
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '250px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        background: '#fff',
        position: 'relative', 
      }}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', height: '350px', objectFit: 'cover' }}
        />
      </Link>

      
      <span
  style={{
    fontSize: '24px',
    cursor: 'pointer',
    color: isFavorite ? 'red' : 'gray',
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1
  }}
  onClick={() => onFavoriteClick(movie)}
>
  {isFavorite ? '❤️' : '🤍'}
</span>


      <div
        style={{
          padding: '10px',
          color: '#000',
        }}
      >
        <h4
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {movie.title}
        </h4>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#555',
            margin: 0,
          }}
        >
          {releaseYear}
        </p>
        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: 'bold',
            margin: 0,
            color: '#000',
          }}
        >
          Rating: {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
