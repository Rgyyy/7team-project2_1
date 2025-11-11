// src/app/activities/[id]/posts/new/page.tsx

import { createPost } from "@/actions/createPost";
import UploadPage from "@/component/UploadPage"; // 클라이언트 컴포넌트 분리
import PostFormWithUpload from "@/component/PostFormWithUpload";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewPostPage({ params }: Props) {
  const { id } = await params; // ✅ Promise unwrap

  return (
    <div>
      <PostFormWithUpload activityId={id} />
      {/* <UploadPage />
      <PostForm activityId={id} /> */}
    </div>
  );
}
