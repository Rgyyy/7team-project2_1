"use client";

import { useState, useEffect } from "react";
import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
import ButtonLogout from "@/component/button_logout";
import Link from "next/link";

export default function AuthButtons() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/current-user");
        const data = await response.json();

        if (data.userId) {
          // userId가 있으면 사용자 이름 가져오기
          const userResponse = await fetch(`/api/users/${data.userId}`);
          const userData = await userResponse.json();
          setUserName(userData.userName || null);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUserName(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

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
