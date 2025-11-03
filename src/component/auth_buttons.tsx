import ButtonLogin from "./button_login";
import ButtonRegister from "./button_register";
import ButtonLogout from "@/component/button_logout";
import { getUserName } from "@/actions/userAuth";

export default async function AuthButtons() {
  const userName = await getUserName();
  return (
    <div>
      {userName ? (
        <div>
          <div className="flex gap-2 items-center justify-end">
            <p>{userName}</p>
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
