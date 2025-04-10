import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock credentials for demo
const MOCK_USER = {
  email: 'demo@example.com',
  password: 'demo123'
};

// Create async thunk for mock login
export const mockLogin = createAsyncThunk(
  'auth/mockLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        const userData = { email: MOCK_USER.email };
        return userData;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      return {
        ...initialState,
        user: null,
        isAuthenticated: false
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mockLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mockLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(mockLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('user');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;