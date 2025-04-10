import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mockLogin } from '../redux/slices/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(mockLogin({ email, password }));
    
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
          TaskFlow
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
          Sign in to manage your tasks
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Email/Username"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            placeholder="yourname@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={() => setRemember(!remember)} />}
              label="Remember me"
            />
            <Link href="#" underline="hover" fontSize="0.9rem">
              Forgot password?
            </Link>
          </Box>

          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            type="submit"
            disabled={loading}
            sx={{
              height: '48px',
              position: 'relative',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress 
                  size={20} 
                  sx={{ 
                    color: 'white'
                  }} 
                />
                <span>Signing in...</span>
              </Box>
            ) : (
              'Sign In'
            )}
          </Button>

          <Typography textAlign="center" mt={2} fontSize="0.9rem">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
