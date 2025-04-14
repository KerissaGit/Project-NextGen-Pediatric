import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import Auth from './Auth';

function PatientPortal() {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on load. Need to make it work with backend.
  useEffect(() => {
    fetch('/me', {
      method: 'GET',
      credentials: 'include', // cookies, needs to work with the back end
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then(user => setParent(user))
      .catch(() => setParent(null))
      .finally(() => setLoading(false));
  }, []);

  // Log out
  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => {
      setParent(null);
      window.location.reload(); // Refresh the page after logout
    });
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {parent ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Welcome, {parent.username}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage appointments, update your info, and more.
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Auth setParent={setParent} />
      )}
    </Container>
  );
}

export default PatientPortal;
