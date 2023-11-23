import { createSlice } from '@reduxjs/toolkit';

export interface UserAuthData {
   userId: string;
   userName: string;
   token: string | null;
   expiration: null | number;
}

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userId: localStorage.getItem('userId') || '',
      userName: localStorage.getItem('userName') || '',
      token: localStorage.getItem('token') || null,
      expiration: localStorage.getItem('expiration') || null,
   } as UserAuthData,
   reducers: {
      setUser(state, { payload }) {
         state.userId = payload.userId;
         state.userName = payload.userName;
         state.token = payload.token;
         state.expiration = payload.expiration;

         // set local storage
         localStorage.setItem('userId', payload.userId);
         localStorage.setItem('userName', payload.userName);
         localStorage.setItem('token', payload.token);
         localStorage.setItem('expiration', payload.expiration);
      },
      logoutUser(state) {
         state.userId = '';
         state.userName = '';
         state.token = null;
         state.expiration = null;

         // remove local storage data
         localStorage.clear();
      },
   },
});

export const authActions = authSlice.actions;

export default authSlice;
