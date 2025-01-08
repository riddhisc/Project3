import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import  loginUser  from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    dispatch(loginUser(userData))
      .unwrap()
      .then(() => navigate('/dashboard'));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;