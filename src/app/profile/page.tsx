import { call_login_records } from "@/actions/userCallProfile";
import Link from "next/link";
import DeleteUserButton from "@/component/DeleteUserButton";

export default async function Home() {
  const user = await call_login_records();
  return (
    <div>
      <div>
        {user ? (
          <div className="bg-white shadow-lg border border-gray-200 m-4 p-6 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                {user.user_name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  사용자 정보
                </h2>
                <p className="text-gray-500 text-sm">프로필 관리</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm font-semibold">
                    👤
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">이름</span>
                  <p className="font-semibold text-gray-800">
                    {user.user_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm font-semibold">
                    🆔
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">아이디</span>
                  <p className="font-semibold text-gray-800">{user.user_id}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-sm font-semibold">
                    📧
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">이메일</span>
                  <p className="font-semibold text-gray-800">
                    {user.user_email}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 text-sm font-semibold">
                    📍
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">주 사용 지역</span>
                  <p className="font-semibold text-gray-800">
                    {user?.user_main_location || "설정 안됨"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/profile/edit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center inline-block shadow-md hover:shadow-lg"
            >
              프로필 수정
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-lg border border-gray-200 m-4 p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">👤</span>
            </div>
            <p className="text-gray-600">사용자 정보가 없습니다.</p>
          </div>
        )}
      </div>

      <div className="border-2 border-gray-400 m-4 p-2 rounded-lg">
        <h2 className="border-b-1 border-gray-400 p-2 mb-4">내가 만든 활동</h2>
        {user && user.activities.length > 0 ? (
          <ul key="user_activities_ul">
            {user.activities.map((activity) => (
              <li
                key={`user_activities_li_${activity.id}`}
                className="m-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {/* 모임 날짜 - 가장 왼쪽 */}
                  <div className="bg-green-100 rounded-lg p-1 mr-2 text-sm">
                    {activity.date}
                  </div>

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
                </div>

                <div className="flex items-center">
                  {/* 참가비 */}
                  <div className="bg-red-100 rounded-lg p-1 mr-2 hidden sm:block">
                    비용: {activity.price.toLocaleString()}원
                  </div>

                  {/* 생성 날짜 - 가장 오른쪽 */}
                  <div className="bg-gray-100 rounded-lg p-1 text-xs">
                    생성:{" "}
                    {new Date(activity.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </div>
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
                className="m-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {/* 모임 날짜 - 가장 왼쪽 */}
                  <div className="bg-green-100 rounded-lg p-1 mr-2 text-sm">
                    {participation.activity.date}
                  </div>

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
                </div>

                <div className="flex items-center">
                  {/* 참가비 */}
                  <div className="bg-red-100 rounded-lg p-1 mr-2 hidden sm:block">
                    비용: {participation.activity.price.toLocaleString()}원
                  </div>

                  {/* 가입 날짜 - 가장 오른쪽 */}
                  <div className="bg-orange-100 rounded-lg p-1 text-xs">
                    가입:{" "}
                    {new Date(participation.createdAt).toLocaleDateString(
                      "ko-KR"
                    )}
                  </div>
                </div>
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

      <DeleteUserButton />
    </div>
  );
}
