import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";

const Navbar = ({ setMode, mode }) => {
  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };
  return (
    <AppBar position="static" className="bg-blue-600 shadow-lg">
      <Toolbar>
        <Typography variant="h6" className="flex-grow text-white">
          Classroom App
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/principal"
          className="text-white"
        >
          Principal
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/teacher"
          className="text-white"
        >
          Teacher
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/student"
          className="text-white"
        >
          Student
        </Button>
        <Switch
          checked={mode}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
