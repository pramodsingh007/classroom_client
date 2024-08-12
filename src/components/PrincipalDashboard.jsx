import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import Timetable from "./Timetable";
import { Delete, Edit } from "@mui/icons-material";
import CreateNewStudent from "./CreateNewStudent";
import StudentCreationModal from "./CreateNewStudent";
import TeacherCreationModal from "./CreateNewTeacher";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/get-teachers`, {
        withCredentials: true,
        headers: {
          Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeachers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/get-students`, {
        withCredentials: true,
        headers: {
          Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/get-classrooms`, {
        withCredentials: true,
        headers: {
          Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setClassrooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const initialClassrooms = [];
  const [classrooms, setClassrooms] = useState(initialClassrooms);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCreateClassroomDialog, setOpenCreateClassroomDialog] =
    useState(false);
  const [editType, setEditType] = useState(""); // 'teacher' or 'student' or 'classroom'
  const [editData, setEditData] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // 'teacher' or 'student' or 'classroom'
  const [deleteId, setDeleteId] = useState(null);

  const [newClassroom, setNewClassroom] = useState({
    name: "",
    startTime: "",
    endTime: "",
    teacherName: "",
  });

  const handleEditOpen = (type, data) => {
    setEditType(type);
    setEditData(data);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditData(null);
  };

  const handleEditSave = () => {
    if (editType === "teacher") {
      console.log(editData);

      axios
        .put(
          `${import.meta.env.VITE_BASE_URL}/api/update-teacher/${editData._id}`,
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
          toast("teacher updated successfully!");
          setTeachers(
            teachers.map((teacher) =>
              teacher._id === editData._id ? editData : teacher
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (editType === "student") {
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

  const handleDeleteOpen = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteType === "teacher") {
      console.log(deleteId);
      axios
        .delete(
          `${import.meta.env.VITE_BASE_URL}/api/delete-teacher/${deleteId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast("teacher deleted successfully!");
          setTeachers(teachers.filter((teacher) => teacher._id !== deleteId));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (deleteType === "student") {
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
          toast("student deleted successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (deleteType === "classroom") {
      axios
        .delete(
          `${import.meta.env.VITE_BASE_URL}/api/delete-classroom/${deleteId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast("classroom deleted successfully!");
          setClassrooms(
            classrooms.filter((classroom) => classroom._id !== deleteId)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleDeleteClose();
  };

  const handleCreateClassroomOpen = () => {
    setOpenCreateClassroomDialog(true);
  };

  const handleCreateClassroomClose = () => {
    setOpenCreateClassroomDialog(false);
    setNewClassroom({
      name: "",
      startTime: "",
      endTime: "",
      teacherName: "",
    });
  };

  const handleCreateClassroomSave = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/classroom`, newClassroom, {
        withCredentials: true,
        headers: {
          Authorization: `BearerToken ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setClassrooms([...classrooms, newClassroom]);

        console.log(newClassroom);
        handleCreateClassroomClose();
        toast("Classroom created!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Use state management for the modals and saving logic
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);

  const handleStudentDialogOpen = () => setOpenStudentDialog(true);
  const handleTeacherDialogOpen = () => setOpenTeacherDialog(true);
  const handleStudentDialogClose = () => setOpenStudentDialog(false);
  const handleTeacherDialogClose = () => setOpenTeacherDialog(false);

  const handleStudentSave = (newStudent) => {
    const newEntry = {
      id: students.length + 1,
      ...newStudent,
      classroomName: newStudent.classroom,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
        ...newStudent,
        role: "student",
      })
      .then((res) => {
        console.log(res.data);
        setStudents([...students, newEntry]);
        toast("Student created");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleTeacherSave = async (newTeacher) => {
    const newEntry = {
      id: teachers.length + 1,
      ...newTeacher,
      classroomName: newTeacher.classroom,
    };

    //creating new teacher
    try {
      // Endpoint for login; adjust based on your API
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/signup`,
        {
          ...newEntry,
          role: "teacher",
        }
      );
      setTeachers([...teachers, newEntry]);
      // Assuming the response contains a token or session information
      console.log("Login successful:", response.data);

      toast("Teacher created!");

      // Handle successful login (e.g., store token, redirect)
      // localStorage.setItem("authToken", response.data.token); // Example token storage
      // Redirect or update UI as needed
      // navigator("/principal");
    } catch (error) {
      toast(error.message);
      console.error("Login failed:", error.response?.data || error.message);
      // Show error to the user
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Typography
        variant="h4"
        gutterBottom
        marginTop={5}
        className="text-gray-800 mt-5"
      >
        Principal Dashboard
      </Typography>

      {/* Teachers Table */}
      <div className="mb-8">
        <div className=" flex justify-between">
          <Typography variant="h6" gutterBottom>
            Teachers
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mb-4"
            onClick={() => {
              setOpenTeacherDialog(!openTeacherDialog);
            }}
          >
            Create New Teacher Account
          </Button>
        </div>
        <TeacherCreationModal
          open={openTeacherDialog}
          onClose={handleTeacherDialogClose}
          onSave={handleTeacherSave}
          classrooms={classrooms}
        />

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
              {teachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.classroomName}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => handleEditOpen("teacher", teacher)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteOpen("teacher", teacher._id)}
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

      {/* Students Table */}
      <div className="mb-8">
        <div className=" flex justify-between">
          <Typography variant="h6" gutterBottom>
            Students
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mb-4"
            onClick={() => {
              setOpenStudentDialog(!openStudentDialog);
            }}
          >
            Create New Student Account
          </Button>
        </div>
        <StudentCreationModal
          open={openStudentDialog}
          onClose={handleStudentDialogClose}
          onSave={handleStudentSave}
          classrooms={classrooms}
        />
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
        <div className=" flex justify-between">
          <Typography variant="h6" gutterBottom>
            Classrooms
          </Typography>
          {/* Button to create a new classroom */}
          <Button
            variant="contained"
            color="primary"
            className="mb-4"
            onClick={handleCreateClassroomOpen}
          >
            Create Classroom
          </Button>
        </div>
        <Paper className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classrooms.map((classroom) => (
                <TableRow key={classroom.name}>
                  <TableCell>{classroom.name}</TableCell>
                  <TableCell>{classroom.startTime}</TableCell>
                  <TableCell>{classroom.endTime}</TableCell>
                 

                  <TableCell>
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => handleEditOpen("classroom", classroom)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleDeleteOpen("classroom", classroom._id)
                      }
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

              <TextField
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
              </TextField>
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

      {/* Create Classroom Dialog */}
      <Dialog
        open={openCreateClassroomDialog}
        onClose={handleCreateClassroomClose}
      >
        <DialogTitle>Create Classroom</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Classroom Name"
            fullWidth
            variant="outlined"
            value={newClassroom.name}
            onChange={(e) =>
              setNewClassroom({ ...newClassroom, name: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Start Time"
            type="time"
            fullWidth
            variant="outlined"
            value={newClassroom.startTime}
            onChange={(e) =>
              setNewClassroom({ ...newClassroom, startTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="End Time"
            type="time"
            fullWidth
            variant="outlined"
            value={newClassroom.endTime}
            onChange={(e) =>
              setNewClassroom({ ...newClassroom, endTime: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClassroomClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateClassroomSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PrincipalDashboard;
