import { useRef } from "react";
import { setDate, setStartTime, setEndTime } from "../store/calendar";
import { weekDays, dayHours } from "../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import moment from "moment";
import { setModalState, setOpenModal } from "../store/modal";
import { EventType, HourProps} from "../interface";

const WeekCalendar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const containerNavRef = useRef<HTMLDivElement>(null);

    const selectedDate = useSelector((state: RootState) => state.calendar.date);
    const weekDates = useSelector((state: RootState) => state.calendar.weekDates);
    const dailyHours = dayHours();
    const weekEvents = useSelector((state: RootState) => state.event);

    const dispatch = useDispatch();

    const handleDateClick = (date: string) =>
   
};

export default WeekCalendar;