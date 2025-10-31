import Link from "next/link";
import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
export default function AuthButtons() {
  return (
    <div className="flex gap-2">
      <ButtonLogin />
      <ButtonRegister />
    </div>
  );
}
