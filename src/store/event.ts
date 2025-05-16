import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { EventType, RemoveModalProps } from "../interface";

const initialState: { [key: string]: Array<EventType> } = {
    "2025-05-16": [
        {
            title: "제목 입력",
            startAt: { hour: 15, minute: 51, text: "오후 3:51"},
            endAt: { hour: 16, minute: 51, text: "오후 4:51"},
            height: 100,
            color: "blue",
        },
    ],
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            // 해당 날짜에 메모가 없으면 빈 배열 생성
            if (!state[action.payload.date]) {
                state[action.payload.date] = [];
            }

            state[action.payload.date] = [
                ...state[action.payload.date],
                action.payload.data,
            ];
        },
        removeEvent: (state, action: PayloadAction<RemoveModalProps>) => {
            state[action.payload.date].splice(action.payload.id, 1);
        },
    },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export const events = (state: RootState) => state.event;
export default eventSlice.reducer;
