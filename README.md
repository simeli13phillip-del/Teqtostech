# TeQtos - Professional Network for African Talent

A modern, LinkedIn-inspired platform website built with HTML, CSS, JavaScript, and Tailwind CSS that connects African talent to global opportunities.

## Overview

TeQtos is a professional networking platform designed specifically for African skilled professionals. Similar to LinkedIn, it offers membership tiers, premium recommendations, email alerts, and career growth tools to help professionals showcase their expertise and access international markets.

## Features

- **Membership Tiers**: Free, Premium ($19/month), and Enterprise ($49/month) plans
- **Technician Ranking System**: 4-level certification-based ranking (Beginner → Certified → Advanced → Elite)
- **Premium Job Access**: Higher rankings unlock better-paying, verified job opportunities
- **Skill Score System**: Automatic ranking based on certifications and experience
- **Employer Trust Layer**: Companies can filter by certification level and ranking
- **Job Posting & Feed**: Recruiters can post jobs that appear in a LinkedIn-style feed on the home page (max 4 recent posts)
- **AI Help Agent**: 24/7 intelligent chatbot for platform guidance and support
- **Premium Features**:
  - AI-powered job recommendations
  - Instant email alerts for opportunities
  - Advanced profile analytics
  - Priority profile visibility
  - Enhanced networking tools
- **User Authentication**: Sign up and sign in functionality
- **Email Notifications**: Customizable alert preferences
- **Professional Networking**: Connect with verified African talent
- **Dark Theme**: Modern, eye-friendly dark interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Project Structure

