"use client";
import { useRouter } from "next/navigation";

export default function ButtonRegister() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <button
      className="bg-purple-600 text-white rounded-lg p-1"
      onClick={handleRegister}
    >
      회원가입
    </button>
  );
}
