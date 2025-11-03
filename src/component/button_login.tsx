"use client";
import { useRouter } from "next/navigation";

export default function ButtonLogin() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <button
      className="bg-purple-600 text-white rounded-lg p-1"
      onClick={handleLogin}
    >
      로그인
    </button>
  );
}
