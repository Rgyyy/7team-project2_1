// app/activities/[id]/posts/[postId]/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
    postId: string;
  }>;
};

// 게시글 상세 정보 가져오기
async function getPost(postId: string) {
  const post = await prisma.moimPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      moimPostCat: true,
      moimPostTitle: true,
      moimPostContent: true,
      createdAt: true,
      updatedAt: true,
      activityId: true,
      userId: true,
      user: {
        select: {
          user_name: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
  return post;
}

// 댓글 목록 가져오기
async function getComments(postId: string) {
  const comments = await prisma.postComment.findMany({
    where: { postId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          user_name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}

export default async function PostDetailPage({ params }: Props) {
  const { id, postId } = await params;
  const post = await getPost(postId);
  const comments = await getComments(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link
            href={`/activities/${id}/posts`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">목록으로 돌아가기</span>
          </Link>
        </div>

        {/* 게시글 카드 */}
        <article className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
          {/* 헤더: 카테고리와 버튼 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.moimPostCat}
              </span>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                수정
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                삭제
              </button>
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {post.moimPostTitle}
          </h1>

          {/* 작성자 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            {/* 작성자 */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium text-gray-900">
                {post.user.user_name}
              </span>
            </div>

            <span className="text-gray-400">·</span>

            {/* 작성 날짜 */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time>
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <span className="text-gray-400">·</span>

            {/* 작성 시간 */}
            <time>
              {new Date(post.createdAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>

          {/* 본문 */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.moimPostContent}
            </p>
          </div>

          {/* 좋아요 & 댓글 수 */}
          <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
            {/* 좋아요 버튼 */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-medium">{post._count.likes}</span>
            </button>

            {/* 댓글 수 */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">{post._count.comments}</span>
            </div>
          </div>
        </article>

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            댓글 {comments.length}개
          </h2>

          {/* 댓글 작성란 */}
          <div className="mb-8">
            <form className="space-y-4">
              <textarea
                name="content"
                placeholder="댓글을 작성해주세요..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  댓글 작성
                </button>
              </div>
            </form>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">첫 번째 댓글을 작성해보세요!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                >
                  {/* 댓글 헤더 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {comment.user.user_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}{" "}
                          {new Date(comment.createdAt).toLocaleTimeString(
                            "ko-KR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* 댓글 수정/삭제 버튼 */}
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-gray-600 hover:text-gray-900">
                        수정
                      </button>
                      <span className="text-gray-400">·</span>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        삭제
                      </button>
                    </div>
                  </div>

                  {/* 댓글 내용 */}
                  <p className="text-gray-700 leading-relaxed ml-13">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const { postId } = await params;
  const post = await getPost(postId);

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
