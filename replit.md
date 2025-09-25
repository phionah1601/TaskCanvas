# Overview

This is a full-stack Todo application built with a modern web development stack. The application provides a complete CRUD interface for managing todos with features like filtering, searching, and real-time updates. It follows a monorepo structure with separate client and server directories, sharing common schemas and types between frontend and backend.

The application is designed as a task management system where users can create, read, update, and delete todo items. Each todo has a title, description, completion status, and timestamps for creation and updates.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern React features
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and PostgreSQL for production
- **Development Setup**: Hot reload with Vite integration for seamless full-stack development

## Data Management
- **Schema Definition**: Zod schemas in shared directory for runtime validation and type inference
- **Database**: PostgreSQL as the primary database with Neon serverless hosting
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Type Safety**: End-to-end type safety from database to UI components

## Development Workflow
- **Monorepo Structure**: Client, server, and shared code in organized directories
- **Hot Reload**: Integrated development server with automatic code reloading
- **Build Process**: ESBuild for server bundling and Vite for client optimization
- **Path Aliases**: Configured import aliases for clean module resolution

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database toolkit for schema definition and queries

## UI and Styling
- **Radix UI**: Headless UI primitives for accessible component foundation
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Tailwind CSS**: Utility-first CSS framework for responsive styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation and performance optimization
- **date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight routing solution for React applications

## Build and Development
- **Vite**: Frontend build tool with hot module replacement
- **ESBuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Static type checking across the entire application
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins