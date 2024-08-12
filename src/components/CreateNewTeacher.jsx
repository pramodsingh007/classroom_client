/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

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

const TeacherCreationModal = ({ open, onClose, onSave, classrooms }) => {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    password: "",
    classroom: "",
  });

  const handleNewTeacherChange = (e) => {
    setNewTeacher({
      ...newTeacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(newTeacher);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Teacher</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={newTeacher.name}
              onChange={handleNewTeacherChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={newTeacher.email}
              onChange={handleNewTeacherChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={newTeacher.password}
              onChange={handleNewTeacherChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel>Classroom</InputLabel>
              <Select
                name="classroom"
                required
                value={newTeacher.classroom}
                onChange={handleNewTeacherChange}
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

export default TeacherCreationModal;
