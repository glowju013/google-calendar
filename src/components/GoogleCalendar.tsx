import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import WeekCalendar from "./WeekCalendar";
const GoogleCalendar = () => {
    const [sideOpen, setSideOpen] = useState(true);
    const [weekView, setWeekView] = useState(true);
    const showModal = useSelector((state: RootState) => state.modal.showModal);
    const openModal = useSelector((state: RootState) => state.modal);

    return(
        <>
            <Header
                sideOpen={sideOpen}
                setSideOpen={setSideOpen}
                weekView={weekView}
                setWeekView={setWeekView}
            />
            
            <div
                className={`md:grid ${sideOpen ? "md:grid-cols-6" : "md:grid-cols-5"}`}
            >
                <div className={sideOpen ? "block" : "hidden"}>
                
                </div>
                {weekView ? <WeekCalendar /> : <MonthCalendar /> }
            </div>
        </>
    )
}

export default GoogleCalendar;