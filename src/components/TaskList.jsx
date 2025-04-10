import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const TaskList = ({ tasks, handleToggleComplete, handleDelete, PriorityBadge }) => {
  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Your Tasks</h2>
      <div className="space-y-3">
        {taskList.length > 0 ? (
          taskList.map(task => (
            <div
              key={task?.id}
              className={`p-3 sm:p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all bg-white 
                ${task?.status === 'Completed' ? 'bg-gray-50' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`font-medium ${task?.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                      {task?.title}
                    </h3>
                    {PriorityBadge && <PriorityBadge priority={task?.priority} />}
                    
                    {/* Location and Weather Tags */}
                    <div className="flex items-center gap-2">
                      {task?.location && (
                        <span className={`text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1
                          ${task?.status === 'Completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span role="img" aria-label="location">📍</span>
                          {task.location}
                        </span>
                      )}
                      {task?.weather && (
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1
                          ${task?.status === 'Completed' 
                            ? 'bg-gray-50 text-gray-400' 
                            : 'bg-blue-50 text-blue-600'}`}>
                          <span role="img" aria-label="weather">🌤️</span>
                          {task.weather}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm ${task?.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task?.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added {task?.createdAt}
                    {task?.status === 'Completed' && ' • Completed'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Tooltip title={task?.status === 'Completed' ? 'Mark Incomplete' : 'Mark Complete'}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleComplete(task?.id)}
                      color={task?.status === 'Completed' ? 'success' : 'default'}
                    >
                      <CheckCircleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(task?.id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks yet. Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      priority: PropTypes.string,
      location: PropTypes.string,
      weather: PropTypes.string, // Add weather to PropTypes
      status: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  handleToggleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  PriorityBadge: PropTypes.func,
};

export default TaskList;