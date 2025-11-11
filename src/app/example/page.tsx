import { getUserName, getUserId } from "@/actions/userAuth";
import AuthButtons from "@/component/auth_buttons";
import ButtonLogout from "@/component/button_logout";

// import { getUser } from "@/actions/userAuth";
// const User = await getUser();
// console.log(User?.userId);
// 다른 페이지들에서 사용시 해당 부분 사용. 결과값 : 사용자 ID

// 아래 예시는 사용자 ID를 사용해서 유저의 이름을 갖고오는 getUserName 함수를 사용한 예시.

// export default async function example() {
//   const userName = await getUserName();
//   return (
//     <div>
//       <h1>메인페이지</h1>
//       {userName ? (
//         // 로그인 된 경우 사용자의 이름 표시
//         <div>
//           <p>안녕하세요, {userName}님!</p>
//           <ButtonLogout />
//         </div>
//       ) : (
//         //   비회원인 경우 (로그인,회원가입 버튼 컴포넌트 표시)
//         <AuthButtons />
//       )}
//     </div>
//   );
// }

export default async function example() {
  const userId = await getUserId();
  return (
    <div>
      <h1>메인페이지</h1>
      {userId ? (
        // 로그인 된 경우 사용자의 이름 표시
        <div>
          <p>안녕하세요, {userId}님!</p>
          <ButtonLogout />
        </div>
      ) : (
        //   비회원인 경우 (로그인,회원가입 버튼 컴포넌트 표시)
        <AuthButtons />
      )}
    </div>
  );
}
