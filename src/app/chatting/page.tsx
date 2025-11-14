"use client";

import { useState, useEffect } from "react";
import ChattingRoom from "@/component/ChattingRoom";
import ActivityCalendar from "@/component/ActivityCalendar";

interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_main_location: string | null;
  activities: any[];
  participations: any[];
  login_records: any[];
}

export default function ChattingPage() {
  const [isInChatRoom, setIsInChatRoom] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);

      if (!data.user) {
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const handleJoinStatusChange = (isJoined: boolean) => {
    setIsInChatRoom(isJoined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row h-full m-4">
      {/* 캘린더 - 채팅방 입장하지 않았을 때만 표시 */}
      {!isInChatRoom && (
        <div className="h-1/4 w-3/4 mx-auto lg:h-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 overflow-y-auto">
          <div className="bg-gray-50 p-2 rounded-lg mb-4">
            <h2 className="font-bold text-lg text-center">모임 캘린더</h2>
          </div>
          <ActivityCalendar
            activities={user.activities || []}
            participations={user.participations || []}
          />
        </div>
      )}

      {/* 채팅룸 */}
      <div
        className={`${
          isInChatRoom ? "w-full h-full" : "flex-1 lg:w-3/4"
        } overflow-hidden`}
      >
        <ChattingRoom onJoinStatusChange={handleJoinStatusChange} />
      </div>
    </div>
  );
}
