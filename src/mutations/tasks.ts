import { useMutation } from '@tanstack/react-query';
import { type TaskData } from '../types/task';
const apiUrl = import.meta.env.VITE_API_URL;

const createTask = async (taskData: TaskData) => {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return response.json();
  };


  export const createTaskMutation = ({
    onSuccess,
  }: {
    onSuccess: () => void;
  }) => {
    return useMutation({
      mutationFn: createTask,
      onSuccess,
    });
  };