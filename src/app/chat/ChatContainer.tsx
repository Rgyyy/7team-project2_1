"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
}

interface ChatContainerProps {
  userName: string;
}

export default function ChatContainer({ userName }: ChatContainerProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    // Socket.io 연결 초기화
    const socketInstance = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socketInstance.on("connect", () => {
      console.log("Socket 연결됨");
      setIsConnected(true);
      // 사용자 입장 알림
      socketInstance.emit("user-joined", userName);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket 연결 해제됨");
      setIsConnected(false);
    });

    socketInstance.on("new-message", (messageData: Message) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socketInstance.on("user-joined", (joinedUserName: string) => {
      if (joinedUserName !== userName) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            userName: "시스템",
            message: `${joinedUserName}님이 입장했습니다.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || !socket || !isConnected) {
      return;
    }

    const messageData = {
      userName,
      message: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit("send-message", messageData);
    setInputMessage("");
  };

  return (
    <>
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
            disabled={!inputMessage.trim() || !isConnected}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            전송
          </button>
        </form>
      </div>
    </>
  );
}
