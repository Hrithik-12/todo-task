import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ user, isLoggingOut, handleLogout }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 bg-white rounded-lg shadow-sm p-4 space-y-3 sm:space-y-0">
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
          <Link to="/">TaskFlow</Link>
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{user.email}</span>
            <div className="h-2 w-2 rounded-full bg-green-500" title="Online"></div>
          </div>
        )}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full sm:w-auto px-4 py-2 text-sm font-medium 
            ${isLoggingOut
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'text-red-600 hover:bg-red-50'} 
            rounded-lg transition-colors`}
          aria-label={isLoggingOut ? 'Logging out' : 'Logout'}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  isLoggingOut: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLoggingOut: false,
};

export default Header;