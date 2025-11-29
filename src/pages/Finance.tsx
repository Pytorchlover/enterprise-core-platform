import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Building2, Search, Bell, User, Menu, X, ChevronRight, ChevronLeft,
  DollarSign, FolderOpen, Users, CheckCircle, Plus, BarChart2,
  Filter, Download, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// Mock financial data
const financialStats = [
  { title: '总收入', value: '¥2,500,000', change: '+15%', color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' },
  { title: '总支出', value: '¥1,800,000', change: '+8%', color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200' },
  { title: '净利润', value: '¥700,000', change: '+25%', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' },
  { title: '现金流', value: '¥450,000', change: '+18%', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200' },
];

// Mock income data
const incomeData = [
  { month: 'Jan', income: 450000, expenses: 320000 },
  { month: 'Feb', income: 520000, expenses: 380000 },
  { month: 'Mar', income: 480000, expenses: 350000 },
  { month: 'Apr', income: 610000, expenses: 420000 },
  { month: 'May', income: 550000, expenses: 390000 },
  { month: 'Jun', income: 680000, expenses: 480000 },
];

// Mock expense breakdown data
const expenseBreakdownData = [
  { category: '人力成本', amount: 800000 },
  { category: '运营费用', amount: 450000 },
  { category: '营销费用', amount: 300000 },
  { category: '其他费用', amount: 250000 },
];

const Finance: React.FC = () => {
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
              placeholder="搜索财务数据..."
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
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">财务管理</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                财务数据与报表
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center">
                <Filter size={16} className="mr-2" /> 筛选
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center">
                <Plus size={16} className="mr-2" /> 生成报表
              </button>
            </div>
          </div>
          
          {/* 财务数据卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {financialStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
              >
                <div className={`p-2 rounded-md ${stat.color} w-fit mb-3`}>
                  <BarChart2 size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-xs mt-2 font-medium ${stat.color.includes('green') ? 'text-green-600 dark:text-green-400' : stat.color.includes('red') ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {stat.change} 环比
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 财务报表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">收入与支出趋势</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData}>
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
                      dataKey="income" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="收入"
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="支出"
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">支出分类统计</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseBreakdownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#374151'} />
                    <XAxis 
                      dataKey="category" 
                      stroke={theme === 'light' ? '#64748b' : '#94a3b8'}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                        borderColor: theme === 'light' ? '#e2e8f0' : '#374151',
                        color: theme === 'light' ? '#1e293b' : '#f8fafc'
                      }}
                      formatter={(value: number) => [`¥${value.toLocaleString()}`, '金额']}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      name="金额"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Finance;
