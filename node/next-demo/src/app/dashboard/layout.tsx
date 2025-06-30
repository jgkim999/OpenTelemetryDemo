'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: '📊',
  },
  {
    title: '사용자 관리',
    href: '/dashboard/users',
    icon: '👥',
  },
  {
    title: '상품 관리',
    href: '/dashboard/products',
    icon: '📦',
  },
  {
    title: '주문 관리',
    href: '/dashboard/orders',
    icon: '🛒',
  },
  {
    title: '분석',
    href: '/dashboard/analytics',
    icon: '📈',
  },
  {
    title: '설정',
    href: '/dashboard/settings',
    icon: '⚙️',
  },
  {
    title: '리포트',
    href: '/dashboard/reports',
    icon: '📋',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              ☰
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              🔔
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-16'
          } bg-white shadow-sm border-r border-gray-200 transition-all duration-300 ease-in-out`}
        >
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {isSidebarOpen && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
