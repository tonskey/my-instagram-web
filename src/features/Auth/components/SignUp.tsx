import { FormEvent, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material';

import { auth } from '@/firebase';
import { useAuth } from '@/features/Auth';

export const SignUp = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    if (email && password) {
      try {
        setLoading(false);
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '400px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <Typography component='h1' variant='h5'>
        Sign Up
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate={true}
        sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          required={true}
          fullWidth={true}
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus={true}
        />
        <TextField
          required={true}
          fullWidth={true}
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
        <Button disabled={loading} type='submit' fullWidth={true} variant='contained'>
          Sign Up
        </Button>
        <Link component={RouterLink} to='/login' variant='body2'>
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};
