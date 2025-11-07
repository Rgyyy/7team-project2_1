import { getUserName } from "@/actions/userAuth";
import { redirect } from "next/navigation";
import ChatContainer from "./ChatContainer";
import { call_login_records } from "@/actions/userCallProfile";

export default async function ChatPage() {
  // 서버에서 사용자 인증 확인
  const userName = await getUserName();
  const userData = await call_login_records();
  if (!userName) {
    redirect("/login");
  }

  const userActiveList = [
    ...(userData?.activities || []).map((activity: any) => activity.id),
    ...(userData?.participations || []).map(
      (participation: any) => participation.id
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg h-[80vh] flex flex-col">
          {/* 헤더 */}
          <div className="bg-purple-600 text-white p-4 rounded-t-lg">
            <h1 className="text-xl font-bold">실시간 채팅</h1>
            <p className="text-purple-200 text-sm">{userName}님으로 접속 중</p>
          </div>
          {/* 채팅 컨테이너 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatContainer
              userName={userName}
              userActiveList={userActiveList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
