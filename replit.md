# Shawny Hargrove Portfolio

## Overview

This is a personal portfolio website for Shawny Hargrove, a web designer and creative professional. The application showcases design work, services, and provides a contact interface for potential clients. Built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS variables for theming (supports light/dark modes)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactions
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Structure**: RESTful endpoints prefixed with `/api`
- **Build Process**: Custom esbuild script bundles server for production with selective dependency bundling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Migrations**: Managed via `drizzle-kit push` command
- **Current Storage**: In-memory storage implementation (`MemStorage` class) with interface ready for database migration

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client/server
│   └── schema.ts     # Database schema definitions
└── migrations/       # Drizzle database migrations
```

### Development vs Production
- **Development**: Vite middleware serves frontend with HMR through the Express server
- **Production**: Frontend built to `dist/public`, server bundled to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Required database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for PostgreSQL (available but not currently active)

### UI Framework Dependencies
- **Radix UI**: Headless component primitives for accessibility
- **Embla Carousel**: Carousel/slider functionality
- **React Day Picker**: Calendar component
- **Recharts**: Charting library
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **PostCSS/Autoprefixer**: CSS processing pipeline

### Fonts (External)
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono