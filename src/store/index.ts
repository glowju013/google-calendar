import { configureStore, ThunkAction, Action }from "@reduxjs/toolkit";
import modalReducer from "./modal";
import calendarReducer from "./calendar";
import eventReducer from "./event";

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        modal: modalReducer,
        event: eventReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
