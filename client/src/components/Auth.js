import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

function Auth({ setParent }) {
  const [signup, setSignUp] = useState(true);

  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username too short!')
      .max(15, 'Username too long!')
      .required('Username is required'),
  
    password: yup
      .string()
      .min(5, 'Password too short!')
      .max(15, 'Password too long!')
      .required('Password is required'),
  
    passwordConfirmation: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });
  
  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  function toggleSignup() {
    setSignUp(prevSignup => !prevSignup);
  }

  const handleSubmit = (values) => {
    const endpoint = signup ? '/parent' : '/login';
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(parent => {
            // 🔐 Save user to localStorage for persistence
            localStorage.setItem('loggedInParent', JSON.stringify(parent));
            setParent(parent);
          });
        } else {
          console.error('Login/Register failed');
        }
      })
      .catch(err => console.error('Network error:', err));
  };
  

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {signup ? 'Register for an Account' : 'Login to Your Account'}
      </Typography>
      <Button variant="text" onClick={toggleSignup} sx={{ mb: 2 }}>
        {signup ? 'Already have an account? Login' : 'Need an account? Register'}
      </Button>

      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={signup ? signupSchema : loginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="username"
              name="username"
              label="Username"
              fullWidth
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            {signup && (
              <TextField
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                fullWidth
                value={values.passwordConfirmation}
                onChange={handleChange}
                error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            )}

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default Auth;
