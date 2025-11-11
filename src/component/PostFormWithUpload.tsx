// src/components/PostFormWithUpload.tsx
"use client";

import { useState, useTransition } from "react";
import { createPost } from "@/actions/createPost";
import { MoimPostCat } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  activityId: string;
};

export default function PostFormWithUpload({ activityId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 이미지 업로드 관련 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 파일 크기 체크 (5MB 제한)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("파일 크기는 5MB 이하여야 합니다");
      return;
    }

    // 파일 타입 체크 (이미지만 허용)
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있습니다");
      return;
    }

    setError("");
    setSelectedFile(file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 이미지 선택 초기화
  const handleReset = () => {
    setSelectedFile(null);
    setPreview("");
    setUploadedUrl("");
    setError("");
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 이미지가 선택되었지만 아직 업로드되지 않은 경우
    if (selectedFile && !uploadedUrl) {
      setUploading(true);
      setError("");

      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          throw new Error("업로드 실패");
        }

        const data = await response.json();
        setUploadedUrl(data.url);

        // 업로드된 이미지 URL을 폼 데이터에 추가
        formData.append("imageUrl", data.url);
      } catch (err) {
        setError("이미지 업로드 중 오류가 발생했습니다");
        console.error(err);
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    } else if (uploadedUrl) {
      // 이미 업로드된 경우
      formData.append("imageUrl", uploadedUrl);
    }

    // Server Action 호출
    startTransition(async () => {
      try {
        const result = await createPost(activityId, null, formData);

        if (result?.error) {
          setFormError(result.error);
        }
        // redirect는 createPost 내부에서 처리됨
      } catch (err) {
        console.error(err);
        setFormError("게시글 작성 중 오류가 발생했습니다");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* 이미지 업로드 영역 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            이미지 첨부 (선택)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {!preview ? (
              // 파일 선택 전
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <label className="cursor-pointer">
                  <span className="text-blue-500 hover:text-blue-600 font-medium">
                    파일을 선택하세요
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF (최대 5MB)
                </p>
              </div>
            ) : (
              // 미리보기
              <div>
                <img
                  src={preview}
                  alt="미리보기"
                  className="max-h-64 mx-auto rounded"
                />

                {selectedFile && (
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>파일명: {selectedFile.name}</p>
                    <p>크기: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}

                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    이미지 제거
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 이미지 업로드 에러 */}
          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* 업로드 완료 */}
          {uploadedUrl && (
            <div className="mt-2 p-4 bg-green-100 rounded">
              <p className="text-green-700 font-medium mb-2">업로드 완료!</p>
              <img
                src={uploadedUrl}
                alt="업로드된 이미지"
                className="mt-2 max-h-32 rounded"
              />
            </div>
          )}

          {/* 업로드 진행 상태 */}
          {uploading && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                이미지 업로드 중...
              </p>
            </div>
          )}
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

        {/* 폼 에러 메시지 */}
        {formError && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
            {formError}
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={uploading || isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading
            ? "이미지 업로드 중..."
            : isPending
            ? "작성 중..."
            : "작성하기"}
        </button>
      </form>
    </div>
  );
}
