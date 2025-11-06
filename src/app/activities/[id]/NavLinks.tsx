"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const params = useParams();

  const id = params?.id;

  const navItems = [
    { href: `/activities/${id}`, label: "모임" },
    { href: "/posts/", label: "게시판" },
    { href: "/create-activity", label: "갤러리" },
  ];

  return (
    <div className="flex items-baseline space-x-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
          >
            {item.label}
            {/* 활성화 밑줄 */}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transition-all duration-300 ${
                isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
