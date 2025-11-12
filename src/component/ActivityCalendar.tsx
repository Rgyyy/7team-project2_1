"use client";

import { useState } from "react";
import Link from "next/link";

interface Activity {
  id: string;
  title: string;
  date: string;
  difficultyLevel: string;
  participants: number;
  maxParticipants: number;
  price: number;
}

interface ActivityCalendarProps {
  activities: Activity[];
  participations?: Array<{ activity: Activity }>;
  className?: string;
}

export default function ActivityCalendar({
  activities,
  participations = [],
  className = "",
}: ActivityCalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const prevMonth = new Date(currentYear, currentMonth - 1, 1);
  const thisMonth = new Date(currentYear, currentMonth, 1);
  const nextMonth = new Date(currentYear, currentMonth + 1, 1);

  // 모든 활동들을 합치기
  const allActivities = [
    ...activities,
    ...participations.map((p) => p.activity),
  ];

  // 날짜별 활동 매핑
  const getActivitiesForDate = (date: Date) => {
    // 타임존 문제 해결을 위해 로컬 날짜 사용
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    return allActivities.filter((activity) => activity.date === dateString);
  };

  // 월 이름 가져오기
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("ko-KR", { month: "long" });
  };

  // 해당 월의 날짜들 가져오기
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const days = [];

    // 빈 공간 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 실제 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  // 단일 캘린더 컴포넌트
  const Calendar = ({
    month,
    isCurrentMonth = false,
    isSmall = false,
  }: {
    month: Date;
    isCurrentMonth?: boolean;
    isSmall?: boolean;
  }) => {
    const days = getDaysInMonth(month);
    const monthName = getMonthName(month);

    return (
      <div
        className={`bg-white border border-gray-200 rounded-lg ${
          isSmall ? "p-2" : "p-3"
        } ${isCurrentMonth ? "shadow-md" : "shadow-sm"}`}
      >
        {/* 월 헤더 */}
        <h3
          className={`font-bold text-center mb-2 ${
            isCurrentMonth ? "text-sm text-blue-600" : "text-xs text-gray-700"
          }`}
        >
          {month.getFullYear()}년 {monthName}
        </h3>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className={`text-gray-500 text-center font-medium py-1 ${
                isSmall ? "text-xs" : "text-xs"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜들 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return (
                <div key={index} className={isSmall ? "h-5" : "h-6"}></div>
              );
            }

            const dayActivities = getActivitiesForDate(date);
            const hasActivities = dayActivities.length > 0;

            return (
              <div key={index} className="relative">
                {hasActivities ? (
                  <Link
                    href={`/activities/${dayActivities[0].id}`}
                    className={`
                      block w-full rounded text-center font-medium
                      transition-all duration-200 cursor-pointer flex items-center justify-center
                      ${isSmall ? "h-5 text-xs" : "h-6 text-xs"}
                      ${
                        isToday(date)
                          ? "bg-red-400 text-white ring-1 ring-blue-400 hover:bg-red-500"
                          : "bg-red-300 text-white hover:bg-red-400"
                      }
                    `}
                    title={`${dayActivities.map((a) => a.title).join(", ")}`}
                  >
                    {date.getDate()}
                  </Link>
                ) : (
                  <div
                    className={`
                      w-full rounded text-center
                      flex items-center justify-center
                      ${isSmall ? "h-5 text-xs" : "h-6 text-xs"}
                      ${
                        isToday(date)
                          ? "bg-blue-500 text-white font-bold"
                          : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                      }
                    `}
                  >
                    {date.getDate()}
                  </div>
                )}

                {/* 활동 개수 표시 */}
                {hasActivities && dayActivities.length > 1 && (
                  <div
                    className={`absolute -top-1 -right-1 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black ${
                      isSmall ? "text-xs w-3 h-3" : "text-xs w-3 h-3"
                    }`}
                  >
                    {dayActivities.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Calendar month={thisMonth} isCurrentMonth={true} />

      <div className="grid grid-cols-2 gap-2">
        <Calendar month={prevMonth} isSmall={true} />
        <Calendar month={nextMonth} isSmall={true} />
      </div>

      {/* 활동 범례 */}
      <div className="bg-gray-50 rounded-lg p-2">
        <div className="text-xs text-gray-600 flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-300 rounded mr-1"></div>
            <span>모임</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded mr-1"></div>
            <span>오늘</span>
          </div>
        </div>
      </div>
    </div>
  );
}
