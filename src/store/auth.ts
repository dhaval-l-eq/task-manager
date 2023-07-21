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
      userId: '',
      userName: '',
      token: null,
      expiration: null,
   } as UserAuthData,
   reducers: {
      setUser(state, { payload }) {
         state.userId = payload.userId;
         state.userName = payload.userName;
         state.token = payload.token;
         state.expiration = payload.expiration;
      },
      logoutUser(state) {
         state.userId = '';
         state.userName = '';
         state.token = null;
         state.expiration = null;
      },
   },
});

export const authActions = authSlice.actions;

export default authSlice;
