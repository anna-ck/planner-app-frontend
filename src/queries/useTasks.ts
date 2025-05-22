import { useQuery } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`);
  return response.json();
};

const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
};

export default useTasks;