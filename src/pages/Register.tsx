import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";
import { z } from "zod";

// Form validation schema
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "用户名至少3个字符")
      .max(20, "用户名最多20个字符"),
    email: z.string().email("请输入有效的邮箱地址"),
    password: z
      .string()
      .min(6, "密码至少6个字符")
      .max(20, "密码最多20个字符"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不匹配",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    try {
      registerSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);
    
    try {
      const success = await register(
        formData.username,
        formData.email,
        formData.password
      );
      
      if (success) {
        toast.success("注册成功，请登录");
        navigate("/login");
      } else {
        toast.error("注册失败，请稍后重试");
      }
    } catch (error) {
      toast.error("注册失败，请稍后重试");
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
          注册企业管理系统
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
          创建您的账户
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
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.username
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              placeholder="请输入用户名"
              disabled={loading}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.email
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              placeholder="请输入邮箱"
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.password
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              placeholder="请输入密码"
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              确认密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              placeholder="请再次输入密码"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                {errors.confirmPassword}
              </p>
            )}
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
            {loading ? "注册中..." : "注册"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            已有账户？{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              立即登录
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
