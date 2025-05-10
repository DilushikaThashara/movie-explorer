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

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.username === username)) {
      setError('Username already exists.');
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setLoading(true);
    setTimeout(() => {
      setSuccess('Account created! Redirecting to login...');
      setLoading(false);
      setTimeout(() => navigate('/'), 1500);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://wallpaperaccess.com/full/317501.jpg)',
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
              🎬 Movie Explorer Sign Up
            </Typography>
            <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
              Create a new account to explore movies
            </Typography>
          </Box>

          <form onSubmit={handleRegister}>
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {success && <Alert severity="success">{success}</Alert>}

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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1, color: '#90caf9', textTransform: 'none' }}
                onClick={() => navigate('/')}
              >
                Already have an account? Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Register;
