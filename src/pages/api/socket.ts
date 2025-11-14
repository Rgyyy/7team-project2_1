import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
export const config = {
  api: {
    bodyParser: false,
  },
};

// Socket.IO용 사용자 인증 함수 (userAuth.ts의 getUser + getUserName 로직 참고)
async function getUserFromSocket(cookieHeader: string | undefined) {
  try {
    if (!cookieHeader) return null;

    // 쿠키에서 토큰 추출
    const cookies = parseCookies(cookieHeader);
    const token = cookies.token;

    if (!token) {
      console.log("토큰이 없습니다.");
      return null;
    }

    // JWT 토큰 검증 (userAuth.ts의 getUser 로직과 동일)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // 사용자 이름 조회 (userAuth.ts의 getUserName 로직과 동일)
    const userData = await prisma.user_data.findUnique({
      where: { user_id: decoded.userId },
      select: { user_name: true },
    });

    return userData?.user_name || null;
  } catch (error) {
    console.error("Socket 사용자 인증 오류:", error);
    return null;
  }
}

// 쿠키에서 토큰 파싱 함수
function parseCookies(cookieHeader: string | undefined) {
  const cookies: { [key: string]: string } = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name && value) {
      cookies[name.trim()] = decodeURIComponent(value.trim());
    }
  });

  return cookies;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log("Socket.IO 서버 초기화 중...");

    const io = new Server((res.socket as any).server, {
      path: "/api/socket",
      addTrailingSlash: false,
      maxHttpBufferSize: 500 * 1024, // 500kB로 제한
    });

    io.on("connection", (socket) => {
      console.log("클라이언트 연결:", socket.id);

      socket.on("join-room", async ({ room }) => {
        let nickname;

        // 소켓 요청에서 쿠키를 통해 사용자 정보 가져오기
        const cookieHeader = socket.handshake.headers.cookie;

        // userAuth.ts와 동일한 로직으로 사용자 이름 조회
        const userName = await getUserFromSocket(cookieHeader);

        if (userName) {
          nickname = userName;
        } else {
          nickname = `게스트${new Date().getSeconds()}`;
          console.log("게스트 사용자");
        }

        socket.join(room);
        socket.data.nickname = nickname;
        socket.data.room = room;

        // 클라이언트에게 할당된 닉네임 전달
        socket.emit("nickname-assigned", { nickname });

        io.to(room).emit("user-joined", {
          nickname,
          message: `${nickname}님이 입장했습니다.`,
        });
      });

      // 재입장 이벤트 (재연결 시 사용)
      socket.on("rejoin-room", async ({ room, nickname }) => {
        let actualNickname = nickname;

        // 소켓 요청에서 쿠키를 통해 최신 사용자 정보 확인
        const cookieHeader = socket.handshake.headers.cookie;
        const userName = await getUserFromSocket(cookieHeader);

        // 최신 사용자 이름으로 업데이트
        if (userName) {
          actualNickname = userName;
        }

        socket.join(room);
        socket.data.nickname = actualNickname;
        socket.data.room = room;

        // 닉네임이 변경되었다면 클라이언트에 알림
        if (actualNickname !== nickname) {
          socket.emit("nickname-assigned", { nickname: actualNickname });
        }

        console.log(`${actualNickname}님이 방 ${room}에 재입장했습니다.`);
      });

      socket.on("send-message", ({ room, message }) => {
        io.to(room).emit("receive-message", {
          nickname: socket.data.nickname,
          message,
          timestamp: new Date().toISOString(),
        });
      });

      // 이미지 전송 이벤트 - 커스텀 이벤트 예시
      socket.on("send-image", ({ room, imageData }) => {
        io.to(room).emit("receive-image", {
          nickname: socket.data.nickname,
          imageData,
          timestamp: new Date().toISOString(),
        });
      });

      socket.on("leave-room", ({ room, nickname }) => {
        socket.leave(room);
        io.to(room).emit("user-left", {
          nickname,
          message: `${nickname}님이 퇴장했습니다.`,
        });
      });

      // 다른 커스텀 이벤트들도 자유롭게 추가 가능
      socket.on("typing", ({ room, nickname }) => {
        socket.to(room).emit("user-typing", { nickname });
      });

      socket.on("disconnect", () => {
        if (socket.data.room && socket.data.nickname) {
          io.to(socket.data.room).emit("user-left", {
            nickname: socket.data.nickname,
            message: `${socket.data.nickname}님이 퇴장했습니다.`,
          });
        }
        console.log("클라이언트 연결 해제:", socket.id);
      });
    });

    (res.socket as any).server.io = io;
  }
  res.end();
};

export default SocketHandler;
