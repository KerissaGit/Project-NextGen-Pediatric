import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import Auth from './Auth';
// import Appointments from './Appointments';
import NewApptForm from './NewApptForm';

function PatientPortal() {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then(user => setParent(user))
      .catch(() => setParent(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Only fetch doctors if the parent is logged in
    if (parent) {
      fetch('/doctors')
        .then(res => res.json())
        .then(setDoctors);

      fetch('/appointments')
        .then(res => res.json())
        .then(setAppointments);
    }
  }, [parent]);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => {
      setParent(null);
      window.location.reload();
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
            Manage appointments:
          </Typography>

          {/* Import the NewAppForm */}
          <NewApptForm
            parent={parent} 
            doctors={doctors}
            setAppointments={setAppointments}
          />

          {/* Render current appointments */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Appointments:</Typography>
            {appointments.length > 0 ? (
              appointments.map(appt => (
                <Box key={appt.id} sx={{ border: '1px solid #ccc', p: 2, my: 1 }}>
                  <p><strong>Doctor:</strong> {appt.doctor_name}</p>
                  <p><strong>Start:</strong> {appt.start_time}</p>
                  <p><strong>End:</strong> {appt.end_time}</p>
                </Box>
              ))
            ) : (
              <p>No appointments yet.</p>
            )}
          </Box>

          <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
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