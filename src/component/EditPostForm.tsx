// component/EditPostForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Post = {
  id: string;
  moimPostCat: string;
  moimPostTitle: string;
  moimPostContent: string;
  image: string | null;
  activityId: string;
};

type EditPostFormProps = {
  post: Post;
  activityId: string;
};

export default function EditPostForm({ post, activityId }: EditPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    moimPostCat: post.moimPostCat,
    moimPostTitle: post.moimPostTitle,
    moimPostContent: post.moimPostContent,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("게시글 수정에 실패했습니다.");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("수정 중 오류:", error);
      setErrorMessage("게시글 수정에 실패했습니다.");
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    router.back();
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    router.push(`/activities/${activityId}/posts/${post.id}`);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 카테고리 선택 */}
        <div>
          <label
            htmlFor="moimPostCat"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            카테고리
          </label>
          <select
            id="moimPostCat"
            value={formData.moimPostCat}
            onChange={(e) =>
              setFormData({ ...formData, moimPostCat: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">선택하세요</option>
            <option value="모임후기">📸 모임후기</option>
            <option value="가입인사">👋 가입인사</option>
            <option value="자유">💬 자유</option>
            <option value="공지">📢 공지</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label
            htmlFor="moimPostTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            제목
          </label>
          <input
            type="text"
            id="moimPostTitle"
            value={formData.moimPostTitle}
            onChange={(e) =>
              setFormData({ ...formData, moimPostTitle: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <label
            htmlFor="moimPostContent"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            내용
          </label>
          <textarea
            id="moimPostContent"
            value={formData.moimPostContent}
            onChange={(e) =>
              setFormData({ ...formData, moimPostContent: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="내용을 입력하세요"
            rows={10}
            required
          />
        </div>

        {/* 기존 이미지 표시 */}
        {post.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              첨부된 이미지
            </label>
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="게시글 이미지"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              * 이미지 수정 기능은 추후 추가될 예정입니다.
            </p>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "수정 중..." : "수정 완료"}
          </button>
        </div>
      </form>

      {/* 수정 완료 모달 */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                수정 완료
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                게시글이 성공적으로 수정되었습니다.
              </p>
              <button
                onClick={handleSuccessConfirm}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 오류 모달 */}
      {showErrorModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                수정 실패
              </h3>
              <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                수정 취소
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                수정을 취소하시겠습니까?
                <br />
                변경사항이 저장되지 않습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  계속 수정
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
