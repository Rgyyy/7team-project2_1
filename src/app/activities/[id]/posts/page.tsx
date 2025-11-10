"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  moimPostCat: string;
  moimPostTitle: string;
  moimPostContent: string;
  createdAt: string;
  _count: {
    likes: number;
    comments: number;
  };
  user: {
    user_id: string;
  };
}

export default function PostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activityId, setActivityId] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isParticipating, setIsParticipating] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // URL 파라미터 로드
  useEffect(() => {
    const loadParams = async () => {
      const resolved = await params;
      setActivityId(resolved.id);
    };
    loadParams();
  }, [params]);

  // 로그인 사용자, 참가 여부, 게시글 가져오기
  useEffect(() => {
    if (activityId) {
      checkCurrentUser();
      checkParticipation();
    }
  }, [activityId]);

  // 현재 로그인 사용자 가져오기
  const checkCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/current-user");
      const data = await res.json();
      if (data && data.userId) {
        setCurrentUserId(data.userId);
      }
    } catch (error) {
      console.error("Error checking current user:", error);
    }
  };

  // 참가 여부 확인
  const checkParticipation = async () => {
    try {
      const res = await fetch(`/api/activities/${activityId}/participation`);
      const data = await res.json();
      setIsParticipating(data.isParticipating);

      // 참가자만 게시글 불러오기
      if (data.isParticipating) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error checking participation:", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/activities/${activityId}/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        로딩 중...
      </div>
    );
  }

  // 비로그인
  if (!currentUserId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <p className="mb-4">로그인이 필요한 페이지입니다.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  // 비참가자
  if (!isParticipating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <p className="mb-4">이 모임의 참가자만 게시판을 볼 수 있습니다.</p>
        <button
          onClick={() => router.push(`/activities/${activityId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          모임 페이지로 돌아가기
        </button>
      </div>
    );
  }

  // 참가자만 게시글 목록 표시
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
                href={`/activities/${activityId}/posts/${post.id}`}
                className="block"
              >
                <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
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

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.moimPostContent}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                        <span className="font-medium">{post.user.user_id}</span>
                      </div>

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
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
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
                        </svg>{" "}
                        <span className="font-medium">{post._count.likes}</span>
                      </div>
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
                        </svg>{" "}
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

        {/* 참가자만 글쓰기 버튼 */}
        {isParticipating && (
          <Link
            href={`/activities/${activityId}/posts/new`}
            className="fixed bottom-8 right-8 md:right-auto md:left-[calc(50%+272px)] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            글 작성
          </Link>
        )}
      </div>
    </div>
  );
}
