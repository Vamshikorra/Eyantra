import React, { useState } from 'react';
import { Calendar, User, MessageCircle, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Post } from '../../types';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Arduino Workshop - Advanced IoT Programming',
    content: 'Join us for an advanced Arduino workshop focusing on IoT programming and sensor integration. This workshop will cover WiFi modules, cloud connectivity, and real-time data visualization.',
    type: 'event',
    author: {
      id: '2',
      name: 'Secretary',
      email: 'secretary@student.nitandhra.ac.in',
      role: 'secretary',
      batch: '2021',
      joinedAt: new Date(),
      isActive: true
    },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    status: 'published',
    tags: ['Arduino', 'IoT', 'Programming'],
    comments: []
  },
  {
    id: '2',
    title: 'Hackathon 2024 Registration Open',
    content: 'Registration is now open for our annual hackathon! This year\'s theme is "Smart Cities" and we\'re looking for innovative solutions to urban challenges. Prizes worth ₹50,000 await the winners!',
    type: 'announcement',
    author: {
      id: '1',
      name: 'Admin User',
      email: 'admin@student.nitandhra.ac.in',
      role: 'admin',
      batch: '2022',
      joinedAt: new Date(),
      isActive: true
    },
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    status: 'published',
    tags: ['Hackathon', 'Competition', 'Registration'],
    comments: []
  }
];

export const PostsList: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [posts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<'all' | 'announcement' | 'event' | 'newsletter' | 'achievement'>('all');

  const filteredPosts = posts.filter(post => filter === 'all' || post.type === filter);

  const getTypeColor = (type: string) => {
    const colors = {
      announcement: 'bg-blue-100 text-blue-800',
      event: 'bg-green-100 text-green-800',
      newsletter: 'bg-purple-100 text-purple-800',
      achievement: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending_approval':
        return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'draft':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts & Notifications</h1>
          <p className="text-gray-600 mt-2">Manage announcements, events, and communications</p>
        </div>
        
        {hasPermission('post_create') && (
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create New Post
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Posts' },
            { key: 'announcement', label: 'Announcements' },
            { key: 'event', label: 'Events' },
            { key: 'newsletter', label: 'Newsletter' },
            { key: 'achievement', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                filter === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(post.status)}
                    <span className="text-xs text-gray-500 capitalize">{post.status.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {(hasPermission('post_moderate') || post.author.id === user?.id) && (
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <MessageCircle className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No posts have been created yet.' : `No ${filter} posts found.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};