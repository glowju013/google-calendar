import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
            
            <div>

            </div>
        </>
    )
}

export default GoogleCalendar;