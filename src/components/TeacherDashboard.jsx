import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Container,
  Grid,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const [teachers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      classroom: "Room 101",
    },
    // Add more teacher data here
  ]);

  const [classrooms, setClassrooms] = useState([]);

  const [timetables, setTimetables] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTimetableDialog, setOpenTimetableDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editType, setEditType] = useState("");
  const [editData, setEditData] = useState(null);
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditData(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/get-classrooms-by-teacher/${
          decoded._id
        }`,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setClassrooms(res.data);
        setTimetables(res.data[0]?.schedule);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditSave = () => {
    if (editType === "student") {
      axios
        .put(
          `${import.meta.env.VITE_BASE_URL}/api/update-student/${editData._id}`,
          editData,
          {
            withCredentials: true,
            headers: {
              Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast("student updated successfully!");
          setStudents(
            students.map((student) =>
              student._id === editData._id ? editData : student
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (editType === "classroom") {
      axios
        .put(
          `${import.meta.env.VITE_BASE_URL}/api/update-classroom/${
            editData._id
          }`,
          editData,
          {
            withCredentials: true,
            headers: {
              Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setClassrooms(
            classrooms.map((classroom) =>
              classroom._id === editData._id ? editData : classroom
            )
          );
          toast("classroom updated successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleEditClose();
  };

  const handleEditOpen = (type, data) => {
    setEditType(type);
    setEditData(data);
    setOpenEditDialog(true);
  };
  const [newTimetable, setNewTimetable] = useState({
    subject: "",
    timeStart: "",
    timeEnd: "",
    day: "",
  });

  // Handle opening and closing of dialogs
  const handleEditStudentOpen = (student) => {
    setSelectedStudent(student);
    setOpenStudentDialog(true);
  };

  const handleStudentDialogClose = () => {
    setOpenStudentDialog(false);
    setSelectedStudent(null);
  };

  const handleStudentSave = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedStudent.id ? selectedStudent : student
      )
    );
    handleStudentDialogClose();
  };

  const handleDeleteOpen = (deleteType, id) => {
    console.log(id);
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = () => {
    console.log(deleteId);

    axios
      .delete(
        `${import.meta.env.VITE_BASE_URL}/api/delete-student/${deleteId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setStudents(students.filter((student) => student._id !== deleteId));
        handleDeleteClose();

        toast("student deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTimetableDialogOpen = () => {
    setOpenTimetableDialog(true);
  };

  const handleTimetableDialogClose = () => {
    setOpenTimetableDialog(false);
    setNewTimetable({
      subject: "",
      timeStart: "",
      timeEnd: "",
      day: "",
    });
  };

  const handleTimetableSave = () => {
    const newEntry = {
      id: timetables.length + 1,
      ...newTimetable,
    };

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/classroom/${
          classrooms[0]._id
        }/timetable`,
        newEntry,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTimetables([...timetables, newEntry]);
        console.log(newEntry);
        handleTimetableDialogClose();

        toast("Timetable created!");
      })
      .catch((e) => {
        setError("TimeTable out of times");
        console.log(e);
      });
  };

  const handleNewTimetableChange = (e) => {
    console.log(e.target.value);
    setNewTimetable({
      ...newTimetable,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    console.log(decoded._id);
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/api/get-students-by-teacher/${
          decoded._id
        }`,
        {
          withCredentials: true,
          headers: {
            Authorization: `BearerToken ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={5}>
        Teacher Dashboard
      </Typography>

      {/* Students Table */}
      <div className="mb-8">
        <Typography variant="h6" gutterBottom>
          Students
        </Typography>

        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Classroom</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.classroomName}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen("student", student)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteOpen("student", student._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Classrooms Table */}
      <div className="mb-8">
        <Typography variant="h6" gutterBottom>
          Classrooms
        </Typography>
        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Time Start</TableCell>
                <TableCell>Time End</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classrooms.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell>{classroom.name}</TableCell>
                  <TableCell>{classroom.day}</TableCell>
                  <TableCell>{classroom.startTime}</TableCell>
                  <TableCell>{classroom.endTime}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleTimetableDialogOpen}
                    >
                      Create Timetable
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Timetables Table */}
      <div className="mb-8">
        <Typography variant="h6" gutterBottom>
          Timetables
        </Typography>
        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Time Start</TableCell>
                <TableCell>Time End</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetables.map((sch) => (
                <TableRow key={sch._id}>
                  <TableCell>{sch.subject}</TableCell>
                  <TableCell>{sch.timeStart}</TableCell>
                  <TableCell>{sch.timeEnd}</TableCell>
                  <TableCell>{sch.day}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Timetable Creation Dialog */}
      <Dialog open={openTimetableDialog} onClose={handleTimetableDialogClose}>
        <DialogTitle>Create New Timetable</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                variant="outlined"
                value={newTimetable.subject}
                onChange={handleNewTimetableChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Start Time"
                type="time"
                name="timeStart"
                fullWidth
                variant="outlined"
                value={newTimetable.timeStart}
                onChange={handleNewTimetableChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Time End"
                name="timeEnd"
                type="time"
                fullWidth
                variant="outlined"
                value={newTimetable.timeEnd}
                onChange={handleNewTimetableChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Day"
                name="day"
                fullWidth
                select
                variant="outlined"
                value={newTimetable.day}
                onChange={handleNewTimetableChange}
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day,key) => (
                  <MenuItem key={key} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
              {error && <p className="text-red-500 font-medium">{error}</p>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTimetableDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTimetableSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={openStudentDialog} onClose={handleStudentDialogClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={selectedStudent?.name || ""}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={selectedStudent?.email || ""}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Classroom"
            value={selectedStudent?.classroom || ""}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                classroom: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudentDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStudentSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this student?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>
          {`Edit ${editType.charAt(0).toUpperCase() + editType.slice(1)}`}
        </DialogTitle>
        <DialogContent>
          {editType === "classroom" ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Classroom Name"
                fullWidth
                variant="outlined"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                value={editData?.startTime || ""}
                onChange={(e) =>
                  setEditData({ ...editData, startTime: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                value={editData?.endTime || ""}
                onChange={(e) =>
                  setEditData({ ...editData, endTime: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Teacher"
                fullWidth
                select
                variant="outlined"
                value={editData?.teacherName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, teacherName: e.target.value })
                }
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                fullWidth
                variant="outlined"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                value={editData?.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />

              {/* <TextField
                margin="dense"
                label="Classroom"
                fullWidth
                select
                variant="outlined"
                value={editData?.classroomName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, classroomName: e.target.value })
                }
              >
                {classrooms.map((classroom) => (
                  <MenuItem key={classroom._id} value={classroom.name}>
                    {classroom.name}
                  </MenuItem>
                ))}
              </TextField> */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to delete this ${
            deleteType === "teacher"
              ? "teacher"
              : deleteType === "student"
              ? "student"
              : "classroom"
          }?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  );
};

export default TeacherDashboard;
