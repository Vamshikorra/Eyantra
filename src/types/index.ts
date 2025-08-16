export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  batch: string;
  profileImage?: string;
  joinedAt: Date;
  isActive: boolean;
}

export type UserRole = 'admin' | 'secretary' | 'joint_secretary' | 'volunteer' | 'executive' | 'student';

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'event' | 'newsletter' | 'achievement';
  author: User;
  createdAt: Date;
  status: 'draft' | 'published' | 'pending_approval';
  tags: string[];
  attachments?: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  postId: string;
  parentId?: string;
  isModerated: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: 'workshop' | 'competition' | 'meeting' | 'seminar';
  organizer: User;
  attendees: string[];
  maxAttendees?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'image' | 'video';
  category: string;
  year: number;
  event?: string;
  uploadedBy: User;
  uploadedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'hackathon' | 'award' | 'publication';
  date: Date;
  teamMembers: string[];
  images: string[];
  year: number;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  category: string;
  isPublic: boolean;
  uploadedBy: User;
  uploadedAt: Date;
  downloadCount: number;
}