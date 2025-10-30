"use client";

import { registerUser } from "@/actions/userRegister";
import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div className="flex flex-col items-center">
      <form
        className="border-2 rounded-lg border-purple-600 p-4 m-4 w-full max-w-lg"
        action={formAction}
      >
        {state.error && (
          <div className="text-red-500 border-1 p-2 border-red-500 bg-red-50 w-full">
            {state.error}
          </div>
        )}
        <div className="flex flex-col items-center m-4">
          <Link href="/">
            <Image src="/img_b.png" alt="Logo" width={150} height={100} />
          </Link>

          <div>
            <div>
              <h1 className="text-2xl font-bold m-4">회원가입</h1>
              <input
                className="p-2 border-1 border-gray-300 rounded-t-lg"
                name="userId"
                type="text"
                required
                placeholder="사용자 ID"
              />
            </div>

            <div>
              <input
                className="p-2 border-1 border-gray-300"
                name="userPassword"
                type="password"
                required
                placeholder="비밀번호"
              />
            </div>

            <div>
              <input
                className="p-2 border-1 border-gray-300"
                name="userName"
                type="text"
                required
                placeholder="사용자 이름"
              />
            </div>

            <div>
              <input
                className="p-2 border-1 border-gray-300 rounded-b-lg"
                name="userEmail"
                type="email"
                required
                placeholder="이메일"
              />
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <input
              className="p-2 border-1 border-gray-300 rounded-lg"
              name="userMainLocation"
              type="text"
              placeholder="주요 지역 (선택사항)"
            />
          </div>
        </div>

        <button
          className="bg-purple-600 text-white rounded-lg p-1 float-right"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
