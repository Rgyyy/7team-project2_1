"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import { call_login_records } from "@/actions/userCallProfile";

interface Message {
  nickname: string;
  message?: string;
  imageData?: string;
  timestamp: string;
  type: "text" | "image";
}

interface Activity {
  id: string;
  title: string;
  difficultyLevel: string;
  participants: number;
  maxParticipants: number;
  price?: number;
  date?: string;
  createdAt?: string;
  role: "organizer" | "participant";
}

interface ChattingRoomProps {
  onJoinStatusChange?: (isJoined: boolean) => void;
}

export default function ChattingRoom({
  onJoinStatusChange,
}: ChattingRoomProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef("");
  const isJoinedRef = useRef(false);

  // 사용자가 참여한 모임 목록 가져오기
  const fetchUserActivities = async () => {
    try {
      setLoading(true);
      const userData = await call_login_records();

      if (!userData) {
        setError("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      // 사용자가 만든 활동들과 참여한 활동들을 합치기
      const createdActivities = userData.activities.map((activity) => ({
        ...activity,
        createdAt: activity.createdAt.toISOString(),
        role: "organizer" as const,
      }));

      const participatedActivities = userData.participations.map((p) => ({
        ...p.activity,
        createdAt: p.activity.createdAt.toISOString(),
        role: "participant" as const,
      }));

      // 모든 활동 합치기 및 중복 제거
      const allActivities = [...createdActivities, ...participatedActivities];
      const uniqueActivities = allActivities.reduce((acc, activity) => {
        const existing = acc.find((a) => a.id === activity.id);
        if (!existing) {
          acc.push(activity);
        } else if (
          activity.role === "organizer" &&
          existing.role === "participant"
        ) {
          // 주최자 역할로 덮어쓰기
          const index = acc.findIndex((a) => a.id === activity.id);
          acc[index] = activity;
        }
        return acc;
      }, [] as Activity[]);

      setActivities(uniqueActivities);
      setError(null);
    } catch (err) {
      console.error("모임 목록 조회 오류:", err);
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  useEffect(() => {
    fetch("/api/socket");
    const socketInstance = io({
      path: "/api/socket",
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    // 서버에서 할당한 닉네임 받기
    socketInstance.on("nickname-assigned", (data) => {
      setNickname(data.nickname);
      localStorage.setItem("chat-nickname", data.nickname);
    });

    // 재연결 시 닉네임 복구 및 방 재입장
    socketInstance.on("connect", () => {
      const savedNickname = localStorage.getItem("chat-nickname");
      const savedRoom = roomRef.current;

      if (isJoinedRef.current && savedRoom) {
        socketInstance.emit("rejoin-room", {
          room: savedRoom,
          nickname: savedNickname,
        });
      }
    });

    // 연결 끊김 알림
    socketInstance.on("disconnect", (reason) => {
      console.log("연결 끊김:", reason);
      setMessages((prev) => [
        ...prev,
        {
          nickname: "System",
          message: "연결이 끊어졌습니다. 재연결 중...",
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    });

    // 재연결 성공 알림
    socketInstance.on("reconnect", (attemptNumber) => {
      console.log("재연결 성공:", attemptNumber);
      setMessages((prev) => [
        ...prev,
        {
          nickname: "System",
          message: "연결이 복구되었습니다.",
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    });

    socketInstance.on("user-joined", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          nickname: "System",
          message: data.message,
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    });

    socketInstance.on("receive-message", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "text" }]);
    });

    // 이미지 수신 이벤트
    socketInstance.on("receive-image", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "image" }]);
    });

    socketInstance.on("user-left", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          nickname: "System",
          message: data.message,
          timestamp: new Date().toISOString(),
          type: "text",
        },
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    // 메시지 컨테이너가 있을 때만 스크롤
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // 컨테이너의 맨 아래로 스크롤
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleJoinRoom = (activity: Activity) => {
    if (socket && activity) {
      const roomName = activity.title; // 모임 이름을 채팅방 이름으로 사용
      setRoom(roomName);
      setSelectedActivity(activity);
      socket.emit("join-room", { room: roomName });
      setIsJoined(true);
      roomRef.current = roomName;
      isJoinedRef.current = true;
      onJoinStatusChange?.(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && message.trim()) {
      socket.emit("send-message", { room, message });
      setMessage("");
    }
  };

  // 이미지 전송 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && socket) {
      // 파일 크기 체크 (500KB 제한)
      const maxSize = 500 * 1024; // 500KB
      if (file.size > maxSize) {
        alert("파일 크기는 500KB를 초과할 수 없습니다.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        socket.emit("send-image", { room, imageData });
        // 파일 선택 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isJoined) {
    if (loading) {
      return (
        <div className="m-4 p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">채팅방 목록</h1>
          <p>모임 목록을 불러오는 중...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="m-4 p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">채팅방 목록</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={fetchUserActivities}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return (
      <div className="m-4 p-4">
        <h1 className="text-2xl font-bold mb-6">참여한 모임의 채팅방</h1>

        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">참여한 모임이 없습니다.</p>
            <Link
              href="/activities"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              모임 둘러보기
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/activities/${activity.id}`}
                  className="block cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                      {activity.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        activity.role === "organizer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {activity.role === "organizer" ? "주최자" : "참여자"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    난이도: {activity.difficultyLevel}
                    {activity.price !== undefined &&
                      activity.price !== null && (
                        <span className="ml-2">
                          • 참가비:{" "}
                          {activity.price === 0
                            ? "무료"
                            : `${activity.price.toLocaleString()}원`}
                        </span>
                      )}
                  </p>
                </Link>

                <div className="mt-3 text-right">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleJoinRoom(activity);
                    }}
                  >
                    채팅방 입장
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const handleLeaveRoom = () => {
    if (socket && room) {
      socket.emit("leave-room", { room });
      setIsJoined(false);
      setRoom("");
      setSelectedActivity(null);
      setMessages([]);
      roomRef.current = "";
      isJoinedRef.current = false;
      onJoinStatusChange?.(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* 헤더 - 고정 */}
      <div className="flex-shrink-0 bg-gray-100 p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">채팅방: {room}</h1>
            <p className="text-sm text-gray-600">닉네임: {nickname}</p>
            {selectedActivity && (
              <p className="text-xs text-gray-500">
                {selectedActivity.role === "organizer" ? "주최자" : "참여자"} |{" "}
                난이도: {selectedActivity.difficultyLevel} |{" "}
                {selectedActivity.participants}/
                {selectedActivity.maxParticipants}명
              </p>
            )}
          </div>
          <button
            onClick={handleLeaveRoom}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            나가기
          </button>
        </div>
      </div>

      {/* 메시지 영역 - 스크롤 가능 */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.nickname === "System"
                ? "bg-gray-100 mx-auto text-center text-sm text-gray-600"
                : nickname === msg.nickname
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.nickname !== "System" && (
              <div className="text-xs opacity-70 mb-1">{msg.nickname}</div>
            )}
            {msg.type === "text" && (
              <div className="break-words">{msg.message}</div>
            )}
            {msg.type === "image" && (
              <img
                src={msg.imageData}
                alt="shared"
                className="max-w-full rounded"
              />
            )}
            <div className="text-xs opacity-70 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString("ko-KR")}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 - 고정 */}
      <div className="flex-shrink-0 bg-gray-50 p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            전송
          </button>
        </form>

        <div className="mt-2">
          <label className="cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="inline-flex items-center px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-medium rounded-md">
              📷 이미지 첨부
            </span>
          </label>
          <span className="text-xs text-gray-500 ml-2">최대 500KB</span>
        </div>
      </div>
    </div>
  );
}
