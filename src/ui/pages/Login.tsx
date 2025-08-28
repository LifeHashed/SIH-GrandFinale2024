import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    username: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages

  const handleLogin = async () => {
    setLoginAttempted(true);

    try {
      // Send login request to the backend
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoginStatus('success');
        setTimeout(() => {
          navigate('/'); // Navigate to the home page on successful login
        }, 1000);
      } else {
        const error = await response.json();
        setLoginStatus('error');
        setErrorMessage(error.detail || 'Invalid login credentials');
      }
    } catch (error) {
      // Handle network or unexpected errors
      setLoginStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if (loginStatus !== '') {
      const timer = setTimeout(() => {
        setLoginAttempted(false);
        setLoginStatus('');
        setErrorMessage(''); // Clear error message
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full p-6 flex items-center justify-center bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Redact X</h1>
      </div>

      <div className="w-full max-w-md px-6 mt-10">
        <div
          className={`bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 
          ${loginAttempted ? (loginStatus === 'success' ? 'border-4 border-green-500' : 'border-4 border-red-500') : ''}`}
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login to Redact X</h2>

          <div className="mb-6">
            <div className={`relative transition-all duration-300 ${inputFocus.username ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setInputFocus((prev) => ({ ...prev, username: true }))}
                onBlur={() => setInputFocus((prev) => ({ ...prev, username: false }))}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300 
                  ${inputFocus.username ? 'border-blue-500 shadow-md' : 'border-gray-300'} 
                  ${loginAttempted && loginStatus === 'error' ? 'animate-shake' : ''}`}
                disabled={loginAttempted}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className={`relative transition-all duration-300 ${inputFocus.password ? 'scale-105' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInputFocus((prev) => ({ ...prev, password: true }))}
                onBlur={() => setInputFocus((prev) => ({ ...prev, password: false }))}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300 pr-12
                  ${inputFocus.password ? 'border-blue-500 shadow-md' : 'border-gray-300'} 
                  ${loginAttempted && loginStatus === 'error' ? 'animate-shake' : ''}`}
                disabled={loginAttempted}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className={`w-full text-white p-3 rounded-lg 
              transition-all duration-300 transform 
              ${!loginAttempted 
                ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95' 
                : loginStatus === 'success' 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-red-500 animate-shake'}`}
            disabled={loginAttempted}
          >
            {loginAttempted ? (loginStatus === 'success' ? 'Redirecting...' : 'Try Again') : 'Login'}
          </button>

          {loginStatus === 'success' && (
            <div className="mt-4 text-center">
              <p className="text-green-600 animate-bounce">Welcome to Redact X!</p>
            </div>
          )}

          {loginStatus === 'error' && (
            <div className="mt-4 text-center">
              <p className="text-red-600">{errorMessage}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Register New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
