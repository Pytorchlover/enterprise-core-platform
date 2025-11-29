import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Building2 className="h-16 w-16 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">企业一体化管理系统</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          欢迎使用企业一体化管理系统，请点击下方按钮进入仪表盘
        </p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          进入仪表盘
        </Link>
      </div>
    </div>
  );
}