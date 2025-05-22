import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Paper,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Alert,
  Snackbar,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { createTaskMutation } from '../mutations/tasks';
import type { TaskData } from '../types/task';
import { RECURRENCE } from '../constants/task';
import useTasks from '../queries/useTasks';
const NewTask = () => {
  const [taskData, setTaskData] = useState<TaskData>({
    title: '',
    scheduledFor: new Date(),
    recurrence: RECURRENCE.NONE
  });

  const { refetch: refetchTasks } = useTasks();

  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = createTaskMutation({
    onSuccess: () => {
      setTaskData({
        title: '',
        scheduledFor: new Date(),
        recurrence: RECURRENCE.NONE,
      });
      setShowSuccess(true);
      refetchTasks();
    },
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData(prev => ({ ...prev, title: event.target.value }));
  };

  const handleDateTimeChange = (newValue: Date | null) => {
    if (newValue) {
      setTaskData(prev => ({ ...prev, scheduledFor: newValue }));
    }
  };

  const handleRecurrenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData(prev => ({ ...prev, recurrence: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(taskData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: 500, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add New Task
          </Typography>

          {mutation.isError && (
            <Alert severity="error">
              Failed to create task. Please try again.
            </Alert>
          )}

          <TextField
            fullWidth
            label="Task Title"
            value={taskData.title}
            onChange={handleTitleChange}
            required
            variant="outlined"
            disabled={mutation.isPending}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Schedule Date & Time"
              value={taskData.scheduledFor}
              onChange={handleDateTimeChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  disabled: mutation.isPending,
                },
              }}
            />
          </LocalizationProvider>

          <FormControl component="fieldset">
            <FormLabel component="legend">Recurrence</FormLabel>
            <RadioGroup
              value={taskData.recurrence}
              onChange={handleRecurrenceChange}
            >
              <FormControlLabel 
                value={RECURRENCE.NONE} 
                control={<Radio disabled={mutation.isPending} />} 
                label="One-time task" 
              />
              <FormControlLabel 
                value={RECURRENCE.DAILY} 
                control={<Radio disabled={mutation.isPending} />} 
                label="Every day" 
              />
              <FormControlLabel 
                value={RECURRENCE.WEEKLY} 
                control={<Radio disabled={mutation.isPending} />} 
                label="Every week" 
              />
              <FormControlLabel 
                value={RECURRENCE.MONTHLY} 
                control={<Radio disabled={mutation.isPending} />} 
                label="Every month" 
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!taskData.title || !taskData.scheduledFor || mutation.isPending}
            >
              {mutation.isPending ? 'Adding...' : 'Add Task'}
            </Button>
          </Box>
        </Stack>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Task created successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NewTask;
