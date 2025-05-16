import { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

import { Menu, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { HiMenu } from "react-icons/hi";
import { HeaderProps } from "../interface";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RootState } from "../store";
import { setDate } from "../store/calendar";
import { classNames } from "../utils/index";

const Header = ({
  sideOpen = true,
  setSideOpen,
  weekView = true,
  setWeekView,
}: HeaderProps) => {
  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const dispatch = useDispatch();

  // 날짜 변경 함수
  const changeDate = (type: "today" | "prev" | "next") => {
    switch (type) {
      case "today":
        dispatch(setDate(moment().format("YYYY-MM-DD")));
        break;
      case "prev":
        dispatch(
          setDate(
            weekView
              ? moment(selectedDate).subtract(1, "week").format("YYYY-MM-DD")
              : moment(selectedDate).subtract(1, "month").format("YYYY-MM-DD")
          )
        );
        break;
      case "next":
        dispatch(
          setDate(
            weekView
              ? moment(selectedDate).add(1, "week").format("YYYY-MM-DD")
              : moment(selectedDate).add(1, "month").format("YYYY-MM-DD")
          )
        );
        break;
    }
  };

  const ViewOptions = ({ isMobile = false }) => (
    <Menu as="div" className={isMobile ? "relative md:hidden" : "relative"}>
      <Menu.Button
        type="button"
        className={
          isMobile
            ? "-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover::text-gray-500"
            : "flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        }
        aria-label="달력 보기 옵션"
      >
        {isMobile ? (
          <>
            <span className="sr-only">메뉴 열기</span>
            <  EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </>
        ) : (
          <>
            {weekView ? "주" : "월"}
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transform ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {isMobile && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => changeDate("today")}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    오늘
                  </button>
                )}
              </Menu.Item>
            </div>
          )}
          <div className={isMobile ? "py-1 border-t border-gray-100" : "py-1"}>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setWeekView(true)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                >
                  주
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setWeekView(false)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                >
                  월
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
  
  return (
    <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
      <div className="flex items-center">
        <button
          type="button"
          className="text-xl mr-4 text-gray-600 hover:text-gray-300 rounded-full focus:outline-none focus:ring-2 focur:ring-gray-400"
          onClick={() => setSideOpen(!sideOpen)}
          aria-label={sideOpen ? "사이드바 닫기" : "사이드바 열기"}
        >
          <HiMenu className="h-5 w-5" />
        </button>
        <FcGoogle className="text-xl" aira-hidden="true" />
        <h1 className="hidden md:block lg:block text-xl font-normal text-gray-600 ml-2">
          캘린더
        </h1>
        {/* '오늘' 버튼 */}
        <button
          onClick={() => changeDate("today")}
          type="button"
          className="hidden md:block lg:block ml-16 items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          오늘
        </button>
        {/* 이전 주/월 버튼 */}
        <button
          type="button"
          className="ml-4 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => changeDate("prev")}
          aria-label={weekView ? "이전 주" : "이전 달"}
        >
          <ChevronLeftIcon
            className="h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className="ml-2 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => changeDate("next")}
          aria-label={weekView ? "다음 주" : "다음 달"}
        >
          <ChevronRightIcon
            className="h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </button>
        <h2 className="ml-6 flex-auto text-xl font-semibold text-gray-600">
          {moment(selectedDate).format("YYYY년 MM월")}
        </h2>
      </div>
      <div className="flex items-center">
        <div className="hidden md:ml-4 md:flex md:items-center">
          <ViewOptions />
          <div className="ml-6 h-6 w-px bg-gray-300" aria-hidden="true" />
        </div>
        <div className="ml-6 md:hidden">
          <ViewOptions isMobile={true} />
        </div>
      </div>
    </header>
  );
};

export default Header;
