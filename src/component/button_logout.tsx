"use client";

import { logoutUser } from "@/actions/userLogout";

export default function ButtonLogout() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
