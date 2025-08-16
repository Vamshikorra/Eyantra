import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { PostsList } from './components/Posts/PostsList';
import { EventsCalendar } from './components/Events/EventsCalendar';
import { Gallery } from './components/Gallery/Gallery';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'posts':
        return <PostsList />;
      case 'events':
        return <EventsCalendar />;
      case 'gallery':
        return <Gallery />;
      case 'members':
        return (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Members Management</h3>
              <p className="text-sm text-gray-500">Member management interface coming soon!</p>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Achievements Showcase</h3>
              <p className="text-sm text-gray-500">Achievements showcase coming soon!</p>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Resource Library</h3>
              <p className="text-sm text-gray-500">Resource management interface coming soon!</p>
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Newsletter & Blog</h3>
              <p className="text-sm text-gray-500">Newsletter interface coming soon!</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className={`transition-all duration-300 ease-in-out pt-16 ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;