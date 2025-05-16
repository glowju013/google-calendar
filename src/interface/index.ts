import { Dispatch, SetStateAction } from "react";

export interface ModalType {
    showModal?: boolean;
    date?: string;
    id?: number | null;
}

export interface DaysType {
    date: string;
    day: string;
    isToday: boolean;
    isThisWeek: boolean;
    isThisMonth: boolean;
    isSelected: boolean;
}

export interface CurrentDate {
    date: string;
    days: string[];
    month: string;
    weekDays: string[];
}

export interface RemoveModalProps {
    date: string;
    id: number;
}

export interface ModalProps {
    isShow?: boolean;
}

export interface HourProps {
    text?: string;
    hour?: number;
}

export interface MinuteProps extends HourProps {
    minute?: number;
}

export interface TimeProps extends HourProps {
    minute?: number;
}

export interface CalendarType {
    date: string;
    days: string[];
    month: string;
    weekDates: string[];
    startTime: TimeProps;
    endTime: TimeProps;
}

export interface HeaderProps {
    sideOpen: boolean;
    weekView: boolean;
    setSideOpen: Dispatch<SetStateAction<boolean>>;
    setWeekView: Dispatch<SetStateAction<boolean>>;
}

export interface EventType {
    title?: string;
    startAt: { hour: number; minute: number; text: string };
    endAt: { hour: number; minute: number; text: string };
    height: number;
    color: string;
}

export interface ShowModalProps {
    date?: string;
    id?: number | null;
}

export interface SideCalendarProps {
    isMain?: boolean;
    className?: string;
}











