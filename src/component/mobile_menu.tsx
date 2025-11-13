"use client";
import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
import ButtonLogout from "@/component/button_logout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 inline-flex items-center justify-center p-2 rounded-md"
          aria-label="Toggle mobile menu"
        >
          <i
            className={
              isOpen ? "ri-close-line text-xl" : "ri-menu-line text-xl"
            }
          ></i>
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-4 pt-3 pb-4">
            {/* 메뉴와 인증 버튼을 가로로 배치 */}
            <div className="flex items-start justify-between gap-4">
              {/* 메뉴 링크들 */}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  홈
                </Link>
                <Link
                  href="/activities"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  모임 게시판
                </Link>
                <Link
                  href="/chatting"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  채팅 참여하기
                </Link>
              </div>
              {/* 오른쪽: 인증 버튼 */}
              <div className="flex flex-col gap-2 min-w-[100px]">
                {userName ? (
                  <div className="flex flex-col gap-2 items-center justify-between">
                    <Link
                      href="/profile"
                      className="hover:underline text-lg font-medium"
                    >
                      {userName}
                    </Link>
                    <ButtonLogout />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <ButtonLogin />
                    <ButtonRegister />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
