# URL Shortener

A React-based web application for shortening URLs with admin management capabilities. Built with TypeScript and Material-UI, featuring a responsive layout and internationalization support.

## Features

- URL shortening with custom IDs
- Admin dashboard for URL management
- Internationalization (English and German)
- Copy to clipboard functionality
- Responsive Material-UI design

## Technologies

- React 18
- TypeScript 5
- Vite
- Material-UI (MUI)
- React Router v6
- i18next
- Axios

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Setup

1. Clone the repository:
```bash
git clone https://github.com/placideirandora/url-shortner-ui
cd url-shortener-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=<your-api-base-url>
VITE_AUTH_USERNAME=<basic-auth-username>
VITE_AUTH_PASSWORD=<basic-auth-password>
```

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── pages/
├── contexts/
├── hooks/
├── utils/
├── App.tsx
└── main.tsx
```

## Available Scripts

- `dev`: Starts development server
- `build`: Creates production build
- `preview`: Previews production build locally
- `lint`: Runs ESLint
- `lint:fix`: Fixes ESLint issues

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| VITE_API_URL | Base URL for the API | Yes |
| VITE_AUTH_USERNAME | Basic auth username | Yes |
| VITE_AUTH_PASSWORD | Basic auth password | Yes |

## Pages

- `/`: Home/URL shortening interface
- `/user-input-mask`: URL shortening interface
- `/admin-overview`: Admin dashboard for URL management
