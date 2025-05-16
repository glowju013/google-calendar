import moment from "moment";
import { HourProps, MinuteProps } from "../interface";

export const weekDays = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const dayHours = (): HourProps[] => {
    return Array.from({ length: 24}, (_, i) => {
        const period = i < 12 ? "오전" : "오후";
        const displayHour = i === 0 ? 12 : i === 12 ? 12 : i % 12;
        return { text: `${period} ${displayHour}시`, hour: i };
    });
};

export const dayMinutes = (): MinuteProps[] => {
  const hours: HourProps[] = dayHours();
  const minutes: MinuteProps[] = [];
  const min = ["00", "15", "30", "45"];
  
  hours.forEach((hour) => {
    min.forEach((val) => {
        minutes.push({
            hour:hour.hour,
            minute: parseInt(val),
            text: `${hour.text}:${val}`,
        });
    });
  });
  return minutes;
};

// 선택된 현재 날짜 기준 해당 월 날짜들 가져오기
export const getMonthDates = (startDate: string, endDate: string): string[] => {
    const prevDates = getPrevDaysInMonth(startDate);
    const currentDates = getDaysInMonth(startDate);
    const nextDates = getNextDaysInMonth(endDate);

    return [...prevDates, ...currentDates, ...nextDates];
};

export const getDaysInMonth = (startDate: string): string[] => {
  const date = moment(startDate);
  const daysInMonth = date.daysInMonth();

  return Array.from({ length: daysInMonth }, (_, i) => {
    return moment(startDate)
      .date(i + 1)
      .format("YYYY-MM-DD");
  });
};

export const getPrevDaysInMonth = (startDate: string): string[] => {
    const firstDay = moment(startDate).startOf('month');
    const dayOfWeek = firstDay.days();

    if (dayOfWeek === 0) return [];
    
    return Array.from({ length: dayOfWeek }, (_, i) => {
        return moment(firstDay).subtract(dayOfWeek - i, "days").format("YYYY-MM-DD");
    });
};

export const getNextDaysInMonth = (endDate: string): string[] => {
    const lastDay = moment(endDate).endOf('month');
    const dayOfWeek = lastDay.days();

    if (dayOfWeek === 6) return [];

    const daysToAdd = 6 - dayOfWeek;

    return Array.from({ length: daysToAdd }, (_, i) => {
       return moment(lastDay).add(i+1, "days").format("YYYY-MM-DD"); 
    });
};

export const getWeekDates = (date: string): string[] => {
    const weekStart = moment(date).startOf("week");

    return Array.from( {length: 7}, (_, i) => {
        return moment(weekStart).add(i, "days").format("YYYY-MM-DD");
    });
};



