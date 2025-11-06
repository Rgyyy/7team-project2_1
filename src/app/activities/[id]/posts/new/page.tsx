"use client";

import { createPost } from "@/actions/createPost";
import { useActionState } from "react";

const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* 컨테이너 */}
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            게시글 작성
          </h1>
          <p className="text-gray-600">새로운 게시글을 작성해보세요</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form action={formAction} className="space-y-6">
            {/* 에러 메시지 */}
            {state.error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">{state.error}</p>
                </div>
              </div>
            )}

            {/* 분류 선택 */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                분류 <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
              >
                <option value="모임후기">📸 모임후기</option>
                <option value="가입인사">👋 가입인사</option>
                <option value="자유">💬 자유</option>
                <option value="공지">📢 공지</option>
              </select>
            </div>

            {/* 제목 입력 */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-gray-400"
              />
            </div>

            {/* 본문 입력 */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                본문 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={8}
                placeholder="내용을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-gray-400 resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                최소 10자 이상 작성해주세요
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                게시글 작성
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 hover:border-gray-400"
              >
                취소
              </button>
            </div>
          </form>
        </div>

        {/* 하단 안내 문구 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            작성하신 게시글은 커뮤니티 가이드라인에 따라 관리됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
