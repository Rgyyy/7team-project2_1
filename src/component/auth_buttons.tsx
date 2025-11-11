import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
import ButtonLogout from "@/component/button_logout";
import { getUserName } from "@/actions/userAuth";
import Link from "next/link";

export default async function AuthButtons() {
  const userName = await getUserName();
  return (
    <div>
      {userName ? (
        <div>
          <div className="flex gap-2 items-center justify-end">
            <Link href="/profile" className="hover:underline">
              {userName}
            </Link>
            <ButtonLogout />
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <ButtonLogin />
          <ButtonRegister />
        </div>
      )}
    </div>
  );
}
