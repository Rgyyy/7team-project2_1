const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("클라이언트 연결됨:", socket.id);

    // 모임방 입장 처리
    socket.on("join-room", (data) => {
      const { roomId, userName } = data;
      socket.join(roomId);
      socket.userName = userName;
      socket.currentRoom = roomId;

      console.log(`${userName}님이 모임 ${roomId} 채팅방에 입장했습니다`);

      // 같은 모임방의 다른 사용자들에게 입장 알림
      socket.to(roomId).emit("user-joined", { userName, roomId });
    });

    // 모임방 나가기 처리
    socket.on("leave-room", (roomId) => {
      if (socket.userName && roomId) {
        console.log(
          `${socket.userName}님이 모임 ${roomId} 채팅방에서 나갔습니다`
        );

        // 같은 모임방의 다른 사용자들에게 퇴장 알림
        socket.to(roomId).emit("user-left", {
          userName: socket.userName,
          roomId,
        });

        socket.leave(roomId);
        socket.currentRoom = null;
      }
    });

    // 메시지 전송 처리 (특정 모임방에만)
    socket.on("send-message", (messageData) => {
      console.log("메시지 받음:", messageData);

      // 메시지 검증 (서버에서 안전성 확인)
      if (
        !messageData.userName ||
        !messageData.message ||
        !messageData.timestamp ||
        !messageData.roomId
      ) {
        console.log("잘못된 메시지 형식");
        return;
      }

      // 메시지 길이 제한 (1000자)
      if (messageData.message.length > 1000) {
        console.log("메시지가 너무 깁니다");
        return;
      }

      const completeMessage = {
        id: `${Date.now()}-${Math.random()}`,
        userName: messageData.userName,
        message: messageData.message.trim(),
        timestamp: new Date().toISOString(), // 서버에서 타임스탬프 재설정
      };

      // 특정 모임방의 모든 클라이언트에게 메시지 전송 (본인 포함)
      io.to(messageData.roomId).emit("new-message", completeMessage);
    });

    socket.on("disconnect", () => {
      // 연결 해제 시 현재 참여 중인 방에서 나가기
      if (socket.userName && socket.currentRoom) {
        socket.to(socket.currentRoom).emit("user-left", {
          userName: socket.userName,
          roomId: socket.currentRoom,
        });
      }
      console.log("클라이언트 연결 해제됨:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
