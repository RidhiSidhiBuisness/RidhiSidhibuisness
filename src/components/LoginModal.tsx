import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, Shield, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginType === 'admin') {
      const success = login(email, password);
      
      if (success) {
        setEmail('');
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setError('Invalid admin credentials. Please check your email and password.');
      }
    } else {
      // Customer login (placeholder for future implementation)
      setError('Customer login is not yet implemented. Please contact support.');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
    setLoginType('customer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Sign In</h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Login Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginType('customer')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                loginType === 'customer'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                loginType === 'admin'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                loginType === 'admin' ? 'bg-rose-100' : 'bg-blue-100'
              }`}>
                {loginType === 'admin' ? (
                  <Shield className={`h-8 w-8 ${loginType === 'admin' ? 'text-rose-600' : 'text-blue-600'}`} />
                ) : (
                  <User className="h-8 w-8 text-blue-600" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {loginType === 'admin' ? 'Admin Access' : 'Welcome Back'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {loginType === 'admin' 
                  ? 'Enter admin credentials to manage products' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder={loginType === 'admin' ? 'Admin email address' : 'Enter your email'}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginType === 'customer' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-rose-600 hover:text-rose-700">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className={`w-full py-3 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                loginType === 'admin'
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                `Sign In${loginType === 'admin' ? ' as Admin' : ''}`
              )}
            </button>

            {loginType === 'customer' && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button type="button" className="text-rose-600 hover:text-rose-700 font-medium">
                    Sign up
                  </button>
                </p>
              </div>
            )}

            {loginType === 'admin' && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Admin access is restricted to authorized personnel only
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;