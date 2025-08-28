import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { FileText, Image, FileUp, Clock, Video, LogOut } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RedactionCard } from './components/RedactionCard';
import { TextRedaction } from './pages/TextRedaction';
import { PDFRedaction } from './pages/PDFRedaction';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { useThemeStore } from './store/theme';

function Home() {
  const navigate = useNavigate();
  const redactionOptions = [
    {
      icon: FileText,
      title: 'Text Redaction',
      description: 'Redact sensitive information from text input',
      path: '/text-redaction',
    },
    {
      icon: FileUp,
      title: 'File Redaction',
      description: 'Redact sensitive information from any document of any extension',
      path: '/pdf-redaction',
    },
    {
      icon: Clock,
      title: 'History',
      description: 'View your last 25 redaction operations',
      path: '/history',
    },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <main className="pt-24 px-4 pb-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Choose Redaction Type</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {redactionOptions.map((option) => (
          <RedactionCard
            key={option.title}
            icon={option.icon}
            title={option.title}
            description={option.description}
            onClick={() => navigate(option.path)}
          />
        ))}
      </div>
    </main>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useThemeStore();

  return (
    <HashRouter>
      <div className={theme}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          {/* Conditionally render Header and Sidebar only if the current path is not '/login' */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header onMenuClick={() => setIsSidebarOpen(true)} />
                  <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                  <Home />
                </>
              }
            />
            <Route
              path="/text-redaction"
              element={
                <>
                  <Header onMenuClick={() => setIsSidebarOpen(true)} />
                  <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                  <TextRedaction />
                </>
              }
            />
            <Route
              path="/pdf-redaction"
              element={
                <>
                  <Header onMenuClick={() => setIsSidebarOpen(true)} />
                  <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                  <PDFRedaction />
                </>
              }
            />
            {/* Login page without Header or Sidebar */}
            <Route path="/login" element={<LoginPage />} />

            {/* Register page without Header or Sidebar */}
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;



