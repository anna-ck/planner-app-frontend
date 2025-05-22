export interface TaskData {
    title: string;
    scheduledFor: Date;
    recurrence: string;
  }
  

export interface Task extends TaskData {
    id: string;
    title: string;
    status: string;
    scheduledFor: Date;
    recurrence: string;
    createdAt: Date;
}