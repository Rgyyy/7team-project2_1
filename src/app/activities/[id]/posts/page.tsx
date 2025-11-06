// app/activities/[id]/posts/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// 게시글 및 관련 데이터 가져오기
async function getPosts(activityId: string) {
  const posts = await prisma.moimPost.findMany({
    where: {
      activityId,
    },
    select: {
      id: true,
      moimPostCat: true,
      moimPostTitle: true,
      moimPostContent: true,
      createdAt: true,
      userId: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export default async function PostsPage({ params }: Props) {
  const { id } = await params;
  const posts = await getPosts(id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
          <p className="mt-2 text-gray-600">활동 게시판</p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">게시글이 없습니다.</p>
            <p className="text-gray-400 mt-2">첫 번째 게시글을 작성해보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/activities/${id}/posts/${post.id}`}
                className="block"
              >
                <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                  {/* 헤더 영역 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.moimPostCat}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {post.moimPostTitle}
                      </h2>
                    </div>
                  </div>

                  {/* 내용 미리보기 */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.moimPostContent}
                  </p>

                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {/* 작성자 */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
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
                        <span className="font-medium">{post.userId}</span>
                      </div>

                      {/* 작성 날짜 및 시간 */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
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
                          {new Date(post.createdAt).toLocaleDateString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <span className="text-gray-400">·</span>
                        <time>
                          {new Date(post.createdAt).toLocaleTimeString(
                            "ko-KR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </time>
                      </div>
                    </div>

                    {/* 좋아요 & 댓글 수 */}
                    <div className="flex items-center gap-4 text-sm">
                      {/* 좋아요 */}
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <svg
                          className="w-4 h-4"
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
                      </div>

                      {/* 댓글 */}
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <svg
                          className="w-4 h-4"
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
                        <span className="font-medium">
                          {post._count.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
