import React from 'react';

const PriorityBadge = ({ priority }) => {
  const colors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  const icons = {
    Low: '🟢',
    Medium: '🟡',
    High: '🔴'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[priority]}`}>
      {icons[priority]} {priority}
    </span>
  );
};

export default PriorityBadge;