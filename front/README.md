# Link Reductor - Frontend

Next.js frontend for the URL shortener service.

## Features

- Clean, minimal interface
- URL validation
- One-click copy to clipboard
- Responsive design

## Local Development

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
pnpm dev
```

The application will be available at http://localhost:3000

### Build for Production
```bash
pnpm build
pnpm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)
