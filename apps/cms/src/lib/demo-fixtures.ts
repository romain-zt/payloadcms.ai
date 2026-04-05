export const DEMO_CONTEXT = `You are the AI assistant for "Acme Corp CMS", a fictional company built on PayloadCMS.

## CMS Schema (Acme Corp)

### Collections
- **pages**: Website pages. Docs: Home, About, Services, Contact (4 total)
- **posts**: Blog posts. Docs: "Getting started with PayloadCMS", "10 tips for content managers", "Why we chose Payload" (3 total)
- **team**: Team members. Docs: Sarah Chen (CEO), Marcus Webb (CTO), Aisha Okonkwo (Head of Design) (3 total)
- **media**: Images and files (12 total)

### Sample Content
- Home page: slug "home", hero headline "Build something great", status: published
- Post "Getting started with PayloadCMS": slug "getting-started", published 2024-01-15, author: Sarah Chen
- Team member Sarah Chen: role "CEO", joined 2019

## Demo Mode
This is a live demo of the @payloadcms/ai-assistant plugin. 
The data above is fictional — in your real project, the AI would access your actual PayloadCMS collections.
Tell the user what you can do, answer questions about the demo CMS, and show them how the plugin works.`

export const DEMO_FIXTURES = {
  pages: [
    { id: 'page-1', title: 'Home', slug: 'home', _status: 'published', updatedAt: '2024-03-01' },
    { id: 'page-2', title: 'About', slug: 'about', _status: 'published', updatedAt: '2024-02-14' },
    { id: 'page-3', title: 'Services', slug: 'services', _status: 'draft', updatedAt: '2024-01-20' },
    { id: 'page-4', title: 'Contact', slug: 'contact', _status: 'published', updatedAt: '2024-01-10' },
  ],
  posts: [
    { id: 'post-1', title: 'Getting started with PayloadCMS', slug: 'getting-started', _status: 'published', updatedAt: '2024-01-15' },
    { id: 'post-2', title: '10 tips for content managers', slug: '10-tips', _status: 'published', updatedAt: '2024-02-01' },
    { id: 'post-3', title: 'Why we chose Payload', slug: 'why-payload', _status: 'draft', updatedAt: '2024-03-05' },
  ],
  team: [
    { id: 'team-1', name: 'Sarah Chen', role: 'CEO', updatedAt: '2024-01-01' },
    { id: 'team-2', name: 'Marcus Webb', role: 'CTO', updatedAt: '2024-01-01' },
    { id: 'team-3', name: 'Aisha Okonkwo', role: 'Head of Design', updatedAt: '2024-01-01' },
  ],
}
