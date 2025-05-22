import useTasks from "../queries/useTasks";
import type { Task } from "../types/task";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { format } from 'date-fns';
import { STATUS, RECURRENCE } from '../constants/task';
import { useMemo } from "react";

type Status = typeof STATUS[keyof typeof STATUS];

const getStatusColor = (status: Status) => {
  switch (status.toLowerCase()) {
    case STATUS.COMPLETED:
      return 'success';
    case STATUS.ACTIVE:
      return 'warning';
    default:
      return 'default';
  }
};

const TasksList = () => {
  const { data, isLoading, error } = useTasks();

  const sortedTasks = useMemo(() => {
    return data?.sort((a: Task, b: Task) => new Date(b.scheduledFor).getTime() - new Date(a.createdAt).getTime());
  }, [data?.length]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          width="100%"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {error.message}
        </Alert>
      );
    }

    return (
      <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell width="30%">Title</TableCell>
            <TableCell width="15%">Status</TableCell>
            <TableCell width="20%">Scheduled For</TableCell>
            <TableCell width="15%">Recurrence</TableCell>
            <TableCell width="20%">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks?.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell sx={{ wordBreak: 'break-word' }}>{task.title}</TableCell>
              <TableCell>
                <Chip 
                  label={task.status} 
                  color={getStatusColor(task.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>{format(task.scheduledFor, 'PPp')}</TableCell>
              <TableCell>{task.recurrence || RECURRENCE.NONE}</TableCell>
              <TableCell>{format(task.createdAt, 'PPp')}</TableCell>
            </TableRow>
          ))}
          {(!sortedTasks || sortedTasks?.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No tasks found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      <TableContainer 
        component={Paper} 
        variant="outlined"
        sx={{ width: '100%' }}
      >
        {renderContent()}
      </TableContainer>
    </div>
  );
};

export default TasksList;
