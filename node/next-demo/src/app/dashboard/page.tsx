export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 사용자</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 상품</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 주문</p>
              <p className="text-2xl font-bold text-gray-900">890</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 매출</p>
              <p className="text-2xl font-bold text-gray-900">₩12.3M</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">새로운 주문이 접수되었습니다</p>
              <p className="text-sm text-gray-600">주문 #12345</p>
            </div>
            <span className="text-sm text-gray-500">5분 전</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">새로운 사용자가 가입했습니다</p>
              <p className="text-sm text-gray-600">user@example.com</p>
            </div>
            <span className="text-sm text-gray-500">10분 전</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900">상품이 업데이트되었습니다</p>
              <p className="text-sm text-gray-600">상품 ID: PRD-001</p>
            </div>
            <span className="text-sm text-gray-500">1시간 전</span>
          </div>
        </div>
      </div>
    </div>
  );
}
