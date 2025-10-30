import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AuthButtons from "@/component/auth_buttons";
import CreateMoimButton from "@/component/create_moin_button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nabo Chamo",
  description: "지역 기반 취미활동 공유 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 헤더 */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* 로고 */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <span
                    className="text-2xl font-bold text-purple-600"
                    style={{ fontFamily: "Pacifico, serif" }}
                  >
                    Nabo Chamo
                  </span>
                </Link>
              </div>

              {/* 네비게이션 (데스크탑) */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    홈
                  </Link>
                  <Link
                    href="/activities"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    모임 게시판
                  </Link>
                  <Link
                    href="/create-activity"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    모임 만들기
                  </Link>
                </div>
              </div>

              {/* 모임 만들기 버튼 (데스크탑) */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 space-x-4">
                  <AuthButtons />
                  <CreateMoimButton />
                </div>
              </div>

              {/* 모바일 메뉴 버튼 */}
              <div className="md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 
                  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  <span className="sr-only">Open main menu</span>
                  <i className="ri-menu-line text-xl"></i>
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-grow">{children}</main>

        {/* 푸터 */}
        <footer className="bg-gray-900 text-white mt-8">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* 로고 & 설명 */}
              <div className="lg:col-span-1">
                <div
                  className="text-2xl font-bold text-blue-400 mb-4"
                  style={{ fontFamily: "Pacifico, serif" }}
                >
                  Nabo Chamo
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  지역 기반 취미활동 공유 플랫폼으로 새로운 사람들과 함께하는
                  즐거운 경험을 제공합니다.
                </p>
                <div className="flex space-x-4">
                  {[
                    "facebook-fill",
                    "instagram-line",
                    "twitter-fill",
                    "youtube-fill",
                  ].map((icon) => (
                    <a
                      key={icon}
                      href="#"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <i className={`ri-${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* 섹션: 플랫폼 */}
              <FooterColumn
                title="플랫폼"
                links={[
                  { text: "모임 찾기", href: "/activities" },
                  { text: "모임 만들기", href: "/create-activity" },
                  { text: "활동 달력", href: "#" },
                  { text: "지역별 모임", href: "/activities" },
                ]}
              />

              {/* 섹션: 고객지원 */}
              <FooterColumn
                title="고객지원"
                links={[
                  { text: "이용가이드", href: "#" },
                  { text: "자주 묻는 질문", href: "#" },
                  { text: "고객센터", href: "#" },
                  { text: "신고하기", href: "#" },
                ]}
              />

              {/* 섹션: 회사 */}
              <FooterColumn
                title="회사"
                links={[
                  { text: "회사소개", href: "/about" },
                  { text: "채용정보", href: "#" },
                  { text: "파트너십", href: "#" },
                  { text: "언론보도", href: "#" },
                ]}
              />

              {/* 섹션: 약관 및 정책 */}
              <FooterColumn
                title="약관 및 정책"
                links={[
                  { text: "이용약관", href: "#" },
                  { text: "개인정보처리방침", href: "#" },
                  { text: "위치기반서비스", href: "#" },
                  { text: "운영정책", href: "#" },
                ]}
              />
            </div>

            {/* 하단 바 */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
                  <p>© 2025 Nabo Chamo. All rights reserved.</p>
                  <p>
                    사업자등록번호: 123-45-67890 | 대표자: 김개발 | 주소: 서울시
                    강남구 테헤란로 123
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://readdy.ai/?origin=logo"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Made with Readdy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

// 재사용 가능한 푸터 컬럼 컴포넌트
interface FooterColumnProps {
  title: string;
  links: Array<{ text: string; href: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
