import { call_login_records } from "@/actions/userCallProfile";
import Link from "next/link";
import DeleteUserButton from "@/component/DeleteUserButton";
import ActivityCalendar from "@/component/ActivityCalendar";

export default async function Home() {
  const user = await call_login_records();
  return (
    <div className="p-4">
      {user ? (
        <div className="space-y-6">
          {/* 사용자 정보 카드 */}
          <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                      <p className="font-semibold text-gray-800">
                        {user.user_id}
                      </p>
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
                      <span className="text-gray-600 text-sm">
                        주 사용 지역
                      </span>
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

              <div className="hidden lg:block border rounded-lg p-3 border-gray-300">
                <div className="bg-gray-50 p-2 rounded-lg mb-4">
                  <p className="font-bold text-lg text-center">모임 캘린더</p>
                </div>
                <ActivityCalendar
                  activities={user.activities}
                  participations={user.participations}
                />
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="bg-gray-50 p-2 rounded-lg mb-4">
              <p className="font-bold text-lg text-center">모임 캘린더</p>
            </div>
            <ActivityCalendar
              activities={user.activities}
              participations={user.participations}
            />
          </div>

          <div className="border-2 border-gray-400 p-4 rounded-lg bg-white">
            <h2 className="border-b border-gray-400 pb-2 mb-4 font-bold">
              내가 만든 활동
            </h2>
            {user && user.activities.length > 0 ? (
              <ul className="space-y-2">
                {user.activities.map((activity) => (
                  <li
                    key={`user_activities_li_${activity.id}`}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-green-100 rounded-lg px-2 py-1 text-sm">
                        {activity.date}
                      </div>
                      <div
                        className={`inline rounded-lg px-2 py-1 text-sm ${
                          activity.difficultyLevel === "초급"
                            ? "bg-blue-100"
                            : activity.difficultyLevel === "중급"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        {activity.difficultyLevel}
                      </div>
                      <div className="bg-purple-100 rounded-lg px-2 py-1 text-sm">
                        {activity.participants}/{activity.maxParticipants}
                      </div>
                      <Link
                        href={`/activities/${activity.id}`}
                        className="hover:underline text-blue-600"
                      >
                        {activity.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 rounded-lg px-2 py-1 text-xs hidden sm:block">
                        {activity.price.toLocaleString()}원
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">활동이 없습니다.</p>
            )}
          </div>

          <div className="border-2 border-gray-400 p-4 rounded-lg bg-white">
            <h2 className="border-b border-gray-400 pb-2 mb-4 font-bold">
              참여한 활동
            </h2>
            {user && user.participations.length > 0 ? (
              <ul className="space-y-2">
                {user.participations.map((participation) => (
                  <li
                    key={`user_participations_li_${participation.activity.id}`}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-green-100 rounded-lg px-2 py-1 text-sm">
                        {participation.activity.date}
                      </div>
                      <div
                        className={`inline rounded-lg px-2 py-1 text-sm ${
                          participation.activity.difficultyLevel === "초급"
                            ? "bg-blue-100"
                            : participation.activity.difficultyLevel === "중급"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        {participation.activity.difficultyLevel}
                      </div>
                      <div className="bg-purple-100 rounded-lg px-2 py-1 text-sm">
                        {participation.activity.participants}/
                        {participation.activity.maxParticipants}
                      </div>
                      <Link
                        href={`/activities/${participation.activity.id}`}
                        className="hover:underline text-blue-600"
                      >
                        {participation.activity.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 rounded-lg px-2 py-1 text-xs hidden sm:block">
                        {participation.activity.price.toLocaleString()}원
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">참여한 활동이 없습니다.</p>
            )}
          </div>

          <div className="border-2 border-gray-400 p-4 rounded-lg bg-white">
            <h2 className="border-b border-gray-400 pb-2 mb-4 font-bold">
              최근 로그인 기록
            </h2>
            {user ? (
              <ul className="space-y-1">
                {user.login_records.map((record) => (
                  <li
                    key={`user_profile_li_${record.login_time.toString()}`}
                    className="text-sm text-gray-600"
                  >
                    {record.login_ip?.toString()} -{" "}
                    {new Date(record.login_time).toLocaleString("ko-KR")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">로그인 기록이 없습니다.</p>
            )}
          </div>

          <DeleteUserButton />
        </div>
      ) : (
        <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">👤</span>
          </div>
          <p className="text-gray-600">사용자 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
