import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Arduino Workshop - Advanced IoT',
    description: 'Learn advanced IoT programming with Arduino and ESP32 modules.',
    startDate: new Date(2024, 11, 15, 14, 0), // Dec 15, 2024 2:00 PM
    endDate: new Date(2024, 11, 15, 17, 0),   // Dec 15, 2024 5:00 PM
    location: 'Electronics Lab, Block A',
    type: 'workshop',
    organizer: {
      id: '2',
      name: 'Secretary',
      email: 'secretary@student.nitandhra.ac.in',
      role: 'secretary',
      batch: '2021',
      joinedAt: new Date(),
      isActive: true
    },
    attendees: ['1', '3', '4', '5'],
    maxAttendees: 25
  },
  {
    id: '2',
    title: 'Hackathon 2024 Finals',
    description: 'Annual hackathon featuring "Smart Cities" theme with exciting prizes.',
    startDate: new Date(2024, 11, 20, 9, 0),  // Dec 20, 2024 9:00 AM
    endDate: new Date(2024, 11, 22, 18, 0),   // Dec 22, 2024 6:00 PM
    location: 'Main Auditorium',
    type: 'competition',
    organizer: {
      id: '1',
      name: 'Admin User',
      email: 'admin@student.nitandhra.ac.in',
      role: 'admin',
      batch: '2022',
      joinedAt: new Date(),
      isActive: true
    },
    attendees: ['1', '2', '3', '4', '5', '6'],
    maxAttendees: 100
  }
];

export const EventsCalendar: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [events] = useState<Event[]>(mockEvents);
  const [view, setView] = useState<'month' | 'week' | 'list'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800 border-blue-200',
      competition: 'bg-green-100 text-green-800 border-green-200',
      meeting: 'bg-purple-100 text-purple-800 border-purple-200',
      seminar: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Calendar</h1>
          <p className="text-gray-600 mt-2">Workshops, competitions, meetings, and more</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'list', label: 'List' },
              { key: 'week', label: 'Week' },
              { key: 'month', label: 'Month' }
            ].map((viewOption) => (
              <button
                key={viewOption.key}
                onClick={() => setView(viewOption.key as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  view === viewOption.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewOption.label}
              </button>
            ))}
          </div>
          
          {hasPermission('event_create') && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </button>
          )}
        </div>
      </div>

      {/* Events List */}
      {view === 'list' && (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees.length}/{event.maxAttendees || '∞'} attendees</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">{formatDate(event.startDate)}</p>
                        <p className="text-xs">{formatDate(event.endDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <p>{event.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Organized by {event.organizer.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors">
                          {event.attendees.includes(user?.id || '') ? 'Registered' : 'Register'}
                        </button>
                        
                        {(hasPermission('event_create') || event.organizer.id === user?.id) && (
                          <div className="flex space-x-1">
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for Calendar Views */}
      {(view === 'week' || view === 'month') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {view === 'week' ? 'Week' : 'Month'} View Coming Soon
            </h3>
            <p>Calendar grid view is under development. Use list view for now.</p>
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
            <p className="mt-1 text-sm text-gray-500">
              No events have been created yet. Check back soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};