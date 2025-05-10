// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Avatar,
  CircularProgress,
  InputAdornment,
  Fade,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Fetch users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find the user from the localStorage users list
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://wallpaperaccess.com/full/317501.jpg)', // Background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        padding: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 420,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>
              🎬 Movie Explorer Login
            </Typography>
            <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
              Please enter your credentials to continue
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <Box mt={1} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#1976d2' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: '#fff' },
                  label: { color: '#ccc' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#fff' },
                    '&:hover fieldset': { borderColor: '#1976d2' },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#1976d2' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: '#fff' },
                  label: { color: '#ccc' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#fff' },
                    '&:hover fieldset': { borderColor: '#1976d2' },
                  },
                }}
              />
              {error && <Alert severity="error">{error}</Alert>}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  paddingY: 1.4,
                  fontWeight: 'bold',
                  borderRadius: 3,
                  fontSize: '1rem',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>

              {/* Sign Up Button */}
              <Button
                fullWidth
                sx={{ mt: 1, color: 'dark blue', textTransform: 'none' }}
                onClick={() => navigate('/register')}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Login;
