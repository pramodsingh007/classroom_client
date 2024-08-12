import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const StudentDashboard = () => {
  const [classmates, setClassmates] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    console.log(decoded._id);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/student/${decoded._id}/classroom`,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTimetable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/students/${
          decoded._id
        }/classmates`,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setClassmates(res.data.classmates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        margin={5}
        gutterBottom
        className="text-gray-800"
      >
        Student Dashboard
      </Typography>

      <div className="mb-8">
        <Typography variant="h6" gutterBottom>
          Classmates
        </Typography>
        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classmates.map((classmate, key) => (
                <TableRow key={key}>
                  <TableCell>{classmate.name}</TableCell>
                  <TableCell>{classmate.email}</TableCell>
                  <TableCell>{classmate.classroomName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      <div>
        <Typography variant="h6" gutterBottom>
          Timetable
        </Typography>
        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Time Start</TableCell>
                <TableCell>Time End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetable?.schedule?.map((entry, key) => (
                <TableRow key={key}>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell>{entry.timeStart}</TableCell>
                  <TableCell>{entry.timeEnd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Container>
  );
};

export default StudentDashboard;
