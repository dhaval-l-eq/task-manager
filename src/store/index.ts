import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./tasks";
import authSlice from "./auth";

const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
        auth: authSlice.reducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>