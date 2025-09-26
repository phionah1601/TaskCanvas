# Overview

This is a full-stack Todo application built with a modern web development stack. The application provides a complete CRUD interface for managing todos with features like filtering, searching, and real-time updates. It follows a monorepo structure with separate client and server directories, sharing common schemas and types between frontend and backend.

The application is designed as a task management system where users can create, read, update, and delete todo items. Each todo has a title, description, completion status, and timestamps for creation and updates.

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

To run this Todo application on your local machine, you'll need to follow these steps:

## Prerequisites

- Node.js (version 18 or higher) - Download from nodejs.org
- npm (comes with Node.js)

## Setup Instructions

- Download/Clone the project files to your local machine

- Open a terminal in the project directory

**Install dependencies:**

- npm install

**Start the development server:**

- npm run dev

**Open your browser and go to:**

- http://localhost:5000

# What happens when you run it:

The command starts both the Express backend server and Vite frontend development server

Both run on the same port (5000) with Vite serving the frontend and proxying API calls to Express

Hot reload is enabled, so any code changes will automatically refresh the browser

The app uses in-memory storage, so your todos will persist while the server is running but will reset when you restart
