"use client";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          className="task-checkbox"
        />
        <span className={`task-title ${task.completed ? "strikethrough" : ""}`}>
          {task.title}
        </span>
      </div>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
