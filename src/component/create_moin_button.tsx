import Link from "next/link";
import { getUserName } from "@/actions/userAuth";

export default async function CreateMoinButton() {
  const userName = await getUserName();
  return (
    <div>
      {userName ? (
        <div>
          <Link
            href="/create-activity"
            className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 whitespace-nowrap flex items-center gap-2"
          >
            <i className="ri-add-line"></i>
            모임 만들기
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
