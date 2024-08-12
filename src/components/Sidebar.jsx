import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" className="w-64">
      <List className="bg-gray-800 text-white h-full">
        <ListItem button component={Link} to="/principal/create-classroom" className="hover:bg-gray-700">
          <ListItemText primary="Create Classroom" />
        </ListItem>
        <ListItem button component={Link} to="/principal/assign-student" className="hover:bg-gray-700">
          <ListItemText primary="Assign Student" />
        </ListItem>
        <ListItem button component={Link} to="/teacher/timetable" className="hover:bg-gray-700">
          <ListItemText primary="Timetable" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
