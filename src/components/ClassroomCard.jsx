import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ClassroomCard = ({ classroom }) => {
  return (
    <Card className="m-4 bg-white shadow-lg">
      <CardContent>
        <Typography variant="h5" className="text-gray-800">
          {classroom.name}
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Teacher: {classroom.teacher.name}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Students: {classroom.students.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassroomCard;
