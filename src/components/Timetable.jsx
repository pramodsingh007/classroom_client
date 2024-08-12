import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const Timetable = ({ timetableData, onUpdateTimetable }) => {
  const [timetable, setTimetable] = useState(timetableData);

  const handleChange = (day, period, value) => {
    setTimetable((prevTimetable) => ({
      ...prevTimetable,
      [day]: {
        ...prevTimetable[day],
        [period]: value,
      },
    }));
  };

  const handleSave = () => {
    onUpdateTimetable(timetable);
  };

  return (
    <div>
      {Object.keys(timetable).map((day) => (
        <div key={day}>
          <h4>{day}</h4>
          <Grid container spacing={2}>
            {Object.keys(timetable[day]).map((period) => (
              <Grid item xs={12} sm={6} key={period}>
                <TextField
                  label={period}
                  fullWidth
                  variant="outlined"
                  value={timetable[day][period] || ""}
                  onChange={(e) => handleChange(day, period, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        className="mt-4"
      >
        Save Timetable
      </Button>
    </div>
  );
};

export default Timetable;
