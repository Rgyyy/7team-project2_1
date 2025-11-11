'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  duration: number;
  maxParticipants: number;
  participants: number;
  difficultyLevel: string;
  price: number;
  organizer: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
    icon?: string;
  };
  location: {
    id: string;
    name: string;
  };
}

interface PaginationData {
  activities: Activity[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [locationFilter, setLocationFilter] = useState('전국');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const itemsPerPage = 9;
  const observerTarget = useRef<HTMLDivElement>(null);
  const newPageMarkerRef = useRef<HTMLDivElement>(null);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 현재 사용자 확인
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/current-user');
        if (response.ok) {
          const data = await response.json();
          if (data.userId) {
            setCurrentUserId(data.userId);
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };
    
    checkCurrentUser();
  }, []);

  // 데이터 fetch
  useEffect(() => {
    fetchActivities(currentPage > 1 && isMobile);
  }, [currentPage, categoryFilter, locationFilter, sortBy, searchQuery]);

  // 필터 변경 시 초기화
  useEffect(() => {
    if (currentPage === 1) {
      setActivities([]);
    }
  }, [categoryFilter, locationFilter, sortBy, searchQuery]);

  const fetchActivities = async (isLoadMore: boolean) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: sortBy,
      });

      if (categoryFilter !== '전체') {
        params.append('category', categoryFilter);
      }
      if (locationFilter !== '전국') {
        params.append('location', locationFilter);
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`/api/activities?${params.toString()}`);
      const data: PaginationData = await response.json();
      
      if (data.activities && Array.isArray(data.activities)) {
        if (isMobile && isLoadMore && currentPage > 1) {
          setActivities(prev => [...prev, ...data.activities]);
          
          setTimeout(() => {
            if (newPageMarkerRef.current) {
              newPageMarkerRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
              });
            }
          }, 150);
        } else {
          setActivities(data.activities);
        }
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // 무한 스크롤 (모바일 전용)
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
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
  }, [isMobile, loadingMore, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    setActivities([]);
  };

  const handleLocationChange = (location: string) => {
    setLocationFilter(location);
    setCurrentPage(1);
    setActivities([]);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    setActivities([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
    setActivities([]);
  };

  const handleCreateActivity = (e: React.MouseEvent) => {
    if (!currentUserId) {
      e.preventDefault();
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  };

  const categories = ['전체', '운동', '요리', '독서', '사진', '음악', '미술', '언어', '게임', '여행', '그외'];
  const locations_part1 = ['전국', '서울', '인천', '대전', '대구', '광주', '울산', '부산', '세종'];
  const locations_part2 = ['경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도'];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  if (loading && activities.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">모임 게시판</h1>
          <p className="text-gray-600">
            다양한 취미 활동 모임을 찾아보세요 
            {totalCount > 0 && (
              <span className="ml-2 text-purple-600 font-medium">
                (총 {totalCount}개)
              </span>
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">취미 카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">원하는 지역</h3>
            <div className="flex flex-wrap gap-2">
              {locations_part1.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocationChange(loc)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    locationFilter === loc
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
              
              <div className="flex flex-wrap gap-2 w-full mt-2">
                {locations_part2.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationChange(loc)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      locationFilter === loc
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-gray-200 gap-4">
            <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="모임 검색..."
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                >
                  <i className="ri-search-line"></i>
                </button>
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setSearchQuery('');
                      setCurrentPage(1);
                      setActivities([]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-circle-line"></i>
                  </button>
                )}
              </div>
            </form>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">정렬:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="date-asc">모임 날짜 빠른순</option>
                  <option value="date-desc">모임 날짜 늦은순</option>
                </select>
              </div>

              <Link
                href="/create-activity"
                onClick={handleCreateActivity}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <i className="ri-add-line"></i>
                모임 만들기
              </Link>
            </div>
          </div>
        </div>

        {activities.length === 0 && !loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery
                ? `"${searchQuery}" 검색 결과가 없습니다`
                : categoryFilter !== '전체' || locationFilter !== '전국'
                ? '해당 조건의 모임이 없습니다'
                : '아직 생성된 모임이 없습니다'}
            </p>
            {!searchQuery && (
              <Link
                href="/create-activity"
                onClick={handleCreateActivity}
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                첫 모임 만들기
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {activities.map((activity, index) => {
                const isNewPageStart = isMobile && index > 0 && index % itemsPerPage === 0;
                
                return (
                  <div key={activity.id}>
                    {isNewPageStart && <div ref={newPageMarkerRef} className="absolute -mt-20"></div>}
                    <Link
                      href={`/activities/${activity.id}`}
                      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            {activity.category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(activity.createdAt).toLocaleDateString('ko-KR')}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                          {activity.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {activity.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-calendar-line mr-2 text-purple-600"></i>
                            {activity.date} {activity.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-map-pin-line mr-2 text-purple-600"></i>
                            {activity.location.name} · {activity.address}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-group-line mr-2 text-purple-600"></i>
                            {activity.participants}/{activity.maxParticipants}명
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {activity.difficultyLevel}
                            </span>
                            <span className="text-sm font-semibold text-purple-600">
                              {activity.price === 0 ? '무료' : `${activity.price.toLocaleString()}원`}
                            </span>
                          </div>
                          <span className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            모임 상세보기 →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {isMobile && (
              <div ref={observerTarget} className="py-8 text-center">
                {loadingMore && (
                  <div className="text-gray-600">
                    <i className="ri-loader-4-line animate-spin text-2xl"></i>
                    <p className="mt-2">더 불러오는 중...</p>
                  </div>
                )}
                {currentPage >= totalPages && activities.length > 0 && (
                  <p className="text-gray-500">모든 모임을 확인했습니다</p>
                )}
              </div>
            )}

            {!isMobile && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </button>

                {currentPage > 3 && totalPages > 5 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      1
                    </button>
                    <span className="px-2 text-gray-500">...</span>
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages - 2 && totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-500">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}