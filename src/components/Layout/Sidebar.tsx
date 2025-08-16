import React from 'react';
import { 
  Home, 
  Bell, 
  Calendar, 
  Image, 
  Users, 
  Trophy, 
  BookOpen, 
  FileText, 
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  permission?: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'posts', label: 'Posts & Notifications', icon: Bell, permission: 'post_create' },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'members', label: 'Members', icon: Users, permission: 'member_view' },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'newsletter', label: 'Newsletter', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange }) => {
  const { hasPermission, user } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission) || user?.role === 'admin'
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => onSectionChange(activeSection)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4">
          {hasPermission('post_create') && (
            <button className="w-full mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </button>
          )}

          <nav className="space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
        </div>
      </div>
    </>
  );
};