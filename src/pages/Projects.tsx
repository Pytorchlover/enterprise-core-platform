import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Search, Bell, User, Menu, X, ChevronRight, ChevronLeft,
  DollarSign, FolderOpen, Users, CheckCircle, Plus, BarChart2, Clock,
  Filter, Download, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// Mock projects
const projects = [
  { id: 1, name: '企业官网重构', status: 'in_progress', progress: 75, team: 8, deadline: '2025-12-15' },
  { id: 2, name: '移动应用开发', status: 'in_progress', progress: 45, team: 5, deadline: '2026-01-20' },
  { id: 3, name: 'CRM系统升级', status: 'completed', progress: 100, team: 12, deadline: '2025-11-25' },
  { id: 4, name: '数据分析平台', status: 'pending', progress: 0, team: 3, deadline: '2026-02-10' },
  { id: 5, name: '电商平台优化', status: 'in_progress', progress: 60, team: 7, deadline: '2025-12-31' },
];

const Projects: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Menu items configuration
  const menuItems = [
    { icon: <Menu size={20} />, label: '仪表盘', path: '/dashboard' },
    { icon: <DollarSign size={20} />, label: '销售管理', path: '/sales' },
    { icon: <FolderOpen size={20} />, label: '项目管理', active: true, path: '/projects' },
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
              placeholder="搜索项目..."
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
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center w-full px-3 py-2 rounded-md mb-1 transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {item.active && !sidebarCollapsed && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                )}
              </a>
            ))}
          </nav>
        </motion.aside>
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          {/* 页面标题 */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">项目管理</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                项目进度与团队管理
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center">
                <Filter size={16} className="mr-2" /> 筛选
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center">
                <Plus size={16} className="mr-2" /> 新建项目
              </button>
            </div>
          </div>
          
          {/* 项目列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      <span>截止日期: {project.deadline}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                        : project.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                    }`}
                  >
                    {project.status === 'in_progress' ? '进行中' : project.status === 'completed' ? '已完成' : '待启动'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users size={14} className="mr-1" />
                    <span>团队: {project.team}人</span>
                  </div>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
