"use client";

import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
