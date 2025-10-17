# Overview

This is a sales landing page (Portuguese market) built to replicate a Kiwify-style checkout experience. The application is a full-stack TypeScript project featuring a React frontend with shadcn/ui components and an Express backend. It's designed as a high-conversion sales funnel with a hero section, benefits list, social proof images, rhetorical questions, and a checkout form with upsell products.

The page follows a specific design system focused on emotional engagement and conversion optimization, with a clean white background, vibrant green accents for CTAs, and structured content sections designed to build trust and urgency.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Components**: shadcn/ui component library (New York style variant) built on top of Radix UI primitives, providing accessible and customizable components

**Styling**: Tailwind CSS with custom design tokens defined in CSS variables. The color system uses HSL values with alpha channel support for flexible theming. Custom elevation utilities (`hover-elevate`, `active-elevate-2`) provide consistent interaction states.

**Form Management**: React Hook Form with Zod for schema validation, ensuring type-safe form handling and real-time validation feedback

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Queries are configured with infinite stale time and disabled refetching to optimize performance.

**Routing**: Wouter for lightweight client-side routing (currently only home and 404 pages)

## Backend Architecture

**Runtime**: Node.js with Express.js framework

**Language**: TypeScript with ES modules

**API Design**: RESTful API with a single checkout endpoint (`POST /api/checkout`) that validates form data and processes orders

**Validation**: Shared Zod schemas between frontend and backend ensure consistent validation rules across the stack

**Request Logging**: Custom middleware logs all API requests with timing information, truncating long responses for readability

**Error Handling**: Centralized error handler catches all errors and returns structured JSON responses with appropriate status codes

## Data Storage

**Current Implementation**: In-memory storage using a Map-based storage class (`MemStorage`). Orders are stored in memory with UUID identifiers.

**Database Configuration**: Drizzle ORM is configured for PostgreSQL with connection string from environment variables. The schema is defined in `shared/schema.ts` and migrations output to `./migrations`.

**Note**: The application currently uses in-memory storage but has infrastructure ready for PostgreSQL migration when persistence is needed.

## External Dependencies

**UI Component System**: 
- Radix UI primitives (accordion, dialog, dropdown, select, etc.) for accessible headless components
- Embla Carousel for image galleries
- Lucide React for icons
- cmdk for command palette patterns

**Form & Validation**:
- react-hook-form for form state management
- @hookform/resolvers for Zod integration
- zod for schema validation
- drizzle-zod for database schema to Zod conversion

**Styling**:
- Tailwind CSS with autoprefixer
- class-variance-authority for component variants
- clsx and tailwind-merge for className utilities

**Database (configured but not actively used)**:
- Drizzle ORM as the query builder
- @neondatabase/serverless for serverless PostgreSQL connections
- connect-pg-simple for session storage (configured but not implemented)

**Development Tools**:
- Vite for development server and build tooling
- @replit plugins for Replit-specific features (cartographer, dev banner, runtime error overlay)
- esbuild for server bundling in production

**Utilities**:
- date-fns for date manipulation
- nanoid for generating unique identifiers
- express-session packages for future authentication needs

## Design System

**Color Palette**:
- Background: Pure white (`0 0% 100%`)
- Text: Dark gray/black (`0 0% 10%`)
- Accent/Checkmarks: Vibrant green (`142 71% 45%`)
- Primary CTA Button: Dark green/teal (`158 64% 52%`)
- Urgency Alerts: Red/orange (`0 84% 60%`)
- Borders: Light gray (`0 0% 90%`)

**Typography**: System font stack prioritizing native fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)

**Layout**: Centralized max-width container (max-w-4xl) with vertical stacking of sections including hero images, benefits list with checkmarks, social proof gallery, rhetorical questions section, and checkout form with upsell cards