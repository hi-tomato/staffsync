"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, User, LogIn, UserPlus } from "lucide-react";

const headerLink = [
  { title: "Dashboard", path: "/dashboard", icon: Home },
  { title: "Profile", path: "/profile", icon: User },
  { title: "Sign In", path: "/auth/signin", icon: LogIn },
  { title: "Sign Up", path: "/auth/signup", icon: UserPlus },
] as const;

export default function AuthHeader() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StaffSync Dashboard
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {headerLink.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPopup((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* 모바일 팝업 메뉴 */}
      {showPopup && (
        <div className="md:hidden">
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4">
              <div className="grid grid-cols-4 gap-2 ">
                {headerLink.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setShowPopup(false)}
                      className="flex flex-col items-center justify-center space-y-2 px-4 py-4 rounded-lg transition-all duration-200 font-medium text-center"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
