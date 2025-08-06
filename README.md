# DocStar Website

> Fast, reliable API Docs & FAQs for teams

A modern, responsive website built with React, TypeScript, and Tailwind CSS showcasing DocStar's API documentation and integration platform.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd docstar-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### Key Dependencies
- **React Router DOM 7.6.3** - Client-side routing
- **Framer Motion 12.23.0** - Animation library
- **Lucide React 0.344.0** - Beautiful icon library
- **React Intersection Observer 9.16.0** - Scroll-based animations

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
docstar-website/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CTA.tsx        # Call-to-action section
│   │   ├── ContactUs.tsx  # Contact form component
│   │   ├── Features.tsx   # Features showcase
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Hero.tsx       # Landing page hero section
│   │   ├── Logo.tsx       # Brand logo component
│   │   ├── Navbar.tsx     # Navigation header
│   │   ├── Pricing.tsx    # Pricing plans
│   │   ├── ScrollToTop.tsx # Scroll utility
│   │   └── Testimonials.tsx # Customer testimonials
│   ├── pages/             # Route-specific pages
│   │   ├── APIDocumentationAndTesting.tsx
│   │   ├── Blogging.tsx
│   │   ├── DocumentationWithAI.tsx
│   │   ├── NotFound.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── SimpleWebsite.tsx
│   │   ├── SsoAuthentication.tsx
│   │   └── WhiteLabelling.tsx
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── vercel.json           # Vercel deployment config
```

## 🎨 Components Overview

### Layout Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Comprehensive footer with links and branding
- **ScrollToTop** - Utility for smooth page transitions

### Content Components
- **Hero** - Eye-catching landing section with animations
- **Features** - Product feature highlights
- **Testimonials** - Customer success stories
- **Pricing** - Subscription plans and pricing
- **CTA** - Call-to-action sections
- **ContactUs** - Contact form with validation

### Page Components
- **API Documentation & Testing** - API documentation features
- **Blogging** - Blog functionality showcase
- **Documentation with AI** - AI-powered documentation
- **Simple Website** - Website building features
- **White Labelling** - Custom branding solutions
- **SSO Authentication** - Single sign-on features
- **Privacy Policy** - Legal compliance page
- **NotFound** - 404 error page

## 🛣️ Routing Structure

The application uses React Router for client-side navigation:

```typescript
/ - Landing page (Hero + Features + Testimonials + CTA)
/api-documentation - API documentation features
/blogging - Blogging platform features
/documentation-with-ai - AI documentation tools
/simple-website - Website builder features
/pricing - Pricing plans
/white-labelling - Custom branding options
/sso-authentication - SSO integration
/privacy-policy - Privacy policy
/support - Contact and support
/* - 404 Not Found page
```

## 🎯 Key Features

### Modern Development Stack
- **TypeScript** for type safety and better developer experience
- **Vite** for lightning-fast development and optimized builds
- **ESLint** for code quality and consistency
- **Tailwind CSS** for rapid UI development

### Performance Optimizations
- **Code splitting** with React Router
- **Optimized dependencies** (Lucide React excluded from bundling)
- **Modern build tools** with Vite
- **Responsive design** with mobile-first approach

### User Experience
- **Smooth animations** with Framer Motion
- **Intersection Observer** for scroll-based effects
- **Responsive navigation** with mobile menu
- **SEO optimization** with proper meta tags

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
- React plugin integration
- Lucide React optimization exclusion
- Development server settings

### Tailwind Configuration (`tailwind.config.js`)
- Content path configuration
- Custom theme extensions
- Plugin integrations

### TypeScript Configuration
- **`tsconfig.json`** - Base TypeScript settings
- **`tsconfig.app.json`** - Application-specific settings
- **`tsconfig.node.json`** - Node.js environment settings

### ESLint Configuration (`eslint.config.js`)
- React-specific rules
- TypeScript integration
- Code quality standards

## 📱 Responsive Design

The website is fully responsive with:
- **Mobile-first approach** using Tailwind CSS
- **Flexible grid layouts** for different screen sizes
- **Responsive navigation** with hamburger menu
- **Optimized images** and content for all devices

## 🚀 Deployment

### Vercel Configuration (`vercel.json`)
The project is configured for Vercel deployment with proper routing for SPA.

### Build Process
```bash
npm run build    # Creates optimized production build
npm run preview  # Preview production build locally
```

## 📄 SEO & Meta Information

- **Title**: "Fast, Reliable API Docs & FAQs for Teams | DocStar"
- **Description**: "Fast, reliable API Docs & FAQs for teams."
- **Keywords**: API Documentation, Integration, Team Collaboration
- **Favicon**: Custom DocStar favicon
- **Responsive viewport** configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Implement proper error boundaries
- Add proper TypeScript types

### Component Structure
- Keep components focused and reusable
- Use proper prop typing with TypeScript
- Implement responsive design patterns
- Add proper accessibility attributes

### Performance
- Lazy load components when appropriate
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper error handling

## 🔍 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 📞 Support

For questions and support, visit the [Contact Us](/support) page or reach out through the website's contact form.

---

Built with ❤️ by the DocStar team
