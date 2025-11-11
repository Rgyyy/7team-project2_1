"use client";

import { useState } from "react";
import { deleteUser } from "@/actions/userAuth";
import { useRouter } from "next/navigation";

export default function DeleteUserButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteUser = async () => {
    // 확인 창 표시
    const isConfirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      const result = await deleteUser();

      if (result.success) {
        alert("회원 탈퇴가 완료되었습니다.\n이용해 주셔서 감사합니다.");
        router.push("/");
        router.refresh();
      } else {
        alert(`회원 탈퇴 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleDeleteUser}
        disabled={isDeleting}
        className={`px-6 py-3 rounded-lg m-4 font-medium transition-all duration-200 ${
          isDeleting
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
        }`}
      >
        {isDeleting ? "탈퇴 처리중..." : "회원 탈퇴"}
      </button>
    </div>
  );
}
