import Link from "next/link";
import NavLinks from "./NavLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* 네비게이션 */}
            <NavLinks />
          </div>
        </nav>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-grow">{children}</div>
    </>
  );
}
