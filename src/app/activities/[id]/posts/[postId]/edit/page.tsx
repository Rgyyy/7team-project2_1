// app/activities/[id]/posts/[postId]/edit/page.tsx

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/actions/userAuth";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "@/component/EditPostForm";

type Props = {
  params: Promise<{
    id: string;
    postId: string;
  }>;
};

// 게시글 정보 가져오기
async function getPost(postId: string, userId: string) {
  const post = await prisma.moimPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      moimPostCat: true,
      moimPostTitle: true,
      moimPostContent: true,
      image: true,
      userId: true,
      activityId: true,
    },
  });

  // 게시글이 없거나 작성자가 아닌 경우
  if (!post || post.userId !== userId) {
    return null;
  }

  return post;
}

export default async function EditPostPage({ params }: Props) {
  const { id, postId } = await params;
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const post = await getPost(postId, userId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">게시글 수정</h1>
          <EditPostForm post={post} activityId={id} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  return {
    title: "게시글 수정",
  };
}
