import { call_login_records } from "@/actions/userCallProfile";
export default async function Home() {
  const user = await call_login_records();
  return (
    <div>
      <div>
        <h2 className="border-b-1 border-gray-400 p-2">사용자 정보</h2>
        {user ? (
          <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
            <ul key="user_info_ul">
              <div className="flex items-center justify-between">
                <li key="user_info_li_name">이름: {user.user_name}</li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_name">아이디: {user.user_id}</li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_email">이메일: {user.user_email}</li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_location">
                  주 사용 지역: {user?.user_main_location || "없음"}
                </li>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg m-2">
                프로필 수정
              </button>
            </ul>
          </div>
        ) : (
          <p>사용자 정보가 없습니다.</p>
        )}
      </div>

      <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
        <h2 className="border-b-1 border-gray-400 p-2">최근 로그인 기록</h2>
        {user ? (
          <ul key="user_profile_ul">
            {user.login_records.map((record) => (
              <li key={`user_profile_li_${record.login_time.toString()}`}>
                {record.login_ip?.toString()}
                {" - "}
                {new Date(record.login_time).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p>로그인 기록이 없습니다.</p>
        )}
      </div>

      <div className="flex justify-center">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg m-4">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
