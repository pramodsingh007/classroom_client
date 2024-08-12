import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role.");
      return;
    }
    onLogin(email, password, role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper className="p-8 max-w-md w-full shadow-lg bg-white">
        <Typography variant="h5" gutterBottom className="mb-4 text-gray-800">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            className="mb-4"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            className="mb-4"
          />
          <FormControl
            fullWidth
            variant="outlined"
            className="mb-4"
            margin={"normal"}
          >
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Select Role"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="principal">Principal</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-600  text-white hover:bg-blue-700"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
