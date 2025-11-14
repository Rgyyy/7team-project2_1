"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Post {
  id: string;
  moimPostCat: string;
  moimPostTitle: string;
  moimPostContent: string;
  image: string;
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
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [checkComplete, setCheckComplete] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolved = await params;
      setActivityId(resolved.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (activityId) {
      checkCurrentUser();
    }
  }, [activityId]);

  useEffect(() => {
    if (activityId && currentUserId) {
      checkBoth();
    }
  }, [activityId, currentUserId]);

  const checkBoth = async () => {
    await Promise.all([checkParticipation(), checkOrganizer()]);
    setCheckComplete(true);
    setLoading(false); // 모든 체크가 끝난 후 로딩 해제

    // 체크 완료 후 게시글 불러오기
    fetchPosts();
  };

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
    // setLoading을 여기서 제거 - checkBoth가 끝난 후에 처리
  };

  const checkParticipation = async () => {
    try {
      const res = await fetch(`/api/activities/${activityId}/participation`);
      const data = await res.json();
      setIsParticipating(data.isParticipating);
    } catch (error) {
      console.error("Error checking participation:", error);
    }
  };

  const checkOrganizer = async () => {
    try {
      const res = await fetch(`/api/activities/${activityId}`);
      const data = await res.json();

      // Activity의 userId와 현재 로그인한 userId 비교
      if (currentUserId && data.userId === currentUserId) {
        setIsOrganizer(true);
      }
    } catch (error) {
      console.error("Error checking organizer:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/activities/${activityId}/posts?limit=10`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || data);
        setCursor(data.nextCursor || null);
        setHasMore(
          data.hasMore !== undefined ? data.hasMore : data.length === 10
        );
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loadingMore || !cursor) return;

    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/activities/${activityId}/posts?limit=10&cursor=${cursor}`
      );
      if (res.ok) {
        const data = await res.json();
        setPosts((prev) => [...prev, ...(data.posts || data)]);
        setCursor(data.nextCursor || null);
        setHasMore(
          data.hasMore !== undefined ? data.hasMore : data.length === 10
        );
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, cursor, activityId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loadMorePosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        로딩 중...
      </div>
    );
  }

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

  if (!isParticipating && !isOrganizer) {
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
          <>
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/activities/${activityId}/posts/${post.id}`}
                  className="block"
                >
                  <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 h-52 flex flex-col">
                    <div className="flex gap-4 flex-1 min-h-0">
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {post.moimPostCat}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                          {post.moimPostTitle}
                        </h2>
                        <p className="text-gray-600 line-clamp-3 flex-1">
                          {post.moimPostContent}
                        </p>
                      </div>

                      {post.image && (
                        <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg">
                          <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.moimPostTitle}
                              fill
                              sizes="128px"
                              style={{ objectFit: "contain" }}
                              priority
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
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
                          <span className="font-medium">
                            {post.user.user_id}
                          </span>
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
                          </svg>
                          <span className="font-medium">
                            {post._count.likes}
                          </span>
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

            <div ref={observerTarget} className="mt-8 flex justify-center py-4">
              {loadingMore && (
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="animate-spin h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>로딩 중...</span>
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <p className="text-gray-400 text-sm">
                  모든 게시글을 불러왔습니다.
                </p>
              )}
            </div>
          </>
        )}

        {(isParticipating || isOrganizer) && (
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
