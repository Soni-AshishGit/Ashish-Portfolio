# Ashish Galaxy Portfolio

A full-stack personal portfolio for Ashish Kumar with a galaxy-themed, glassmorphism UI.  
The frontend is built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion;  
the backend is a minimal ASP.NET Core Web API that serves CV data.

> Note: This project contains real personal information. Do not reuse or republish the text content without permission.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Build Commands](#build-commands)
- [Security And Privacy](#security-and-privacy)

## Overview

This repository contains Ashish Kumar’s personal portfolio:

- A single-page React application showing experience, projects, education, awards, and hobbies.
- A custom galaxy background with animated stars, asteroids, and a hologram-style avatar.
- A small ASP.NET Core API that exposes CV data at `/api/cv`, which the frontend can consume.

The goal of this project is to present Ashish’s profile with a high-end visual experience while keeping the codebase clean, type-safe, and easy to maintain.

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite 5 for bundling and dev server
- Tailwind CSS 3 for styling and glassmorphism utilities
- Framer Motion for animations and motion effects
- Lucide React for icons
- canvas-confetti for the “Buy me a Tea” interaction

### Backend

- .NET 9 (ASP.NET Core)
- Minimal API pattern
- `Microsoft.AspNetCore.OpenApi` for OpenAPI metadata

## Features

- Galaxy-inspired background with animated layers and cursor-following glow.
- Glassmorphism cards for all sections (About, Experience, Projects, Education, Awards, Hobbies).
- Hologram-style portrait with scanline and glow effects.
- Project grid with modal popups showing stack and status.
- Backend `/api/cv` endpoint providing structured CV data (experience, projects, education, awards).
- Basic UI hardening against copying and selection in the frontend to discourage casual data scraping.

## Project Structure

At the root:

- `PortfolioApi/` – ASP.NET Core Web API for CV data.
- `frontend/` – React + Vite frontend application.
- `README.md` – This file.

Backend:

- `PortfolioApi/PortfolioApi.csproj` – .NET project file.
- `PortfolioApi/Program.cs` – minimal API, CORS, and CV endpoint definition.

Frontend:

- `frontend/src/app.tsx` – main portfolio UI (sections, modals, hologram).
- `frontend/src/main.tsx` – React entry point.
- `frontend/src/index.css` – Tailwind base styles and global layout.
- `frontend/src/components/GalaxyBackground.tsx` – animated galaxy background wrapper.
- `frontend/src/components/GlassCard.tsx` – reusable glassmorphism card.
- `frontend/src/components/BuyMeTea.tsx` – floating donation-style interaction.
- `frontend/tailwind.config.cjs` – Tailwind configuration.
- `frontend/vite.config.ts` – Vite setup for React and dev server.

## Getting Started

### Prerequisites

- Node.js 18+ (for the frontend)
- .NET SDK 9.0 (for the backend)
- Git (to clone and version the project)

### Install Dependencies

Clone the repository and install dependencies:

```bash
git clone <your-repo-url> AshishPortfolio
cd AshishPortfolio

cd frontend
npm ci
cd ..

cd PortfolioApi
dotnet restore
cd ..
```

## Running Locally

Run the backend API:

```bash
cd PortfolioApi
dotnet run
```

By default it exposes the CV endpoint at:

- `https://localhost:7268/api/cv`

Run the frontend:

```bash
cd frontend
npm run dev
```

Then open:

- `http://localhost:5173`

The frontend can work fully with its built-in fallback CV data even if the API is offline. When the API is running, the app will fetch CV data from `/api/cv`.

## Build Commands

Frontend:

```bash
cd frontend
npm run build      # type-check + production build
npm run typecheck  # type-check only
```

Backend:

```bash
cd PortfolioApi
dotnet build
```

## Security And Privacy

This portfolio intentionally displays personal details (name, roles, location, contact details, and project information).  
To reduce casual copying of this content from the live site, the frontend includes:

- Disabled text selection on most elements.
- Disabled right-click context menu.
- Prevented common keyboard shortcuts for copy/paste and some dev tools (where supported by the browser).

Important:

- These measures are only **soft protections**. Browsers and operating systems still allow screenshots, developer tools, and network inspection.
- Do not rely on this project to protect highly sensitive or secret data.

If you reuse this code, replace the CV data with your own and review the security/privacy requirements for your use case.
