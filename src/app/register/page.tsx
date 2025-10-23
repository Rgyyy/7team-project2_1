"use client";

import { registerUser } from "@/actions/userRegister";
import { useActionState } from "react";

const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div>
      <h1>회원가입페이지</h1>
      <form action={formAction}>
        {state.error && <div>{state.error}</div>}

        <div>
          <label>사용자 ID</label>
          <input name="userId" type="text" required placeholder="사용자 ID" />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            name="userPassword"
            type="password"
            required
            placeholder="비밀번호"
          />
        </div>

        <div>
          <label>사용자 이름</label>
          <input
            name="userName"
            type="text"
            required
            placeholder="사용자 이름"
          />
        </div>

        <div>
          <label>이메일</label>
          <input name="userEmail" type="email" required placeholder="이메일" />
        </div>

        <div>
          <label>주요 지역</label>
          <input
            name="userMainLocation"
            type="text"
            placeholder="주요 지역 (선택사항)"
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
