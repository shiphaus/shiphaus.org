export interface ChapterLead {
  name: string;
  handle: string;
  avatar: string;
  x?: string;
  github?: string;
  website?: string;
  isFounder?: boolean;
}

export interface Chapter {
  id: string;
  city: string;
  country: string;
  lead: ChapterLead;
  color: string;
}

export type EventStatus = 'upcoming' | 'active' | 'closed';

export interface Event {
  id: string;
  chapterId: string;
  title: string;
  date: string; // ISO datetime string
  location: string;
  builderCount?: number;
  projectCount?: number;
  status?: EventStatus;
  lumaUrl?: string;
  imageUrl?: string;
  slug?: string;          // URL slug — falls back to id if not set
  isFriends?: boolean;    // true = Shiphaus Friends event (external organizer)
  organizer?: {
    name: string;
    url?: string;
    avatar?: string;
  };
  hostedBy?: {
    name: string;
    url: string;
    tagline?: string;
  };
}

export type ProjectType = 'website' | 'application' | 'devtool' | 'video' | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  deployedUrl?: string;
  githubUrl?: string;
  createdAt: string;
  chapterId: string;
  eventId?: string;
  builder: {
    name: string;
    avatar: string;
    uid: string;
  };
  type?: ProjectType;
  featured?: boolean;
  submittedBy?: string;
  screenshotUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  chapterId?: string;
}
