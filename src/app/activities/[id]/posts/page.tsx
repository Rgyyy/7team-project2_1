// app/posts/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// 특정 필드만 가져오기
async function getPosts(activityId: string) {
  const posts = await prisma.moimPost.findMany({
    where: {
      activityId, // ✅ 여기서 activityId가 id와 일치하는 게시글만 가져옴
    },
    select: {
      id: true,
      moimPostCat: true,
      moimPostTitle: true,
      moimPostContent: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export default async function PostsPage({ params }: Props) {
  const { id } = await params; // URL의 [id]
  const posts = await getPosts(id); // ✅ id 전달

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>게시글 목록</h1>

      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            >
              <Link href={`/activities/${id}/posts/${post.id}`}>
                <h3>{post.moimPostTitle}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  상태: {true ? "공개" : "비공개"} | 작성일:{" "}
                  {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </p>
                <p>분류: {post.moimPostCat}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
