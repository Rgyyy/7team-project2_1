"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
}

interface UserActivity {
  id: string;
  title: string;
  type: "created" | "joined";
}

interface ChatContainerProps {
  userName: string;
  userActivities: UserActivity[];
}

export default function ChatContainer({
  userName,
  userActivities,
}: ChatContainerProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentRoomName, setCurrentRoomName] = useState<string>("");
  useEffect(() => {
    // Socket.io 연결 초기화
    const socketInstance = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socketInstance.on("connect", () => {
      console.log("Socket 연결됨");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket 연결 해제됨");
      setIsConnected(false);
    });

    socketInstance.on("new-message", (messageData: Message) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socketInstance.on(
      "user-joined",
      (data: { userName: string; roomId: string }) => {
        if (data.userName !== userName) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              userName: "시스템",
              message: `${data.userName}님이 입장했습니다.`,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      }
    );

    socketInstance.on(
      "user-left",
      (data: { userName: string; roomId: string }) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            userName: "시스템",
            message: `${data.userName}님이 나갔습니다.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || !socket || !isConnected || !selectedRoom) {
      return;
    }

    const messageData = {
      userName,
      message: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      roomId: selectedRoom,
    };

    socket.emit("send-message", messageData);
    setInputMessage("");
  };

  // Room 선택 함수
  const joinRoom = (roomId: string) => {
    if (!socket) return;

    // 이전 room에서 나가기
    if (selectedRoom) {
      socket.emit("leave-room", selectedRoom);
    }

    // 선택된 활동 정보 찾기
    const selectedActivity = userActivities.find(
      (activity) => activity.id === roomId
    );

    // 새 room에 입장
    socket.emit("join-room", { roomId, userName });
    setSelectedRoom(roomId);
    setCurrentRoomName(selectedActivity?.title || `모임 ${roomId}`);
    setMessages([]); // 메시지 초기화
  };

  return (
    <>
      {/* 모임 선택 영역 */}
      {!selectedRoom && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">참여 중인 모임 선택</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {userActivities.length > 0 ? (
              userActivities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => joinRoom(activity.id)}
                  className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-colors text-left"
                >
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {activity.type === "created"
                      ? "내가 만든 모임"
                      : "참여 중인 모임"}
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                참여 중인 모임이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 현재 선택된 모임 표시 */}
      {selectedRoom && (
        <div className="p-3 border-b border-gray-200 bg-purple-50 flex justify-between items-center">
          <div>
            <span className="font-semibold text-purple-800">
              {currentRoomName}
            </span>
            <span className="text-sm text-purple-600 ml-2">채팅방</span>
          </div>
          <button
            onClick={() => {
              if (socket && selectedRoom) {
                socket.emit("leave-room", selectedRoom);
              }
              setSelectedRoom(null);
              setCurrentRoomName("");
              setMessages([]);
            }}
            className="text-sm text-purple-600 hover:text-purple-800 underline"
          >
            나가기
          </button>
        </div>
      )}

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <> </>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.userName === userName ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.userName === userName
                    ? "bg-purple-600 text-white"
                    : msg.userName === "시스템"
                    ? "bg-gray-200 text-gray-600 text-center"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.userName !== userName && msg.userName !== "시스템" && (
                  <div className="text-xs font-semibold mb-1">
                    {msg.userName}
                  </div>
                )}
                <div className="text-sm">{msg.message}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.userName === userName
                      ? "text-purple-200"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div />
      </div>

      {/* 입력 영역 */}
      {selectedRoom && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs text-gray-500">
              {isConnected ? "연결됨" : "연결 끊어짐"}
            </span>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={!isConnected}
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || !isConnected || !selectedRoom}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              전송
            </button>
          </form>
        </div>
      )}

      {/* 모임이 선택되지 않았을 때 안내 메시지 */}
      {!selectedRoom && (
        <div className="border-t border-gray-200 p-4 text-center text-gray-500">
          채팅하려면 위에서 모임을 선택해주세요.
        </div>
      )}
    </>
  );
}
