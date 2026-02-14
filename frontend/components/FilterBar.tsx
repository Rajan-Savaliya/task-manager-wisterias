"use client";

interface FilterBarProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function FilterBar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="status-select"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
