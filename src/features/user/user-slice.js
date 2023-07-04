import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },

    removeUser: () => initialState,
  },

  // clear cached data with persistor.purge();
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

const authReducer = authSlice.reducer;

export const { setUser, removeUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export { authReducer };
