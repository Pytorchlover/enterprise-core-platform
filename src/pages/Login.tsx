import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("请输入用户名和密码");
      return;
    }

    setLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        toast.success("登录成功");
        navigate("/dashboard");
      } else {
        toast.error("用户名或密码错误");
      }
    } catch (error) {
      toast.error("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          登录企业管理系统
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
          请输入您的账户信息
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="请输入用户名"
              disabled={loading}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                密码
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                忘记密码？
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="请输入密码"
              disabled={loading}
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              记住我
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            } text-white`}
            disabled={loading}
          >
            {loading ? "登录中..." : "登录"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            还没有账户？{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              立即注册
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
