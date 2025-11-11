import Link from "next/link";
import { call_login_records } from "@/actions/userCallProfile";
import { getUser } from "@/actions/userAuth";
import { editUserProfile } from "@/actions/userProfileEdit";

export default async function EditProfilePage() {
  const user = await call_login_records();
  const currentUser = await getUser();

  if (!user || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            사용자 정보를 불러올 수 없습니다.
          </h2>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            로그인 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="border-2 border-gray-400 m-4 p-4 rounded-lg bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="border-b-1 border-gray-400 p-2 text-lg font-semibold">
              프로필 수정
            </h2>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← 프로필로 돌아가기
            </Link>
          </div>

          <form action={editUserProfile} className="space-y-4">
            {/* 숨겨진 필드로 user_id 전달 */}
            <input type="hidden" name="user_id" value={currentUser.userId} />

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="user_id_display"
              >
                아이디 (수정 불가)
              </label>
              <input
                type="text"
                id="user_id_display"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                value={user.user_id}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="user_name">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={user.user_name}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="user_email">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={user.user_email}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="user_main_location"
              >
                주 사용 지역
              </label>
              <input
                type="text"
                id="user_main_location"
                name="user_main_location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={user.user_main_location || ""}
                placeholder="예: 서울특별시, 부산광역시 등"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                저장
              </button>
              <Link
                href="/profile"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors inline-block text-center"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
