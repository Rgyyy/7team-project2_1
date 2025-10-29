// app/posts/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// params 타입 정의
type Props = {
  params: {
    id: string;
  };
};

// 특정 게시글 가져오기
async function getPost(id: string) {
  const post = await prisma.moimPost.findUnique({
    where: { id },
    select: {
      id: true,
      moimPostTitle: true,
      moimPostContent: true,
      createdAt: true,
    },
  });
  return post;
}

export default async function PostDetailPage({ params }: Props) {
  // cuid는 string이므로 그대로 사용
  const post = await getPost(params.id);

  // 게시글이 없으면 404 페이지 표시
  if (!post) {
    notFound();
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/posts" style={{ color: "#0070f3", textDecoration: "none" }}>
        ← 목록으로 돌아가기
      </Link>

      <article style={{ marginTop: "30px" }}>
        <h1>{post.moimPostTitle}</h1>

        <div
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>
            작성일: {new Date(post.createdAt).toLocaleDateString("ko-KR")}
          </span>
          <span style={{ margin: "0 10px" }}>|</span>
          <span>상태: {true ? "공개" : "비공개"}</span>
          <span style={{ margin: "0 10px" }}>|</span>
        </div>

        <div
          style={{
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            fontSize: "16px",
          }}
        >
          {post.moimPostContent || "내용이 없습니다."}
        </div>
      </article>
    </div>
  );
}

// generateMetadata: 페이지 메타데이터 동적 생성 (SEO)
export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.moimPostTitle,
    description: post.moimPostContent?.substring(0, 160),
  };
}
