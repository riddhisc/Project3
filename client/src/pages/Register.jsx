// src/pages/Register.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert 
} from '@mui/material';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'user' // You can add role selection if needed
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;