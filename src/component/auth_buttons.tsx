import Link from "next/link";

export default function AuthButtons() {
  return (
    <div>
      <Link href="/login">
        <button>로그인</button>
      </Link>
      <Link href="/register">
        <button>회원가입</button>
      </Link>
    </div>
  );
}
