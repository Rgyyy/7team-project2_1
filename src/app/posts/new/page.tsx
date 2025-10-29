"use client";

import { registerUser } from "@/actions/createPost";
import { useActionState } from "react";

const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div>
      <h1>게시글 작성 페이지</h1>
      <form action={formAction}>
        {state.error && <div>{state.error}</div>}

        <div>
          <label>제목</label>
          <input
            name="title"
            type="text"
            required
            placeholder="제목을 입력하세요."
          />
        </div>

        <div>
          <label>본문</label>
          <textarea
            name="content"
            required
            rows={4}
            placeholder="내용을 입력하세요."
          />
        </div>

        <button
          type="submit"
          className="border hover:cursor-pointer p-1 m-1 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
}
