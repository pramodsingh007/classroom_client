import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const StudentCreationModal = ({ open, onClose, onSave, classrooms }) => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    classroom: "",
  });

  const handleNewStudentChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(newStudent);
    onSave(newStudent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Student</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={newStudent.name}
              onChange={handleNewStudentChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={newStudent.email}
              onChange={handleNewStudentChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={newStudent.password}
              onChange={handleNewStudentChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Classroom</InputLabel>
              <Select
                name="classroom"
                value={newStudent.classroom}
                onChange={handleNewStudentChange}
                label="Classroom"
              >
                {classrooms.map((classroom) => (
                  <MenuItem key={classroom.id} value={classroom.name}>
                    {classroom.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCreationModal;
