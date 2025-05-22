import './App.css'
import NewTask from './components/NewTask'
import TasksList from './components/TasksList'
import { Container, Paper, Box, Typography } from '@mui/material'

function App() {
  return (
    <Container sx={{ py: 4, width: '1200px' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Planner
        </Typography>
        <Box sx={{ mb: 7, width: '100%' }}>
          <NewTask />
        </Box>
        <TasksList />
      </Paper>
    </Container>
  )
}

export default App
