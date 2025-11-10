export default function Home() {
  return (
    <div>
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
              로그인 후 메뉴 화면의 '모임 만들기' 를 눌러 모임 제목, 일정, 장소,
              참가 인원 수 및 간단한 설명을 입력하면 모임이 생성됩니다.
            </p>
          </div>
        </details>
      </aside>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">신규모임 & 인기모임</h1>
        <p className="text-gray-600 mt-2">
          신규모임과 인기가 활발한 모임을 확인해보세요
        </p>
      </section>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">어떻게 시작하나요?</h1>
        <p className="text-gray-600 mt-2">간단하게 4단계로 나누어 봤어요 </p>
      </section>
      <section className="max-w-6xl mx-auto mt-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">함께하는 모임공간</h1>
        <p className="text-gray-600 mt-2">
          실제 사용자분들의 휘기들을 모아보았어요{" "}
        </p>
      </section>
    </div>
  );
}
