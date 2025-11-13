"use client";

import { logoutUser } from "@/actions/userLogout";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const { refreshUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      await refreshUser();
      router.push("/");
      router.refresh();
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-1"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
