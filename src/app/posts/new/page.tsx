"use client";

import { createPost } from "@/actions/createPost";
import { useActionState } from "react";

const initialState = { error: "" };

export default function Register() {
  const [state, formAction] = useActionState(createPost, initialState);
  return (
    <div>
      <h1>게시글 작성 페이지</h1>
      <form action={formAction}>
        {state.error && <div>{state.error}</div>}
        <div>
          <label htmlFor="category">분류</label>
          <select name="category" id="category">
            <option value="모임후기">모임후기</option>
            <option value="가입인사">가입인사</option>
            <option value="자유">자유</option>
            <option value="공지">공지</option>
          </select>
        </div>

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
