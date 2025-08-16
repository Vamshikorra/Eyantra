import React, { useState } from 'react';
import { Image, Video, Calendar, User, Eye, Download, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GalleryItem } from '../../types';

const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Robotics Workshop 2024',
    description: 'Students working on autonomous robots during the annual workshop',
    url: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'image',
    category: 'workshop',
    year: 2024,
    event: 'Robotics Workshop',
    uploadedBy: {
      id: '2',
      name: 'Secretary',
      email: 'secretary@student.nitandhra.ac.in',
      role: 'secretary',
      batch: '2021',
      joinedAt: new Date(),
      isActive: true
    },
    uploadedAt: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    title: 'Hackathon Team Alpha',
    description: 'Team Alpha presenting their smart city solution',
    url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'image',
    category: 'competition',
    year: 2024,
    event: 'Hackathon 2024',
    uploadedBy: {
      id: '1',
      name: 'Admin User',
      email: 'admin@student.nitandhra.ac.in',
      role: 'admin',
      batch: '2022',
      joinedAt: new Date(),
      isActive: true
    },
    uploadedAt: new Date(Date.now() - 172800000)
  },
  {
    id: '3',
    title: 'Arduino Project Showcase',
    description: 'Final projects displayed during the semester showcase',
    url: 'https://images.pexels.com/photos/159844/circuit-circuit-board-resistor-computer-159844.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'image',
    category: 'project',
    year: 2024,
    event: 'Project Showcase',
    uploadedBy: {
      id: '3',
      name: 'Student User',
      email: 'student@student.nitandhra.ac.in',
      role: 'student',
      batch: '2023',
      joinedAt: new Date(),
      isActive: true
    },
    uploadedAt: new Date(Date.now() - 259200000)
  }
];

export const Gallery: React.FC = () => {
  const { hasPermission } = useAuth();
  const [galleryItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['all', 'workshop', 'competition', 'project', 'seminar'];
  const years = ['all', 2024, 2023, 2022];

  const filteredItems = galleryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const yearMatch = selectedYear === 'all' || item.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      competition: 'bg-green-100 text-green-800',
      project: 'bg-purple-100 text-purple-800',
      seminar: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-2">Images and videos from events, workshops, and achievements</p>
        </div>
        
        {hasPermission('gallery_upload') && (
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-square relative">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {item.type === 'video' ? (
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded">
                    <Video className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded">
                    <Image className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{item.uploadedBy.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{item.uploadedAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No media found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No items match your current filters. Try adjusting the category or year.
            </p>
          </div>
        </div>
      )}

      {/* Modal for viewing selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.category}
                  </span>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{selectedItem.uploadedBy.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{selectedItem.uploadedAt.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Eye className="h-4 w-4 mr-1" />
                    View Full
                  </button>
                  <button className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};