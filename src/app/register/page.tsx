"use client";

import { registerUser } from "@/actions/userRegister";
import { useActionState } from "react";

const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div className="flex justify-center center-items">
      <form
        className="border-2 p-4 rounded-lg border-purple-600"
        action={formAction}
      >
        {state.error && <div>{state.error}</div>}
        <div className="mt-4 mb-4">
          <div>
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
        <div className="mt-2 mb-2">
          <input
            className="p-2 border-1 border-gray-300 rounded-lg"
            name="userMainLocation"
            type="text"
            placeholder="주요 지역 (선택사항)"
          />
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
