"use client";
import { useRouter } from "next/navigation";

export default function ButtonRegister() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <button className="bg-blue-500" onClick={handleRegister}>
      회원가입
    </button>
  );
}
