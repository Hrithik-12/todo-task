import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const TaskForm = ({ formData, handleChange, handleAddTask }) => {
  // Default form data to prevent undefined errors
  const defaultFormData = {
    title: '',
    description: '',
    priority: 'Low',
    location: ''
  };

  // Use formData with fallback to defaults
  const data = formData || defaultFormData;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <AddIcon className="text-blue-500" />
        Add New Task
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Task details"
          rows="3"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <select
          name="priority"
          value={data.priority}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="Low">🟢 Low Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="High">🔴 High Priority</option>
        </select>
        <input
          type="text"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="📍 Location (optional)"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleAddTask}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    location: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired
};

TaskForm.defaultProps = {
  formData: {
    title: '',
    description: '',
    priority: 'Low',
    location: ''
  }
};

export default TaskForm;