import React, { useState, useEffect } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { getWeather, getWeatherByCoords } from '../services/weather';

// Import components
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import WeatherWidget from '../components/WeatherCo';
import StatCard from '../components/Statcard';
import PriorityBadge from '../components/PriorityBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // States
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    location: ''
  });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      toast.error('Failed to save tasks');
    }
  }, [tasks]);

  // Add authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Add or update this useEffect for current location weather
  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByCoords(latitude, longitude);
          
          if (weatherData) {
            setCurrentLocationWeather(weatherData);
          } else {
            toast.error("Couldn't fetch weather for your location");
          }
        } catch (error) {
          console.error("Error getting location:", error);
          toast.error("Please enable location access for weather updates");
        }
      } else {
        toast.error("Geolocation is not supported by your browser");
      }
    };

    getCurrentLocationWeather();
  }, []); // Run once on component mount

  // Handle form input changes
  const handleChange = (e) => {
    if (!e?.target) return;
    
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'location' && value) {
      fetchWeather(value);
    }
  };

  // Handle add task
  const handleAddTask = async () => {
    // Validate form data
    if (!formData?.title?.trim() || !formData?.description?.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTask = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
      weather: currentWeather ? 
        `${currentWeather.temperature}°C, ${currentWeather.description}` : 
        null
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    // Reset form with all fields
    setFormData({
      title: '',
      description: '',
      priority: 'Low',
      location: ''
    });
    setCurrentWeather(null);
    toast.success('Task added successfully! 🎉');
  };

  // Handle task actions
  const handleToggleComplete = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted');
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Logging out...');

    try {
      // Add artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear tasks and logout
      setTasks([]);
      dispatch(logout());

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Logged out successfully!');

      // Navigate after toast
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);

    } catch (error) {
      toast.error('Error logging out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Weather fetching
  const fetchWeather = async (location) => {
    const weatherData = await getWeather(location);
    setCurrentWeather(weatherData);
  };

  // Stats calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-6">
      <Toaster position="top-center" toastOptions={{ /* your toast options */ }} />
      
      <Header user={user} isLoggingOut={isLoggingOut} handleLogout={handleLogout} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TaskForm 
            formData={formData}
            handleChange={handleChange}
            handleAddTask={handleAddTask}
          />
          
          <WeatherWidget 
            currentLocationWeather={currentLocationWeather}
            currentWeather={currentWeather}
            formData={formData}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <StatCard title="Total Tasks" value={totalTasks} color="blue" />
            <StatCard title="Completed" value={completedTasks} color="green" />
            <StatCard title="Pending" value={pendingTasks} color="yellow" />
            <StatCard title="High Priority" value={highPriorityTasks} color="red" />
          </div>

          <TaskList 
            tasks={tasks}
            handleToggleComplete={handleToggleComplete}
            handleDelete={handleDelete}
            PriorityBadge={PriorityBadge}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;