import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import Auth from './Auth';
import NewApptForm from './NewApptForm';

function PatientPortal() {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ start_time: '', end_time: '' });

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
      setAppointments([]);
    });
  };

  const handleDelete = (id) => {
    fetch(`/appointments/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        setAppointments(prev => prev.filter(appt => appt.id !== id));
      }
    });
  };

  const startEditing = (appt) => {
    setEditingId(appt.id);
    setEditForm({
      start_time: appt.start_time.slice(0, 16),
      end_time: appt.end_time.slice(0, 16),
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  {/* Handle the PATCH for appointments */}
  const handleEditSubmit = (id) => {
    fetch(`/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(updated => {
        setAppointments(prev =>
          prev.map(appt => (appt.id === id ? { ...appt, ...updated } : appt))
        );
        setEditingId(null);
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

          <NewApptForm
            parent={parent}
            doctors={doctors}
            setAppointments={setAppointments}
          />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Appointments:</Typography>
            {appointments.length > 0 ? (
              appointments.map(appt => (
                <Box key={appt.id} sx={{ border: '1px solid #ccc', p: 2, my: 1 }}>
                  {/* edits to PATCH for appointments */}
                  {editingId === appt.id ? (
                    <Box>
                      <TextField
                        label="Start Time"
                        type="datetime-local"
                        name="start_time"
                        value={editForm.start_time}
                        onChange={handleEditChange}
                        sx={{ mr: 2 }}
                      />
                      <TextField
                        label="End Time"
                        type="datetime-local"
                        name="end_time"
                        value={editForm.end_time}
                        onChange={handleEditChange}
                      />
                      <Button onClick={() => handleEditSubmit(appt.id)} sx={{ ml: 2 }} variant="contained">
                        Save
                      </Button>
                      <Button onClick={() => setEditingId(null)} sx={{ ml: 1 }} variant="outlined" color="secondary">
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <p><strong>Doctor:</strong> {appt.doctor_name}</p>
                      <p><strong>Child:</strong> {appt.child_name}</p>
                      <p><strong>Start:</strong> {appt.start_time}</p>
                      <p><strong>End:</strong> {appt.end_time}</p>

                      <Button onClick={() => startEditing(appt)} size="small" sx={{ mr: 1 }} variant="outlined">
                        Edit
                      </Button>
                      {/* Handle the DELETE for appointments */}
                      <Button onClick={() => handleDelete(appt.id)} size="small" variant="outlined" color="error">
                        Delete
                      </Button>
                    </>
                  )}
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
