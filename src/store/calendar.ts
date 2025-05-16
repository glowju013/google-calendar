import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonthDates, getWeekDates } from "../utils/date";
import moment from "moment";
import "moment/locale/ko";
import { CalendarType } from "../interface";

const initialState: CalendarType = {
    date: moment().format("YYYY-MM-DD"),
    days: getMonthDates(
        moment(moment().format("YYYY-MM-DD")).startOf("month").format("YYYY-MM-DD"),
        moment(moment().format("YYYY-MM-DD")).endOf("month").format("YYYY-MM-DD")
    ),
    month: moment().format("MM"),
    weekDates: getWeekDates(moment().format("YYYY-MM-DD")),
    startTime: {
        text: moment().format("LT"),
        hour: moment().hour(),
        minute: moment().minute(),
    },
    endTime: {
        text: moment().add(1,"hour").format("LT"),
        hour: moment().add(1, "hour").hour(),
        minute: moment().add(1,"hour").minute(),
    },
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            const selectDate = moment(action.payload).format("YYYY-MM-DD");
            state.date = selectDate;
            state.month = moment(selectDate).format("MM");
            state.days = getMonthDates(
                moment(selectDate).startOf("month").format("YYYY-MM-DD"),
                moment(selectDate).endOf("month").format("YYYY-MM-DD")
            );
            state.weekDates = getWeekDates(selectDate);
        },
        setStartTime: (state, action: PayloadAction<string | null>) => {
            state.startTime = {
                text: moment(action.payload).format("LT"),
                hour: moment(action.payload).hour(),
                minute: moment(action.payload).minute(),
            };

            state.endTime = {
                text: moment(action.payload).add(1, "hour").format("LT"),
                hour: moment(action.payload).add(1,"hour").hour(),
                minute: moment(action.payload).add(1,"hour").minute(),
            };
        },
        setEndTime: (state, action: PayloadAction<string | null>) => {
            state.endTime = {
                text: moment(action.payload).format("LT"),
                hour: moment(action.payload).hour(),
                minute: moment(action.payload).minute(),
            };
        },
    },
});

export const { setDate, setStartTime, setEndTime } = calendarSlice.actions;

export default calendarSlice.reducer;
