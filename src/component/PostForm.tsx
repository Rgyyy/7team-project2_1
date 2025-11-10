// src/components/PostForm.tsx
"use client";

import { useActionState } from "react"; // ✅ useFormState → useActionState
import { createPost } from "@/actions/createPost";
import { MoimPostCat } from "@prisma/client";

type Props = {
  activityId: string;
};

export default function PostForm({ activityId }: Props) {
  const createPostWithActivity = createPost.bind(null, activityId);
  const [state, formAction] = useActionState(createPostWithActivity, null);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

      <form action={formAction} className="space-y-4">
        {/* 카테고리 선택 */}
        <div>
          <label className="block text-sm font-medium mb-2">카테고리</label>
          <select
            name="category"
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">선택하세요</option>
            <option value={MoimPostCat.모임후기}>📸 모임후기</option>
            <option value={MoimPostCat.가입인사}>👋 가입인사</option>
            <option value={MoimPostCat.자유}>💬 자유</option>
            <option value={MoimPostCat.공지}>📢 공지</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium mb-2">제목</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium mb-2">내용</label>
          <textarea
            name="content"
            rows={10}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* 에러 메시지 */}
        {state?.error && (
          <div className="text-red-600 text-sm">{state.error}</div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
