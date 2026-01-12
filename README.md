# GigFlow - Freelance Gigs Marketplace

GigFlow is a modern, high-performance freelance marketplace platform designed to connect talented professionals with businesses. Built with a focus on speed, user experience, and a clean aesthetic.

## 🚀 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for ultra-fast development and optimized builds
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first responsive design
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/) primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management & Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid UI transitions
- **Charts & Visuals**: [Recharts](https://recharts.org/) and [COBE](https://github.com/shuding/cobe) (Interactive Globe)

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI elements and functional components
│   ├── gigs/        # Gig-specific business logic components
│   ├── layout/      # Shared layout components (Navbar, Footer)
│   └── ui/          # Core shadcn/ui primitives
├── contexts/         # Global state management (Auth, Gigs)
├── hooks/            # Custom React hooks for shared logic
├── lib/              # Utility functions and shared library configurations
├── pages/            # Page-level components (Routes)
└── assets/           # Static assets (images, fonts)
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gigflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create an optimized production build:
```bash
npm run build
```

## 🧩 Key Features

- **Gig Discovery**: Browse and search through various professional services.
- **Detailed Insights**: Comprehensive gig detail pages with reviews and specifications.
- **Freelancer Dashboard**: Manage postings, track earnings, and view performance metrics.
- **Secure Authentication**: Built-in flow for login and registration.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Interactive UI**: Engaging elements like an interactive globe and smooth transitions.

## 📐 Development Guidelines

- **Component Patterns**: Favor composition and keep components small and focused.
- **Styling**: Use Tailwind CSS for almost all styling. Avoid custom CSS files unless necessary for complex animations.
- **Types**: Always define interfaces/types for props and API responses to maintain type safety.
- **State**: Use TanStack Query for server state and React Context for global UI state.
