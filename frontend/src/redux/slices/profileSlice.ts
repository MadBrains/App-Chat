import { getProfileInfo, UserData } from 'src/api/user/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

interface ProfileState extends UserData {
  theme: 'light' | 'dark';
}

const initialState = { theme: 'light' } as ProfileState;

export const getProfile = createAsyncThunk('profile/get', (signal?: AxiosRequestConfig) =>
  getProfileInfo(signal).then(data => data)
);

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      return { ...state, ...(action?.payload || {}) };
    });
  }
});

export const { toggleTheme } = profile.actions;

export default profile.reducer;
