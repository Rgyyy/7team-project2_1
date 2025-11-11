'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { joinActivity, cancelParticipation } from '@/app/actions/participation';

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
  phone: string;
  email: string;
  createdAt: string;
  userId: string;
  category: {
    name: string;
    icon?: string;
  };
  location: {
    name: string;
  };
}

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [activityId, setActivityId] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setActivityId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (activityId) {
      fetchActivity();
      checkCurrentUser();
      checkParticipationStatus();
    }
  }, [activityId]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/activities/${activityId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Activity User ID:', data.userId);  // 추가
        console.log('Activity Data:', data);  // 추가
        setActivity(data);
      } else {
        alert('모임을 찾을 수 없습니다.');
        router.push('/activities');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
  } catch (error) {
    console.error('❌ Error in checkCurrentUser:', error);
  }
};

  const checkParticipationStatus = async () => {
    try {
      const response = await fetch(`/api/activities/${activityId}/participation`);
      if (response.ok) {
        const data = await response.json();
        setIsParticipating(data.isParticipating);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleJoin = async () => {
    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    setIsProcessing(true);
    const result = await joinActivity(activityId);
    
    if (result.success) {
      alert(result.message);
      setIsParticipating(true);
      fetchActivity();
    } else {
      alert(result.error);
    }
    setIsProcessing(false);
  };

  const handleCancel = async () => {
    if (!confirm('참여를 취소하시겠습니까?')) return;

    setIsProcessing(true);
    const result = await cancelParticipation(activityId);
    
    if (result.success) {
      alert(result.message);
      setIsParticipating(false);
      fetchActivity();
    } else {
      alert(result.error);
    }
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    if (!confirm('정말 이 모임을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('모임이 삭제되었습니다.');
        router.push('/activities');
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    }
  };

  const isOwner = currentUserId && activity?.userId === currentUserId;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">모임을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/activities"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          목록으로 돌아가기
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {activity.category.name}
              </span>
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {activity.location.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{activity.title}</h1>
            <p className="text-purple-100">주최자: {activity.organizer}</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">모임 소개</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {activity.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">일정 및 장소</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <i className="ri-calendar-line text-purple-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-500">날짜</p>
                    <p className="text-gray-900 font-medium">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-time-line text-purple-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-500">시간</p>
                    <p className="text-gray-900 font-medium">{activity.time} ({activity.duration}분)</p>
                  </div>
                </div>
                <div className="flex items-start md:col-span-2">
                  <i className="ri-map-pin-line text-purple-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-500">장소</p>
                    <p className="text-gray-900 font-medium">
                      {activity.location.name} · {activity.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">모임 정보</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">참가 인원</p>
                  <p className="text-lg font-bold text-purple-600">
                    {activity.participants}/{activity.maxParticipants}명
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">난이도</p>
                  <p className="text-lg font-bold text-gray-900">{activity.difficultyLevel}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">참가비</p>
                  <p className="text-lg font-bold text-gray-900">
                    {activity.price === 0 ? '무료' : `${activity.price.toLocaleString()}원`}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">진행 시간</p>
                  <p className="text-lg font-bold text-gray-900">{activity.duration}분</p>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">주최자 정보</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <i className="ri-user-line text-purple-600 mr-3"></i>
                  <span className="text-gray-700">{activity.organizer}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-phone-line text-purple-600 mr-3"></i>
                  <span className="text-gray-700">{activity.phone}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-mail-line text-purple-600 mr-3"></i>
                  <span className="text-gray-700">{activity.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t space-y-4">
              {isOwner && activityId && (
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push(`/activities/${activityId}/edit`)}
                    className="flex-1 px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-6 py-3 bg-red-400 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    삭제하기
                  </button>
                </div>
              )}

              {currentUserId && !isOwner && activityId && (
                <div>
                  {isParticipating ? (
                    <button
                      onClick={handleCancel}
                      disabled={isProcessing}
                      className="w-full px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? '처리 중...' : '참여 취소하기'}
                    </button>
                  ) : (
                    <button
                      onClick={handleJoin}
                      disabled={isProcessing || (activity && activity.participants >= activity.maxParticipants)}
                      className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? '처리 중...' : 
                       (activity && activity.participants >= activity.maxParticipants) ? '마감됨' : '참여하기'}
                    </button>
                  )}
                </div>
              )}

              {!currentUserId && (
                <button
                  onClick={() => {
                    alert('로그인이 필요합니다.');
                    router.push('/login');
                  }}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  로그인하고 참여하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}