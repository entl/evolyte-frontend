# EvoLyte Frontend

This is the frontend application for **EvoLyte**, a solar energy forecasting platform that visualises solar panel locations and predicts energy production and CO₂ savings based on user inputs.

The frontend is built with [Nuxt 3](https://nuxt.com/), and communicates with backend services and machine learning models to display real-time forecasts and system information.

> **Note:**  
> This repository is actively being developed as part of my personal learning.  
> For the version submitted for the final university project, please refer to commit [`ac5bacf`](https://github.com/entl/evolyte-frontend/tree/ac5bacf168872ce0d4be5e91beac0a82bc0ca5aa).

---

## Project Structure

This frontend is part of the **EvoLyte** project, which consists of:
- Two backend services (API server and ML service)
- Machine Learning models for solar energy prediction
- This frontend application for user interaction and visualisation

All components of the EvoLyte project are available on GitHub under the **EvoLyte** repositories.

---

## Features

- Visualises clusters and detailed locations of solar PV panels on a map
- Allows users to input parameters (system size, location, tilt, azimuth) to generate custom forecasts
- Displays predicted energy production, CO₂ savings, and financial savings
- Integrates real-time weather information
- Responsive, clean user interface

---

## Setup Instructions

### 1. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed.

Then install project dependencies listed in `package.json`:

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install

# Using bun
bun install
```

---

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```env
NUXT_BASE_API_URL=your_backend_api_url
```

This sets the base URL for the backend API connection.  
Make sure the EvoLyte backend services are running and accessible.

---

### 3. Start Development Server

Start the development server at `http://localhost:3000`:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev

# Using bun
bun run dev
```

The application will reload automatically on code changes.

---

## Building for Production

Build the application for production:

```bash
# Using npm
npm run build

# Using pnpm
pnpm build

# Using yarn
yarn build

# Using bun
bun run build
```

Preview the production build locally:

```bash
# Using npm
npm run preview

# Using pnpm
pnpm preview

# Using yarn
yarn preview

# Using bun
bun run preview
```

---

## Deployment

For detailed deployment guidance, refer to the [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment).

---

## Additional Information

- This project is one part of the complete **EvoLyte** system.
- All EvoLyte components (frontend, backends, ML models) can be found under the **EvoLyte** repositories on GitHub.

---
