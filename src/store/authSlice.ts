import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: null | { name: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  console.log('checkAuth thunk running');
  const token = await AsyncStorage.getItem('token');
  if (token) {
    console.log('Token found in AsyncStorage');
    return { isAuthenticated: true, user: { name: 'User' } };
  }
  console.log('No token found in AsyncStorage');
  return { isAuthenticated: false, user: null };
});

export const login = createAsyncThunk('auth/login', async (user: { name: string }) => {
  console.log('login thunk running', user);
  await AsyncStorage.setItem('token', 'dummy-token');
  return { isAuthenticated: true, user };
});

export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('logout thunk running');
  await AsyncStorage.removeItem('token');
  return { isAuthenticated: false, user: null };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        console.log('checkAuth pending');
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ isAuthenticated: boolean; user: any }>) => {
        console.log('checkAuth fulfilled', action.payload);
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log('checkAuth rejected', action.error);
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        console.log('login pending');
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ isAuthenticated: boolean; user: any }>) => {
        console.log('login fulfilled', action.payload);
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login rejected', action.error);
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('logout fulfilled');
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('logout rejected', action.error);
        state.loading = false;
      });
  },
});

export default authSlice.reducer; 