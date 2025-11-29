import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Building2, Search, Bell, User, Menu, X, ChevronRight, ChevronLeft,
  DollarSign, FolderOpen, Users, CheckCircle, Plus, BarChart2,
  Filter, Download, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// Mock sales data
const salesData = [
  { month: 'Jan', sales: 120000, profit: 45000 },
  { month: 'Feb', sales: 145000, profit: 52000 },
  { month: 'Mar', sales: 178000, profit: 68000 },
  { month: 'Apr', sales: 156000, profit: 58000 },
  { month: 'May', sales: 201000, profit: 85000 },
  { month: 'Jun', sales: 234000, profit: 98000 },
];

// Mock profit analysis data
const profitAnalysisData = [
  { name: '产品销售', value: 45, color: '#2563eb' },
  { name: '服务收入', value: 30, color: '#10b981' },
  { name: '其他收入', value: 15, color: '#f59e0b' },
  { name: '成本支出', value: 10, color: '#ef4444' }
];

// Mock recent orders
const recentOrders = [
  { id: 12345, customer: 'ABC Company', amount: 12500, status: 'completed', date: '2025-11-29' },
  { id: 12344, customer: 'XYZ Corporation', amount: 8900, status: 'pending', date: '2025-11-28' },
  { id: 12343, customer: '123 Industries', amount: 23450, status: 'completed', date: '2025-11-27' },
  { id: 12342, customer: 'Tech Solutions', amount: 15600, status: 'failed', date: '2025-11-26' },
  { id: 12341, customer: 'Global Services', amount: 9870, status: 'completed', date: '2025-11-25' },
];

const Sales: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Menu items configuration
  const menuItems = [
    { icon: <Menu size={20} />, label: '仪表盘', path: '/dashboard' },
    { icon: <DollarSign size={20} />, label: '销售管理', path: '/sales' },
    { icon: <FolderOpen size={20} />, label: '项目管理', path: '/projects' },
    { icon: <Users size={20} />, label: '人力资源', path: '/hr' },
    { icon: <BarChart2 size={20} />, label: '财务管理', path: '/finance' },
    { icon: <CheckCircle size={20} />, label: '系统设置', path: '/settings' },
  ];
  
  // Stats cards configuration
  const statsCards = [
    { icon: <DollarSign size={24} />, title: '总销售额', value: '¥1,234,567', growth: '+12%', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' },
    { icon: <BarChart2 size={24} />, title: '订单数量', value: '456', growth: '+8%', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200' },
    { icon: <Users size={24} />, title: '客户数', value: '123', growth: '+5%', color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' },
    { icon: <CheckCircle size={24} />, title: '完成率', value: '78%', growth: '+15%', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200' },
  ];
  
  // Toggle theme
  const handleThemeToggle = () => {
    toggleTheme();
    toast(`已切换到${theme === 'light' ? '深色' : '浅色'}模式`);
  };
  
  return (
    <div className={`flex flex-col h-screen bg-gray-100 dark:bg-[#1a1f35] transition-colors duration-300`}>
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">企业一体化管理系统</h1>
          </div>
          
          <div className="hidden md:flex relative flex-1 max-w-md mx-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="搜索销售数据..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">管理员</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <motion.aside
          className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          } transition-all duration-300 ease-in-out z-10`}
          initial={{ width: sidebarCollapsed ? 64 : 256 }}
          animate={{ width: sidebarCollapsed ? 64 : 256 }}
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
          <nav className="px-2 py-4">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center w-full px-3 py-2 rounded-md mb-1 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {isActive && !sidebarCollapsed && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </motion.aside>
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          {/* 页面标题 */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">销售管理</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                销售数据概览与管理
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center">
                <Filter size={16} className="mr-2" /> 筛选
              </button>
              <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center">
                <Download size={16} className="mr-2" /> 导出
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center">
                <Plus size={16} className="mr-2" /> 新建订单
              </button>
            </div>
          </div>
          
          {/* 数据概览卡片区 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-md ${card.color}`}>
                    {card.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                    {card.growth}
                    <span className="ml-1">环比增长</span>
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 图表展示区 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 销售趋势图 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">销售趋势</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    本月
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    本季
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    本年
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#374151'} />
                    <XAxis dataKey="month" stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <YAxis stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                        borderColor: theme === 'light' ? '#e2e8f0' : '#374151',
                        color: theme === 'light' ? '#1e293b' : '#f8fafc'
                      }}
                      formatter={(value: number) => [`¥${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      name="销售额"
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="利润"
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* 利润分析图 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">利润分析</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    本月
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    本季
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={profitAnalysisData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {profitAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, '占比']}
                      contentStyle={{
                        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                        borderColor: theme === 'light' ? '#e2e8f0' : '#374151',
                        color: theme === 'light' ? '#1e293b' : '#f8fafc'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* 最近订单表格 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">最近订单</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                查看全部 <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">订单号</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">客户</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">金额</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-medium">#{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">¥{order.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                          }`}
                        >
                          {order.status === 'completed' ? '已完成' : order.status === 'pending' ? '待处理' : '失败'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sales;
