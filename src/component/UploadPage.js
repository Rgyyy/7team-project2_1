// app/upload/page.js
"use client";
import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  // 파일 선택했을 때
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // 파일 크기 체크 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB를 바이트로 변환
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
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 업로드 실행
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("파일을 선택해주세요");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // FormData 객체 생성 (파일 전송용)
      const formData = new FormData();
      formData.append("file", selectedFile);

      // 서버로 전송
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("업로드 실패");
      }

      const data = await response.json();
      setUploadedUrl(data.url);

      // 성공 후 초기화
      setSelectedFile(null);
      setPreview("");
    } catch (err) {
      setError("업로드 중 오류가 발생했습니다");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // 다시 선택하기
  const handleReset = () => {
    setSelectedFile(null);
    setPreview("");
    setUploadedUrl("");
    setError("");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">이미지 업로드</h1>

      {/* 업로드 영역 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {!preview ? (
          // 파일 선택 전
          <div>
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
              <div className="mt-4 text-sm text-gray-600">
                <p>파일명: {selectedFile.name}</p>
                <p>크기: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                <p>타입: {selectedFile.type}</p>
              </div>
            )}

            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {uploading ? "업로드 중..." : "업로드"}
              </button>
              <button
                onClick={handleReset}
                disabled={uploading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                다시 선택
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* 업로드 완료 */}
      {uploadedUrl && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-700 font-medium mb-2">업로드 완료!</p>
          <p className="text-sm text-gray-600 break-all">URL: {uploadedUrl}</p>
          <img
            src={uploadedUrl}
            alt="업로드된 이미지"
            className="mt-2 max-h-32 rounded"
          />
        </div>
      )}

      {/* 업로드 진행 상태 */}
      {uploading && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">업로드 중...</p>
        </div>
      )}
    </div>
  );
}
