"use client";

import { logoutUser } from "@/actions/userLogout";

export default function ButtonLogout() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <button
      className="bg-red-500 text-white rounded-lg p-1"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
