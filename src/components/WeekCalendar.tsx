import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { dayHours, weekDays } from "../utils/date";
import { setDate, setEndTime, setStartTime } from "../store/calendar";
import moment from "moment";
import { EventType, HourProps }from "../interface";
import { setModalState, setOpenModal } from "../store/modal";
import clsx from "clsx";

const WeekCalendar = () => {
  const container = useRef<any>(null);
  const containerNav = useRef<any>(null);
  const containerOffset = useRef<any>(null);

  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const weekDates = useSelector((state: RootState) => state.calendar.weekDates);
  const dailyHours = useMemo(() => dayHours(), []);
  const weekEvents = useSelector((state: RootState) => state.event);

  const dispatch = useDispatch();

  // 날짜 선택 핸들러 함수 추출
  const handleDateSelect = (date: string) => {
    dispatch(setDate(moment(date).format("YYYY-MM-DD")));
  };

  // 이벤트 생성 핸들러 함수 추출
  const handleCreateEvent = (week: string, hour: number) => {
    dispatch(setModalState(true));
    dispatch(setDate(moment(week).format("YYYY-MM-DD")));
    dispatch(
      setStartTime(moment().set({ hour, minute: 0 }).toDate().toISOString())
    );
    dispatch(
      setEndTime(
        moment()
          .set({ hour: hour + 1, minute: 0 })
          .toDate()
          .toISOString()
      )
    );
  };

  const handleOpenEvent = (date: string, id: number) => {
    dispatch(setOpenModal({ date, id }));
  };

  const DateCell = ({ date, index }: { date: string; index: number }) => (
    <button
      onClick={() => handleDateSelect(date)}
      type="button"
      className="flex"
    >
      <div className="text-xs">{weekDays[index]}</div>
      <div
        className={clsx(
          "mt-1",
          selectedDate === date ? "rounded-full" : "font-semibold"
        )}
      >
        {moment(date).format("DD")}
      </div>
    </button>
  );

  const DateCellPC = ({ date, index }: { date: string; index: number }) => (
    <div
      onClick={() => handleDateSelect(date)}
      className="flex items-center justify-center py-3"
    >
      <span>
        <div className="text-center text-xs text-gray-500">
          {weekDays[index]}
        </div>
        <div
          className={clsx(
            "flex items-center justify-center",
            selectedDate === date
              ? "bg-blue-600 font-semibold text-white"
              : "font-semibold text-gray-500 cursor-pointer hover:bg-gray-100"
          )}
        >
          {moment(date).format("DD")}
        </div>
      </span>
    </div>
  );

  const EventItem = ({
    eventMemo,
    index,
    week,
  }: {
    eventMemo: EventType;
    index: number;
    week: string;
  }) => {
    const colorClass = eventMemo?.color
      ? `bg-${eventMemo.color}-300 hover:bg-${eventMemo.color}-400`
      : "bg-blue-300 hover:bg-blue-400";

    const topPosition = eventMemo?.startAt?.minute
      ? `${(eventMemo.startAt.minute / 60) * 100}%`
      : "0%";

    const heightValue = eventMemo?.height
      ? `${
          (eventMemo.height / 60) * 100 > 40
            ? (eventMemo.height / 60) * 100
            : 40
        }%`
      : "120%";

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEvent(week, index);
        }}
        className={`${colorClass} z-20 group absolute index-1 flex flex-col overflow-y-auto rounded-md text-xs leading-5 text-white`}
        style={{
          top: topPosition,
          height: heightValue,
          marginLeft: `${index * 5}%`,
        }}
      >
        <div className="inline-block align-middle font-semibold pl-2">
          {eventMemo.title}
        </div>
        <div className="inline-block align-middle font-semibold pl-2">
          {eventMemo?.startAt?.text} ~ {eventMemo?.endAt?.text}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col col-span-5">
      <div ref={container} className="flex flex-auto flex-col bg-white">
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <div className="col-end-1 w-14" />
              {weekDates?.map((date, index) => (
                <DateCell key={`week-${date}`} date={date} index={index} />
              ))}
            </div>
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDates?.map((date, index) => (
                <DateCellPC key={`week-${index}`} date={date} index={index} />
              ))}
            </div>
          </div>

          <div className="flex h-screen flex-auto overflow-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                className="col-start-1 col-end-2 row-start-1 grid"
                style={{
                  gridTemplateRows: "repeat(24, minmax(3.5rem, 1fr))",
                }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {dailyHours?.map((hour: HourProps) => (
                  <div key={hour.text}>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-[10px] leading-5 text-gray-500 h-14">
                      {hour.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-start-1 col-end-2 row-start-1 grid grid-cols-7 grid-rows-1">
                {weekDates?.map((week) => (
                  <div key={week}>
                    {dailyHours?.map((dailyHour: HourProps, index: number) => (
                      <div
                        key={`dailyhour-${index}`}
                        onClick={() => handleCreateEvent(week, dailyHour.hour)}
                        className={`col-start-${
                          index + 1
                        } h-14 text-xs text-gray-500 border-gray-200 border-l border-t relative cursor-pointer hover:bg-gray-50`}
                      >
                        {/* 등록한 일정 보이기 */}
                        {weekEvents[week]?.map(
                          (eventMemo: EventType, eventIndex: number) =>
                            dailyHour.hour === eventMemo.startAt?.hour ? (
                              <EventItem
                                key={`event-${eventIndex}`}
                                eventMemo={eventMemo}
                                index={eventIndex}
                                week={week}
                              />
                            ) : null
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