```
TeQtos/
├── index.html                 # Home page with membership plans
├── pages/
│   ├── about.html            # About page with team info
│   ├── services.html         # Services overview
│   ├── contact.html          # Contact form
│   ├── premium.html          # Premium features showcase
│   ├── rankings.html         # Technician ranking system
│   └── auth.html             # Sign in/Sign up page
├── css/
│   ├── styles.css            # Custom CSS styles
│   └── ai-chat.css           # AI chat widget styles
├── js/
│   ├── main.js               # Main JavaScript functionality
│   ├── auth.js               # Authentication page scripts
│   └── ai-chat.js            # AI chat widget functionality
├── assets/
│   ├── images/               # Image assets (placeholder)
│   └── fonts/                # Custom fonts (optional)
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS (utility-first CSS framework)
- **JavaScript**: Vanilla JS for interactivity
- **Responsive Design**: Mobile-first approach

## Membership Plans

### Account Types
Members can choose their account type during registration:
- **Recruiters**: Companies and employers looking to hire African talent
- **Freelancers**: Skilled professionals seeking job opportunities

### Free Plan
- Create basic profile
- Limited job search
- Basic networking

### Premium Plan ($19/month)
- Everything in Free
- AI-powered recommendations
- Instant email alerts
- Priority profile visibility
- Advanced analytics
- Enhanced networking tools

### Enterprise Plan ($49/month)
- Everything in Premium
- Team collaboration tools
- Custom integrations
- Dedicated support
- Advanced reporting

## Technician Ranking System

TeQtos features a comprehensive 4-level certification-based ranking system that showcases technician expertise and unlocks premium opportunities:

### Level 1: Beginner Technician
- Entry-level certifications or no certifications
- Access to basic/local jobs and assistant roles

### Level 2: Certified Technician
- Requires 1-2 recognized certifications (CTS, Network+, Dante Level 2)
- Access to standard freelance jobs, remote contracts, and verified badge

### Level 3: Advanced Specialist
- Requires 2-3 advanced certifications (CTS-I/CTS-D, CCNA, manufacturer certs)
- Access to high-paying gigs, international contracts, and system integration roles

### Level 4: Elite Technician
- Requires comprehensive certifications and proven experience
- Access to premium/global jobs, direct hiring, and featured profiles

### Skill Score System
- Automatic ranking calculation based on certification points
- CTS = +50, CCNA = +70, Crestron Certified = +80, etc.
- Thresholds: Level 1 (0-49), Level 2 (50-149), Level 3 (150-249), Level 4 (250+)

### Premium Job Unlock System
- **Open Jobs**: Everyone access (basic installations, local gigs)
- **Verified Jobs**: Requires certification (better pay, builds trust)
- **Professional Jobs**: Level 3 required (corporate AV, AV-over-IP)
- **Premium Jobs**: Elite level required (international, government, high-budget)
## Job Posting System

TeQtos includes a LinkedIn-style job posting and feed system:

### For Recruiters
- **Post Jobs**: Dedicated form at `pages/post-job.html` for creating job opportunities
- **Job Details**: Company info, job title, type, location, salary, experience level, description, requirements
- **Contact Integration**: Direct email application links for candidates

### Job Feed Features
- **Home Page Display**: Latest 4 job posts appear in a feed section on the home page
- **Real-time Updates**: Posts appear immediately after submission
- **Professional Layout**: Company logos, job details, timestamps, and apply buttons
- **Data Persistence**: Jobs stored in browser localStorage (maintains up to 50 recent posts)

### Technical Implementation
- **job-posting.js**: Handles form submission and data storage
- **job-feed.js**: Manages feed display and job card rendering
- **Local Storage**: Client-side data persistence for demonstration
- **Responsive Design**: Mobile-friendly job cards and posting form

## Advertisement & Monetization Features

TeQtos includes strategic advertisement placements and monetization features:

### Google Ads Integration
- **Banner Ads**: 728x90 banner placement after hero section
- **Sidebar Ads**: 160x600 vertical ad spaces
- **Small Banners**: Compact ad placements before key sections
- **Sponsored Content**: Clearly labeled advertisement spaces

### YouTube Tutorials Section
- **Dedicated Tutorials Page**: `pages/tutorials.html` with comprehensive video library
- **Home Page Integration**: Featured tutorial previews on main page
- **Categorized Content**: Job Search, Career Growth, Technical Skills, Entrepreneurship
- **Video Cards**: Professional layout with duration, views, and categories

### Advertisement Spaces
- **Strategic Placement**: Ads positioned to maximize visibility without disrupting UX
- **Professional Design**: Consistent with dark theme and platform aesthetics
- **Multiple Formats**: Banner, sidebar, and content-integrated ads
- **Sponsored Learning**: Premium educational content from partners

### Technical Implementation
- **Static Ad Spaces**: Placeholder areas ready for Google AdSense integration
- **Responsive Design**: All ad spaces adapt to mobile and desktop
- **Clean Integration**: Ads blend seamlessly with platform design
- **Performance Optimized**: Non-intrusive ad loading and placement
## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime, etc.)
- Optional: Node.js and npm for local development server

### Installation

1. Clone or download the project
2. Open `index.html` in your browser
3. Or, for local development with live reload:

```bash
npm install
npm run dev
```

## Usage

### For Users

1. **Sign Up**: Create a free account on the platform
2. **Complete Profile**: Add your skills, experience, and portfolio
3. **Network**: Connect with other professionals
4. **Apply for Jobs**: Use AI recommendations to find opportunities
5. **Upgrade**: Unlock premium features for better visibility

### For Employers

1. **Post Jobs**: Reach verified African talent
2. **Search Candidates**: Use advanced filters
3. **Premium Access**: Get priority placement and analytics

### Email Alerts

Customize your notification preferences:
- Job opportunity alerts
- Network connection updates
- Industry news and trends
- Profile view notifications

## Premium Features

- **AI Recommendations**: Smart job matching based on your profile
- **Email Alerts**: Real-time notifications for relevant opportunities
- **Profile Analytics**: Track views, connections, and engagement
- **Priority Visibility**: Stand out to employers
- **Advanced Search**: Sophisticated filtering and saved searches
- **Networking Tools**: Enhanced connection and communication features

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images (use compressed PNG/WebP)
- CSS delivered via Tailwind CDN
- Minimal JavaScript footprint
- Smooth animations using CSS transitions

## SEO

- Semantic HTML structure
- Meta descriptions on all pages
- Proper heading hierarchy
- Responsive design (mobile-friendly)
- Fast load times

## Future Enhancements

- Real user authentication system
- Database integration
- Job posting functionality
- Messaging system
- Video profiles
- Advanced analytics dashboard
- Mobile app development
- API integrations

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For questions or issues, contact: info@teqtos.com

## Version

Version 2.0.0 - LinkedIn-Inspired Professional Network
