import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: '',
  timeout: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { notification, timeout } = action.payload;

      state.notification = notification;
      state.timeout = timeout;
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
