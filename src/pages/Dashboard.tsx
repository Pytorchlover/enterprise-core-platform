import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Building2, Search, Bell, User, Menu, X, ChevronRight, ChevronLeft,
  DollarSign, FolderOpen, Users, CheckCircle, Plus, Briefcase,
  Mail, FileText, CheckSquare, Database, Calendar, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/authContext';

// 模拟销售数据
const salesData = Array(30).fill(0).map((_, index) => ({
  day: index + 1,
  sales: Math.floor(Math.random() * 50000) + 50000
}));

// 模拟项目状态数据
const projectStatusData = [
  { name: '进行中', value: 60, color: '#2563eb' },
  { name: '已完成', value: 30, color: '#10b981' },
  { name: '延迟', value: 10, color: '#ef4444' }
];

// 模拟销售渠道数据
const salesChannelData = [
  { name: '线上', value: 40, color: '#2563eb' },
  { name: '线下', value: 35, color: '#6366f1' },
  { name: '合作伙伴', value: 25, color: '#8b5cf6' }
];

// 模拟最近活动数据
const recentActivitiesData = [
  {
    id: 1,
    time: '2025-11-29 10:30',
    user: '张三',
    action: '创建了新订单 #12345',
    status: '已完成',
    statusColor: 'bg-green-500'
  },
  {
    id: 2,
    time: '2025-11-29 09:15',
    user: '李四',
    action: '提交了项目方案 #67890',
    status: '进行中',
    statusColor: 'bg-blue-500'
  },
  {
    id: 3,
    time: '2025-11-28 16:45',
    user: '王五',
    action: '邀请了新员工 赵六',
    status: '已完成',
    statusColor: 'bg-green-500'
  },
  {
    id: 4,
    time: '2025-11-28 14:20',
    user: '赵六',
    action: '更新了财务报表',
    status: '进行中',
    statusColor: 'bg-blue-500'
  },
  {
    id: 5,
    time: '2025-11-28 11:10',
    user: '张三',
    action: '审批了报销申请 #54321',
    status: '已完成',
    statusColor: 'bg-green-500'
  }
];

// 模拟通知数据
const notificationsData = [
  { id: 1, message: '销售目标已完成80%', time: '10分钟前' },
  { id: 2, message: '新项目"企业官网重构"已创建', time: '1小时前' },
  { id: 3, message: '李四提交了请假申请', time: '3小时前' }
];

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 切换主题
  const handleThemeToggle = () => {
    toggleTheme();
    toast(`已切换到${theme === 'light' ? '深色' : '浅色'}模式`);
  };

  // 快速操作按钮点击处理
  const handleQuickAction = (action: string) => {
    toast(`${action}功能即将上线`);
  };

  // 菜单项配置
  const menuItems = [
    { icon: <Menu size={20} />, label: '仪表盘', path: '/dashboard' },
    { icon: <DollarSign size={20} />, label: '销售管理', path: '/sales' },
    { icon: <Briefcase size={20} />, label: '项目管理', path: '/projects' },
    { icon: <Users size={20} />, label: '人力资源', path: '/hr' },
    { icon: <FileText size={20} />, label: '财务管理', path: '/finance' },
    { icon: <CheckSquare size={20} />, label: '系统设置', path: '/settings' }
  ];

  // 快速操作按钮配置
  const quickActions = [
    { icon: <Plus size={20} />, label: '创建新订单', onClick: () => handleQuickAction('创建新订单') },
    { icon: <Briefcase size={20} />, label: '新增项目', onClick: () => handleQuickAction('新增项目') },
    { icon: <Mail size={20} />, label: '邀请员工', onClick: () => handleQuickAction('邀请员工') },
    { icon: <FileText size={20} />, label: '生成报表', onClick: () => handleQuickAction('生成报表') },
    { icon: <CheckSquare size={20} />, label: '审批请求', onClick: () => handleQuickAction('审批请求') },
      { icon: <Database size={20} />, label: '系统备份', onClick: () => handleQuickAction('系统备份') },
  ];

  // 数据概览卡片配置
  const statsCards = [
    { icon: <DollarSign size={24} />, title: '总销售额', value: '¥1,234,567', growth: '+12%', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' },
    { icon: <FolderOpen size={24} />, title: '活跃项目', value: '45', growth: '+8%', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200' },
    { icon: <Users size={24} />, title: '员工总数', value: '123', growth: '+5%', color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' },
    { icon: <CheckCircle size={24} />, title: '待办任务', value: '78', growth: '+15%', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200' }
  ];

  // 卡片动画变体
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  // 图表动画变体
  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  // 图表元素动画变体
  const chartItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // 最近活动动画变体
  const activityVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  // 快速操作动画变体
  const quickActionVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
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
              placeholder="搜索..."
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
                  {notificationsData.length}
                </span>
              </button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-medium text-gray-900 dark:text-white">通知</h3>
                  </div>
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notificationsData.map(notification => (
                      <li key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-left">
                      查看全部通知
                    </button>
                  </div>
                </motion.div>
              )}
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
              
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700"
                >
                  <ul className="py-1">
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        个人设置
                      </button>
                    </li>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        账户安全
                      </button>
                    </li>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        帮助中心
                      </button>
                    </li>
                    <li>
                      
                                          <button
                                              onClick={logout}
                                              className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                              退出登录
                                            </button>
                      
                    </li>
                  </ul>
                </motion.div>
              )}
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
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">仪表盘概览</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              欢迎回来，{user?.username}，这是您的企业运营数据概览
            </p>
          </div>
          
          {/* 数据概览卡片区 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
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
              </motion.div>
            ))}
          </div>
          
          {/* 图表展示区 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* 销售趋势折线图 */}
            <motion.div
              variants={chartVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700 lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">销售趋势 (近30天)</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    今日
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    本周
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    本月
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#374151'} />
                    <XAxis dataKey="day" stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <YAxis stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                        borderColor: theme === 'light' ? '#e2e8f0' : '#374151',
                        color: theme === 'light' ? '#1e293b' : '#f8fafc'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* 项目状态饼图 */}
            <motion.div
              variants={chartItemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">项目状态分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '占比']}
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
            </motion.div>
            
            {/* 销售渠道柱状图 */}
            <motion.div
              variants={chartItemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">销售渠道分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesChannelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#374151'} />
                    <XAxis dataKey="name" stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <YAxis stroke={theme === 'light' ? '#64748b' : '#94a3b8'} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '占比']}
                      contentStyle={{
                        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                        borderColor: theme === 'light' ? '#e2e8f0' : '#374151',
                        color: theme === 'light' ? '#1e293b' : '#f8fafc'
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {salesChannelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* 快速操作区 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                variants={quickActionVariants}
                whileHover="hover"
                onClick={action.onClick}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-2">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* 最近动态区 */}
          <motion.div
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">最近动态</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                查看全部
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivitiesData.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  custom={index}
                  variants={activityVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                          {activity.action}
                        </p>
                      </div>
                      <span className={`ml-2 h-2 w-2 rounded-full ${activity.statusColor}`}></span>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{activity.time.split(' ')[0]}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{activity.time.split(' ')[1]}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;