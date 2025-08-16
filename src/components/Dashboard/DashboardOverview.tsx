import React from 'react';
import { Users, Calendar, Image, Trophy, Bell, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: string;
}> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">{trend}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    if (user?.role === 'admin' || user?.role === 'secretary') {
      return [
        { title: 'Total Members', value: 156, icon: Users, color: 'bg-blue-600', trend: '+12 this month' },
        { title: 'Active Events', value: 8, icon: Calendar, color: 'bg-green-600', trend: '2 upcoming' },
        { title: 'Gallery Items', value: 234, icon: Image, color: 'bg-purple-600', trend: '+18 this week' },
        { title: 'Achievements', value: 42, icon: Trophy, color: 'bg-orange-600', trend: '3 recent' },
      ];
    }
    
    return [
      { title: 'My Events', value: 5, icon: Calendar, color: 'bg-blue-600' },
      { title: 'Notifications', value: 12, icon: Bell, color: 'bg-green-600' },
      { title: 'Gallery Views', value: 89, icon: Image, color: 'bg-purple-600' },
      { title: 'Comments', value: 23, icon: Users, color: 'bg-orange-600' },
    ];
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in the e-Yantra community today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700">New workshop on IoT scheduled for next week</p>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Team Alpha won the robotics competition</p>
              <span className="text-xs text-gray-500">5h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-700">New project showcase added to gallery</p>
              <span className="text-xs text-gray-500">1d ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">Arduino Workshop</h4>
              <p className="text-sm text-gray-600">Tomorrow, 2:00 PM - 5:00 PM</p>
              <p className="text-xs text-gray-500">Electronics Lab</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">Hackathon 2024</h4>
              <p className="text-sm text-gray-600">Dec 15-17, 2024</p>
              <p className="text-xs text-gray-500">Main Auditorium</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-gray-900">Project Presentation</h4>
              <p className="text-sm text-gray-600">Dec 20, 2024, 10:00 AM</p>
              <p className="text-xs text-gray-500">Seminar Hall</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific Quick Actions */}
      {(user?.role === 'admin' || user?.role === 'secretary') && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
              <Bell className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Create Announcement</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Schedule Event</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Members</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};