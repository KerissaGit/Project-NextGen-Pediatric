import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';

function Auth({ setParent }) {
  const [signup, setSignUp] = useState(true);

  // validation schema using yup
  const signupSchema = yup.object().shape({
    username: yup.string().min(5).max(15).required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(5).max(15).required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    children: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Child name is required'),
        age: yup
          .number()
          .min(0, 'Age must be between 0 and 18')
          .max(18, 'Age must be between 0 and 18')
          .required('Child age is required'),
      })
    ),
  });

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });


  // Form Initial Values

  const initialSignupValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    children: [{ name: '', age: '' }],
  };

  const initialLoginValues = {
    username: '',
    password: '',
  };


  // Toggle the form
  
  const toggleFormMode = () => {
    setSignUp(prev => !prev);
  };

 
  // Form submit handler

  const handleFormSubmit = (values) => {
    const endpoint = signup ? '/parent' : '/login';

    const payload = signup
  ? {
      username: values.username,
      email: values.email,
      password: values.password,
      children: values.children.map(child => ({
        name: child.name,
        age: parseInt(child.age, 10),
      })),
    }
  : {
      username: values.username,
      password: values.password,
    };




    console.log('Submitting form:', payload);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          response.json().then(parent => {
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

      <Button variant="text" onClick={toggleFormMode} sx={{ mb: 2 }}>
        {signup ? 'Already have an account? Login' : 'Need an account? Register'}
      </Button>
{/* dynamically rendering inputs */}
      <Formik
        enableReinitialize
        initialValues={signup ? initialSignupValues : initialLoginValues}
        validationSchema={signup ? signupSchema : loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              name="username"
              label="Username"
              fullWidth
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            {signup && (
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            )}

            <TextField
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
              <>
                <TextField
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                  helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                />

                <FieldArray name="children">
                  {({ push, remove }) => (
                    <>
                      {values.children.map((child, index) => (
                        <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mb: 1 }}>
                          <TextField
                            label="Child's Name"
                            name={`children[${index}].name`}
                            fullWidth
                            value={child.name}
                            onChange={handleChange}
                            // validation error message under the input if it exists.
                            error={
                              touched.children?.[index]?.name &&
                              Boolean(errors.children?.[index]?.name)  
                            }
                            helperText={
                              touched.children?.[index]?.name &&
                              errors.children?.[index]?.name
                            }
                          />

                          <TextField
                            label="Child's Age"
                            type="number"
                            name={`children[${index}].age`}
                            fullWidth
                            value={child.age}
                            onChange={handleChange}
                            // validation error message under the input if it exists.
                            error={
                              touched.children?.[index]?.age &&
                              Boolean(errors.children?.[index]?.age)
                            }
                            helperText={
                              touched.children?.[index]?.age &&
                              errors.children?.[index]?.age
                            }
                          />
                          {/* Can remove a child is needed */}
                          {values.children.length > 1 && (
                            <Button
                              onClick={() => remove(index)}
                              color="error"
                              sx={{ mt: 1 }}
                            >
                              Remove Child
                            </Button>
                          )}
                        </Box>
                      ))}

                      <Button
                        onClick={() => push({ name: '', age: '' })}
                        sx={{ mb: 2 }}
                      >
                        + Add Another Child
                      </Button>
                    </>
                  )}
                </FieldArray>
              </>
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
