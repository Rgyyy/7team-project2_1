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

    // 사용자 입장 처리
    socket.on("user-joined", (userName) => {
      console.log(`${userName}님이 입장했습니다`);
      socket.broadcast.emit("user-joined", userName);
    });

    // 메시지 전송 처리
    socket.on("send-message", (messageData) => {
      console.log("메시지 받음:", messageData);

      // 메시지 검증 (서버에서 안전성 확인)
      if (
        !messageData.userName ||
        !messageData.message ||
        !messageData.timestamp
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

      // 모든 클라이언트에게 메시지 전송 (본인 포함)
      io.emit("new-message", completeMessage);
    });

    socket.on("disconnect", () => {
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
