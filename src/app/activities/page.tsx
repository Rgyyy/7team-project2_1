'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [locationFilter, setLocationFilter] = useState('전국');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities');
      const data = await response.json();
      
      console.log('API Response:', data); // 디버깅용
      console.log('Is Array?', Array.isArray(data)); // 배열인지 확인
      
      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        setActivities(data);
      } else {
        console.error('Expected array but got:', data);
        setActivities([]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['전체', '운동', '요리', '독서', '사진', '음악', '미술', '언어', '게임', '여행', '그외'];
  const locations = ['전국', '서울', '인천', '대전', '대구', '부산', '광주', '울산', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도'];

  // 안전하게 필터링 (activities가 배열인지 확인)
  const filteredActivities = Array.isArray(activities) ? activities.filter(act => {
    const matchCategory = categoryFilter === '전체' || act.category?.name === categoryFilter;
    const matchLocation = locationFilter === '전국' || act.location?.name === locationFilter;
    return matchCategory && matchLocation;
  }) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">모임 게시판</h1>
          <p className="text-gray-600">다양한 취미 활동 모임을 찾아보세요</p>
        </div>

        {/* 필터 & 생성 버튼 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* 카테고리 필터 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
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

          {/* 지역 필터 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">지역</h3>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    locationFilter === loc
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* 모임 만들기 버튼 */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Link
              href="/create-activity"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              모임 만들기
            </Link>
          </div>
        </div>

        {/* 모임 목록 */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">아직 생성된 모임이 없습니다</p>
            <Link
              href="/create-activity"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              첫 모임 만들기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  {/* 카테고리 배지 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {activity.category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {activity.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  {/* 정보 */}
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

                  {/* 하단 정보 */}
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
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}