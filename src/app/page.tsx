export default function Home() {
  return (
    <div className="flex-grow">
      {/* <Hero /> */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">
            나중에 보자고 말만 하지 말고
          </h1>
          <h2 className="text-4xl font-bold text-purple-100">차라리 모이자!</h2>
          <div className="mt-8 flex justify-center gap-4">
            <div className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-all duration-200 flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
              <i className="ri-add-circle-line mr-2"></i>모임 만들기
            </div>
            <button
              // onClick={scrollToFilters}
              className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-all duration-200 flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg bg-white"
            >
              모든 카테고리 보기<i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </div>
      {/* <Hobby Card>*/}
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">인기 취미 카테고리</h1>
        <p className="text-gray-600 mt-2">
          관심있는 카테고리를 선택해 활동을 찾아보세요.
        </p>
      </section>
      <article className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* <!-- 취미카드 5개 --> */}
        {/* <!-- 운동 --> */}
        <a
          href="#sports"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            운동
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            헬스, 러닝, 요가 등 여러 활동 찾기
          </p>
        </a>
        {/* <!-- 요리 --> */}
        <a
          href="#cooking"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-rose-600">
            요리
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            레시피 공유부터 쿠킹 클래스까지.
          </p>
        </a>
        {/* <!-- 음악 --> */}
        <a
          href="#music"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full mb-4">
            {/* <!-- 음악 아이콘 (음표) --> */}
            <svg
              className="w-10 h-10 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19V6l10-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="16" cy="16" r="3"></circle>
            </svg>
          </div>
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            음악
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            밴드, 합주, 작곡 스터디 등.
          </p>
        </a>
        {/* <!-- 독서 --> */}
        <a
          href="#reading"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
            독서
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            북클럽, 토론 모임을 찾아보세요.
          </p>
        </a>
        {/* <!-- 사진 --> */}
        <a
          href="#photo"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-green-600">
            사진
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            촬영, 편집, 야외 촬영 모임 등.
          </p>
        </a>
        {/* <!--미술 --> */}
        <a
          href="#art"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-pink-600">
            미술
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            드로잉, 페인팅, 공예 모임 등등
          </p>
        </a>
        {/* <!-- 게임 --> */}
        <a
          href="#game"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-violet-600">
            게임
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            모바일/PC/보드게임 친구를 찾아보세요.
          </p>
        </a>
        {/* <!-- 언어 --> */}
        <a
          href="#language"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-emerald-50 rounded-full mb-4">
            {/* <!-- 언어 아이콘 (말풍선 + 글자) --> */}
            <svg
              className="w-10 h-10 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M7 8h10M7 12h4"></path>
            </svg>
          </div>
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
            언어
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            회화 스터디, 언어 교환 모임 등.
          </p>
        </a>
        {/* <!-- 여행 --> */}
        <a
          href="#travel"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-cyan-600">
            여행
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            당일치기부터 해외여행 동행까지.
          </p>
        </a>
        {/* <!-- 그 외 --> */}
        <a
          href="#others"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-stone-50 rounded-full mb-4">
            {/* <!-- 그 외 아이콘 (더보기) --> */}
            <svg
              className="w-10 h-10 text-stone-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-stone-600">
            그 외
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            기타 다양한 취미 카테고리를 확인하세요.
          </p>
        </a>
      </article>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="sm:mt-4 lg:mt-8 text-3xl sm:text-4xl font-bold">
          자주 묻는 질문
        </h1>
        <p className="text-gray-600 mt-2">
          자주 묻는 3개의 질문을 추려 보았습니다.
        </p>
      </section>
      <aside className="sm:mt-4 lg:mt-8 space-y-3">
        {/* <!-- FAQ 1: 고정 문구(로그인 관련) --> */}
        <details className="bg-white rounded-xl shadow-sm" open>
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2a7 7 0 00-7 7v3"></path>
                <path d="M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-lg font-medium text-gray-900">
                로그인이 꼭 필요합니까?
              </span>
            </div>

            <svg
              className="chev w-5 h-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 11-1.414 1.414L10 5.414 5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </summary>

          <div className="faqPanel px-5 pb-5 text-gray-700">
            <p>
              네, 꼭 필요합니다. 모임 생성, 신청이 계정 기반으로 관리되며,
              사용자 보안과 원활한 운영을 위해 로그인이 필수입니다.
            </p>
          </div>
        </details>
        {/* <!-- FAQ 2: 비용 문구 --> */}
        <details className="bg-white rounded-xl shadow-sm">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-rose-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20v-6"></path>
                <path d="M5 12a7 7 0 0114 0v1"></path>
                <path d="M3 21h18"></path>
              </svg>
              <span className="text-lg font-medium text-gray-900">
                모임 참가 시 비용은 어떻게 되나요?
              </span>
            </div>

            <svg
              className="chev w-5 h-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 11-1.414 1.414L10 5.414 5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </summary>

          <div className="faqPanel px-5 pb-5 text-gray-700">
            <p>
              대부분의 모임은 무료로 운영되지만, 재료비나 강사료가 발생하는
              경우가 있습니다.
            </p>
          </div>
        </details>
        {/* <!-- FAQ 3: 임의 문구 --> */}
        <details className="bg-white rounded-xl shadow-sm">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
              <span className="text-lg font-medium text-gray-900">
                새로운 모임은 어떻게 만들 수 있나요?
              </span>
            </div>

            <svg
              className="chev w-5 h-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 11-1.414 1.414L10 5.414 5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </summary>

          <div className="faqPanel px-5 pb-5 text-gray-700">
            <p>
              로그인 후 메뉴 화면의 &apos;모임 만들기&apos; 를 눌러 모임 제목,
              일정, 장소, 참가 인원 수 및 간단한 설명을 입력하면 모임이
              생성됩니다.
            </p>
          </div>
        </details>
      </aside>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          ⭐️ 인기모임 ⭐️ ⚡️ 신규모임 💼
        </h1>
        <p className="text-gray-600 mt-2 mb-2">
          인기모임과 신규로 등록된 모임을 확인해보세요
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {/* <!-- 음악 (인기) --> */}
        <article
          className="cardItem relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-2 p-4"
          role="article"
          aria-label="음악 카테고리"
        >
          {/* <!-- 인기 별 아이콘 (우상단) --> */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <div
              className="popularStar relative w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200 shadow-sm"
              title="인기"
            >
              {/* <!-- 별 SVG --> */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>

          {/* <!-- 카드 콘텐츠 --> */}
          <div className="flex flex-col h-full mt-3">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  음악(서울)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  밴드, 합주, 작곡 스터디
                </p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <p className="text-sm text-gray-600">
                로컬 밴드 연습부터 온라인 작곡 스터디까지 다양한 음악 모임을
                찾아보세요.
              </p>
            </div>
          </div>
        </article>
        {/* <!-- 언어 (인기) --> */}
        <article
          className="cardItem relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-2 p-4"
          role="article"
          aria-label="언어 카테고리"
        >
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <div
              className="popularStar relative w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200 shadow-sm"
              title="인기"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3">
              {/* <!-- 아이콘: 언어 --> */}
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M7 8h10M7 12h4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  언어(부산)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  회화 스터디, 언어 교환
                </p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <p className="text-sm text-gray-600">
                원어민 교류부터 회화 연습까지 다양한 언어 모임을 확인해 보세요.
              </p>
            </div>
          </div>
        </article>
        {/* <!-- 농구 (신규) --> */}
        <article
          className="cardItem relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-2 p-4"
          role="article"
          aria-label="농구 카테고리"
        >
          {/* <!-- 신규 배지 --> */}
          <div className="absolute right-4 top-4">
            <div className="newBadge inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100 shadow-sm">
              {/* <!-- 번개 아이콘 (신규 느낌) --> */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              신규
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  농구(인천)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  동네 농구 경기, 스킬 트레이닝
                </p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <p className="text-sm text-gray-600">
                주말 리그와 자유 경기, 초보자 친화적 스킬 클리닉을 제공합니다.
              </p>
            </div>
          </div>
        </article>
        {/* <!-- 사진 (신규) --> */}
        <article
          className="cardItem relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-2 p-4"
          role="article"
          aria-label="사진 카테고리"
        >
          <div className="absolute right-4 top-4">
            <div className="newBadge inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100 shadow-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21 19V7a2 2 0 0 0-2-2h-3l-2-3H10L8 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
              </svg>
              신규
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3">
              {/* <!-- 아이콘: 사진 --> */}
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  사진(대전)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  출사, 편집 클래스, 포트폴리오
                </p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <p className="text-sm text-gray-600">
                도심 출사부터 편집 워크숍까지 초보자와 중급자를 위한 모임이
                있습니다.
              </p>
            </div>
          </div>
        </article>
      </div>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">함께하는 모임공간</h1>
        <p className="text-gray-600 mt-2">
          실제 사용자분들의 후기들을 모아보았어요{" "}
        </p>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <!-- 음악 후기 컬럼 --> */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">음악 후기</h2>
          </div>
          {/* <!-- 음악 후기 1 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">test1</h3>
                    <p className="text-xs text-gray-500">2025-11-11 · 서울</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 4.5 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      4.5
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  지역 밴드 연습 모임에 참가했는데, 진행이 체계적이고 연주
                  피드백이 매우 유익했습니다. 초보자도 편하게 배울 수 있는
                  분위기였어요.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 8명</span>
                  <span>레벨: 중급</span>
                </div>
              </div>
            </div>
          </article>
          {/* <!-- 음악 후기 2 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">test2</h3>
                    <p className="text-xs text-gray-500">2025-11-10 · 서웊</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 5 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      5.0
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  온라인 작곡 스터디가 아주 실용적이었습니다. 과제와 피드백
                  루프가 잘 돌아서 실력이 빠르게 늘었어요. 강사님도 친절합니다.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 12명</span>
                  <span>레벨: 중급</span>
                </div>
              </div>
            </div>
          </article>
          {/* <!-- 음악 후기 3 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">yi1</h3>
                    <p className="text-xs text-gray-500">2025-11-08 · 서울</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 4 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      4.0
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  소규모 모임에 참여했는데, 편안한 분위기에서 실전 경험을 쌓기에
                  좋았습니다. 정기 모임으로 이어졌으면 좋겠네요.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 6명</span>
                  <span>레벨: 초급</span>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* <!-- 언어 후기 컬럼 --> */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">언어 후기</h2>
          </div>

          {/* <!-- 언어 후기 1 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">yi1</h3>
                    <p className="text-xs text-gray-500">2025-11-01 · 부산</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 5 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      5.0
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  회화 중심의 소그룹 수업이어서 실전 스피킹 연습에 도움이 많이
                  되었습니다. 다양한 국적의 참여자가 있어 문화 교류도
                  재미있었어요.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 10명</span>
                  <span>언어: 영어</span>
                </div>
              </div>
            </div>
          </article>
          {/* <!-- 언어 후기 2 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">test1</h3>
                    <p className="text-xs text-gray-500">2025-11-01 · 부산</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 4.5 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      4.5
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  소규모 튜터링에서 발음 교정과 실제 회화 팁을 많이 얻었습니다.
                  튜터 피드백이 구체적이라 만족스러웠어요.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 5명</span>
                  <span>언어: 일본어</span>
                </div>
              </div>
            </div>
          </article>
          {/* <!-- 언어 후기 3 --> */}
          <article className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition transform hover:-translate-y-1 animFadeUp">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">test2</h3>
                    <p className="text-xs text-gray-500">2025-11-07 · 부산</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <!-- 별점 4 --> */}
                    <span className="text-yellow-500 flex items-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.635-8.694L.6 9.75l7.732-1.732z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      4.0
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  언어 교환 모임에서 자연스럽게 말문을 트게 되었어요. 정기적으로
                  참가하면 실력이 꾸준히 늘 것 같습니다.
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>참가자: 4명</span>
                  <span>언어: 독일어</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">추천 카테고리</h1>
        <p className="text-gray-600 mt-2">현재 추천하는 카테고리 5개입니다</p>
      </section>
      <article className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* <!-- 음악 --> */}
        <a
          href="#music"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full mb-4">
            {/* <!-- 음악 아이콘 (음표) --> */}
            <svg
              className="w-10 h-10 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19V6l10-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="16" cy="16" r="3"></circle>
            </svg>
          </div>
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            음악
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            밴드, 합주, 작곡 스터디 등.
          </p>
        </a>
        {/* <!-- 언어 --> */}
        <a
          href="#language"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-emerald-50 rounded-full mb-4">
            {/* <!-- 언어 아이콘 (말풍선 + 글자) --> */}
            <svg
              className="w-10 h-10 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M7 8h10M7 12h4"></path>
            </svg>
          </div>
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
            언어
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            회화 스터디, 언어 교환 모임 등.
          </p>
        </a>
        {/* <!-- 여행 --> */}
        <a
          href="#travel"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-cyan-600">
            여행
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            당일치기부터 해외여행 동행까지.
          </p>
        </a>
        {/* <!-- 운동 --> */}
        <a
          href="#sports"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            운동
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            헬스, 러닝, 요가 등 여러 활동 찾기
          </p>
        </a>
        {/* <!-- 사진 --> */}
        <a
          href="#photo"
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center transform hover:-translate-y-1"
        >
          <h3 className="sm:mt-4 lg:mt-8 text-lg font-semibold text-gray-900 group-hover:text-green-600">
            사진
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            촬영, 편집, 야외 촬영 모임 등.
          </p>
        </a>
      </article>
    </div>
  );
}
