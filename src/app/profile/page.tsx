import { call_login_records } from "@/actions/userCallProfile";
import Link from "next/link";

export default async function Home() {
  const user = await call_login_records();
  return (
    <div>
      <div>
        {user ? (
          <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
            <h2 className="border-b-1 border-gray-400 p-2 mb-2">사용자 정보</h2>
            <ul key="user_info_ul">
              <div className="flex items-center justify-between">
                <li key="user_info_li_name" className="mr-2">
                  이름: {user.user_name}
                </li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_id" className="mr-2">
                  아이디: {user.user_id}
                </li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_email" className="mr-2">
                  이메일: {user.user_email}
                </li>
              </div>
              <div className="flex items-center justify-between">
                <li key="user_info_li_location" className="mr-2">
                  주 사용 지역: {user?.user_main_location || "없음"}
                </li>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg mt-2">
                프로필 수정
              </button>
            </ul>
          </div>
        ) : (
          <p>사용자 정보가 없습니다.</p>
        )}
      </div>

      <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
        <h2 className="border-b-1 border-gray-400 p-2 mb-4">내가 만든 활동</h2>
        {user && user.activities.length > 0 ? (
          <ul key="user_activities_ul">
            {user.activities.map((activity) => (
              <li key={`user_activities_li_${activity.id}`} className="m-2">
                {activity.difficultyLevel === "초급" ? (
                  <div className="inline bg-blue-100 rounded-lg p-1 mr-2">
                    {activity.difficultyLevel}
                  </div>
                ) : activity.difficultyLevel === "중급" ? (
                  <div className="inline bg-yellow-100 rounded-lg p-1 mr-2">
                    {activity.difficultyLevel}
                  </div>
                ) : (
                  <div className="inline bg-red-100 rounded-lg p-1 mr-2">
                    {activity.difficultyLevel}
                  </div>
                )}

                <div className="bg-purple-100 rounded-lg p-1 inline mr-2">
                  {activity.participants} / {activity.maxParticipants}
                </div>

                <Link
                  href={`/activities/${activity.id}`}
                  className="hover:underline"
                >
                  {activity.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>활동이 없습니다.</p>
        )}
      </div>

      <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
        <h2 className="border-b-1 border-gray-400 p-2 mb-4">참여한 활동</h2>
        {user && user.participations.length > 0 ? (
          <ul key="user_participations_ul">
            {user.participations.map((participation) => (
              <li
                key={`user_participations_li_${participation.activity.id}`}
                className="m-2"
              >
                {participation.activity.difficultyLevel === "초급" ? (
                  <div className="inline bg-blue-100 rounded-lg p-1 mr-2">
                    {participation.activity.difficultyLevel}
                  </div>
                ) : participation.activity.difficultyLevel === "중급" ? (
                  <div className="inline bg-yellow-100 rounded-lg p-1 mr-2">
                    {participation.activity.difficultyLevel}
                  </div>
                ) : (
                  <div className="inline bg-red-100 rounded-lg p-1 mr-2">
                    {participation.activity.difficultyLevel}
                  </div>
                )}

                <div className="bg-purple-100 rounded-lg p-1 inline mr-2">
                  {participation.activity.participants} /{" "}
                  {participation.activity.maxParticipants}
                </div>

                <Link
                  href={`/activities/${participation.activity.id}`}
                  className="hover:underline"
                >
                  {participation.activity.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>참여한 활동이 없습니다.</p>
        )}
      </div>

      <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
        <h2 className="border-b-1 border-gray-400 p-2 mb-4">
          최근 로그인 기록
        </h2>
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
