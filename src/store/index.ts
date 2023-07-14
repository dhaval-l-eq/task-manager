import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./tasks";

const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>