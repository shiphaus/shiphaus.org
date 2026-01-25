import { Chapter, Event, Project, Testimonial } from '@/types';

export const chapters: Chapter[] = [
  {
    id: 'new-york',
    name: 'New York',
    city: 'New York',
    country: 'USA',
    lead: {
      name: 'Slobo',
      handle: '@slobo',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Slobo&backgroundColor=b6e3f4',
      x: 'https://x.com/slobo',
    },
    color: 'chapter-ny',
    projectCount: 47,
    eventCount: 8,
  },
  {
    id: 'chicago',
    name: 'Chicago',
    city: 'Chicago',
    country: 'USA',
    lead: {
      name: 'Kirill P',
      handle: '@kirillp',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=KirillP&backgroundColor=c0aede',
      x: 'https://x.com/kirillp',
    },
    color: 'chapter-chicago',
    projectCount: 32,
    eventCount: 5,
  },
  {
    id: 'boulder',
    name: 'Boulder',
    city: 'Boulder',
    country: 'USA',
    lead: {
      name: 'Dawson Botsford',
      handle: '@dawsonbotsford',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=DawsonBotsford&backgroundColor=d1f4d1',
      x: 'https://x.com/dawsonbotsford',
      website: 'https://dawsonbotsford.com',
    },
    color: 'chapter-boulder',
    projectCount: 28,
    eventCount: 4,
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    city: 'Forest City',
    country: 'Malaysia',
    lead: {
      name: 'Dylan Brodeur',
      handle: '@dylan',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=DylanBrodeur&backgroundColor=ffd5b4',
      x: 'https://x.com/gofordylan',
      website: 'https://dylanbrodeur.org',
    },
    color: 'chapter-malaysia',
    projectCount: 19,
    eventCount: 3,
  },
];

export const events: Event[] = [
  {
    id: 'ny-jan-2026',
    chapterId: 'new-york',
    name: 'NYC Ship Day #8',
    date: '2026-01-18',
    location: 'WeWork SoHo',
    attendeeCount: 45,
    projectCount: 38,
    photos: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    ],
  },
  {
    id: 'chicago-jan-2026',
    chapterId: 'chicago',
    name: 'Chicago Build Day #5',
    date: '2026-01-11',
    location: '1871 Innovation Hub',
    attendeeCount: 28,
    projectCount: 24,
    photos: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    ],
  },
  {
    id: 'boulder-dec-2025',
    chapterId: 'boulder',
    name: 'Boulder Hack Day #4',
    date: '2025-12-14',
    location: 'Galvanize Boulder',
    attendeeCount: 22,
    projectCount: 18,
    photos: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    ],
  },
  {
    id: 'malaysia-jan-2026',
    chapterId: 'malaysia',
    name: 'KL Ship Day #3',
    date: '2026-01-04',
    location: 'WORQ TTDI',
    attendeeCount: 18,
    projectCount: 15,
    photos: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Invoice Genius',
    description: 'AI-powered invoice generation and tracking for freelancers',
    deployedUrl: 'https://invoicegenius.app',
    githubUrl: 'https://github.com/example/invoice-genius',
    createdAt: '2026-01-18',
    chapterId: 'new-york',
    eventId: 'ny-jan-2026',
    builder: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=SarahChen&backgroundColor=ffdfbf',
      uid: 'user1',
    },
  },
  {
    id: 'proj-2',
    title: 'Workout Buddy',
    description: 'Social fitness app that pairs you with workout partners nearby',
    deployedUrl: 'https://workoutbuddy.io',
    createdAt: '2026-01-18',
    chapterId: 'new-york',
    eventId: 'ny-jan-2026',
    builder: {
      name: 'Marcus Johnson',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=MarcusJohnson&backgroundColor=c0aede',
      uid: 'user2',
    },
  },
  {
    id: 'proj-3',
    title: 'Recipe Remix',
    description: 'Transform any recipe based on dietary restrictions and what you have in your fridge',
    deployedUrl: 'https://reciperemix.co',
    githubUrl: 'https://github.com/example/recipe-remix',
    createdAt: '2026-01-11',
    chapterId: 'chicago',
    eventId: 'chicago-jan-2026',
    builder: {
      name: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=EmilyRodriguez&backgroundColor=d1f4d1',
      uid: 'user3',
    },
  },
  {
    id: 'proj-4',
    title: 'Trail Finder',
    description: 'Discover hiking trails with real-time conditions and crowd levels',
    deployedUrl: 'https://trailfinder.app',
    githubUrl: 'https://github.com/example/trail-finder',
    createdAt: '2025-12-14',
    chapterId: 'boulder',
    eventId: 'boulder-dec-2025',
    builder: {
      name: 'Alex Thompson',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=AlexThompson&backgroundColor=b6e3f4',
      uid: 'user4',
    },
  },
  {
    id: 'proj-5',
    title: 'Durian Delivery',
    description: 'On-demand durian delivery with freshness tracking',
    deployedUrl: 'https://duriandelivery.my',
    createdAt: '2026-01-04',
    chapterId: 'malaysia',
    eventId: 'malaysia-jan-2026',
    builder: {
      name: 'Wei Lin',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=WeiLin&backgroundColor=ffd5b4',
      uid: 'user5',
    },
  },
  {
    id: 'proj-6',
    title: 'Standup Bot',
    description: 'Async standup meetings for distributed teams with AI summaries',
    deployedUrl: 'https://standupbot.dev',
    githubUrl: 'https://github.com/example/standup-bot',
    createdAt: '2026-01-18',
    chapterId: 'new-york',
    eventId: 'ny-jan-2026',
    builder: {
      name: 'James Park',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=JamesPark&backgroundColor=c0aede',
      uid: 'user6',
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Shiphaus is the best thing that's happened to my side projects. The energy of building with others in the room is unmatched. I've shipped more in 3 events than I did all last year.",
    author: 'Greg Skrilloff',
    role: 'Software Engineer',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=GregSkrilloff&backgroundColor=ffdfbf',
    chapterId: 'new-york',
  },
  {
    id: 'test-2',
    quote: "Finally found my tribe. These are people who actually ship, not just talk about shipping. The accountability and camaraderie is incredible.",
    author: 'Igor Yuzo',
    role: 'Founder',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=IgorYuzo&backgroundColor=b6e3f4',
    chapterId: 'chicago',
  },
  {
    id: 'test-3',
    quote: "The constraint of one day forces you to cut scope ruthlessly and just build. It's liberating. My best projects have come from Shiphaus days.",
    author: 'Jason Chaskin',
    role: 'Ethereum Foundation',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=JasonChaski&backgroundColor=d1f4d1',
    chapterId: 'boulder',
  },
];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getChapterEvents(chapterId: string): Event[] {
  return events.filter(e => e.chapterId === chapterId);
}

export function getChapterProjects(chapterId: string): Project[] {
  return projects.filter(p => p.chapterId === chapterId);
}

export function getChapterTestimonials(chapterId: string): Testimonial[] {
  return testimonials.filter(t => t.chapterId === chapterId || !t.chapterId);
}

export function getAllProjects(): Project[] {
  return projects;
}
