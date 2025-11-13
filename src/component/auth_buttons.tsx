"use client";

import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
import ButtonLogout from "@/component/button_logout";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthButtons() {
  const { userName, loading } = useAuth();

  if (loading) {
    return <div className="w-20 h-8"></div>; // 로딩 중 placeholder
  }

  return (
    <div>
      {userName ? (
        <div>
          <div className="flex gap-2 items-center justify-end">
            <Link href="/profile" className="hover:underline">
              {userName}
            </Link>
            <ButtonLogout />
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <ButtonLogin />
          <ButtonRegister />
        </div>
      )}
    </div>
  );
}
