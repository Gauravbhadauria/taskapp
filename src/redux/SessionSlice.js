import {createSlice} from '@reduxjs/toolkit';

export const SessionSlice = createSlice({
  name: 'post',
  initialState: {
    isUserLoggedIn: false,
    data: null,
  },
  reducers: {
    userLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
    getUserDetails(state, action) {
      state.data = action.payload;
    },
  },
});

export const {userLoggedIn, getUserDetails} = SessionSlice.actions;
export default SessionSlice.reducer;
