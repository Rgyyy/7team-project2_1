'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activityId, setActivityId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    time: '',
    location: '',
    address: '',
    duration: '',
    maxParticipants: '',
    difficultyLevel: '초급',
    price: '0',
    organizer: '',
    phone: '',
    email: '',
  });

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
    }
  }, [activityId]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/activities/${activityId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title,
          category: data.category.name,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location.name,
          address: data.address,
          duration: data.duration.toString(),
          maxParticipants: data.maxParticipants.toString(),
          difficultyLevel: data.difficultyLevel,
          price: data.price.toString(),
          organizer: data.organizer,
          phone: data.phone,
          email: data.email,
        });
        setCharCount(data.description.length);
      } else {
        alert('모임을 찾을 수 없습니다.');
        router.push('/activities');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('모임을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('모임이 수정되었습니다!');
        router.push(`/activities/${activityId}`);
      } else {
        const error = await response.json();
        alert(error.error || '수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 이 모임을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return;

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            모임 수정하기
          </h1>
          <p className="text-gray-600">
            모임 정보를 수정하거나 삭제할 수 있습니다
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                기본 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    모임 제목 *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="예: 해운대에서 러닝 모임"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    카테고리 *
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="">카테고리를 선택하세요</option>
                      <option value="운동">운동</option>
                      <option value="요리">요리</option>
                      <option value="독서">독서</option>
                      <option value="사진">사진</option>
                      <option value="음악">음악</option>
                      <option value="미술">미술</option>
                      <option value="언어">언어</option>
                      <option value="게임">게임</option>
                      <option value="여행">여행</option>
                      <option value="그외">그외</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                 
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  maxLength={500}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="모임에 대한 자세한 설명을 작성해주세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">{charCount}/500자</p>
              </div>
            </div>

            {/* 일정 및 장소 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                일정 및 장소
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    날짜 *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    시간 *
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    지역 *
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="">지역을 선택하세요</option>
                      <option value="서울">서울</option>
                      <option value="인천">인천</option>
                      <option value="대전">대전</option>
                      <option value="대구">대구</option>
                      <option value="광주">광주</option>
                      <option value="울산">울산</option>
                      <option value="부산">부산</option>
                      <option value="세종">세종</option>
                      <option value="경기도">경기도</option>
                      <option value="강원도">강원도</option>
                      <option value="충청북도">충청북도</option>
                      <option value="충청남도">충청남도</option>
                      <option value="전라북도">전라북도</option>
                      <option value="전라남도">전라남도</option>
                      <option value="경상북도">경상북도</option>
                      <option value="경상남도">경상남도</option>
                      <option value="제주도">제주도</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    상세 주소 *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="예: 광안리 수변공원 주차장"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* 모임 세부사항 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                모임 세부사항
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    진행 시간 (분) *
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    min="30"
                    max="480"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="60"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="maxParticipants"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    최대 참가자 수 *
                  </label>
                  <input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    min="2"
                    max="50"
                    required
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="difficultyLevel"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    난이도 *
                  </label>
                  <div className="relative">
                    <select
                      id="difficultyLevel"
                      name="difficultyLevel"
                      required
                      value={formData.difficultyLevel}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="초급">초급</option>
                      <option value="중급">중급</option>
                      <option value="고급">고급</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  참가비 (원)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0 (무료인 경우 0 입력)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  무료 모임인 경우 0을 입력하세요
                </p>
              </div>
            </div>

            {/* 주최자 정보 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                주최자 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="organizer"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    주최자 이름 *
                  </label>
                  <input
                    id="organizer"
                    name="organizer"
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    연락처 *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    이메일 *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                삭제하기
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/activities/${activityId}`)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? '수정 중...' : '수정 완료'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}