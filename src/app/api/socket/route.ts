import { NextRequest, NextResponse } from "next/server";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
}

export async function GET(req: NextRequest) {
  if (!io) {
    // HTTP 서버에 Socket.io 서버 연결
    const httpServer: NetServer = (req as any).socket.server;
    
    io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("클라이언트 연결됨:", socket.id);

      // 사용자 입장 처리
      socket.on("user-joined", (userName: string) => {
        console.log(`${userName}님이 입장했습니다`);
        socket.broadcast.emit("user-joined", userName);
      });

      // 메시지 전송 처리
      socket.on("send-message", (messageData: Omit<Message, "id">) => {
        console.log("메시지 받음:", messageData);
        
        // 메시지 검증 (서버에서 안전성 확인)
        if (!messageData.userName || !messageData.message || !messageData.timestamp) {
          console.log("잘못된 메시지 형식");
          return;
        }

        // 메시지 길이 제한 (1000자)
        if (messageData.message.length > 1000) {
          console.log("메시지가 너무 깁니다");
          return;
        }

        const completeMessage: Message = {
          id: `${Date.now()}-${Math.random()}`,
          userName: messageData.userName,
          message: messageData.message.trim(),
          timestamp: new Date().toISOString(), // 서버에서 타임스탬프 재설정
        };

        // 모든 클라이언트에게 메시지 전송 (본인 포함)
        io?.emit("new-message", completeMessage);
      });

      socket.on("disconnect", () => {
        console.log("클라이언트 연결 해제됨:", socket.id);
      });
    });
  }

  return new NextResponse("Socket.io 서버가 초기화되었습니다", { status: 200 });
}