# MS EXIMP Hypothecation Management System

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern, professional vehicle hypothecation management system built with Next.js 14, TypeScript, and Tailwind CSS. Designed for financial institutions to efficiently manage the complete lifecycle of vehicle hypothecation agreements.

## Features

### Core Functionality
- **Hypothecation Addition**: Create new hypothecation agreements with comprehensive vehicle details
- **Hypothecation Continuation**: Extend existing hypothecation periods seamlessly
- **Hypothecation Termination**: Close completed agreements with proper documentation

### Technical Highlights
- Built with Next.js 14 App Router for optimal performance
- TypeScript for type safety and better developer experience
- Modern, responsive UI with Tailwind CSS
- Form validation using Zod and react-hook-form
- Dual mode support: Dummy mode for testing, Production mode for live backend
- Comprehensive Selenium test automation suite
- Mobile-first responsive design
- Professional logo and branding

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Python 3.8+ (for Selenium tests)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tswi-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   # Set to 'dummy' for testing without backend, 'production' for real backend
   NEXT_PUBLIC_API_MODE=dummy

   # Backend API URL (used when API_MODE=production)
   NEXT_PUBLIC_API_URL=http://localhost:8080

   # Application
   NEXT_PUBLIC_APP_NAME="MS EXIMP Hypothecation Management"
   NEXT_PUBLIC_APP_VERSION=2.0.0
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
tswi-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── addition/          # Addition workflow page
│   │   ├── continuation/      # Continuation workflow page
│   │   ├── termination/       # Termination workflow page
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── Logo.tsx           # Application logo component
│   │   └── Navigation.tsx     # Navigation bar
│   └── lib/                   # Utility functions
│       ├── api.ts             # API service layer
│       └── utils.ts           # Helper functions
├── tests/
│   └── selenium/              # Selenium test automation
├── public/                    # Static assets
├── .env.local                 # Environment configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
# Run Selenium tests (requires dev server running)
npm run test:e2e

# Or run tests manually
python tests/selenium/run_tests.py
```

## API Modes

### Dummy Mode (Default)
Perfect for testing and development without a backend server.

Set in `.env.local`:
```env
NEXT_PUBLIC_API_MODE=dummy
```

### Production Mode
Connect to real backend API at http://localhost:8080/warryworks

Set in `.env.local`:
```env
NEXT_PUBLIC_API_MODE=production
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Testing

### Automated Testing with Selenium

1. Install test dependencies: `pip install -r tests/selenium/requirements.txt`
2. Start dev server: `npm run dev`
3. Run tests: `python tests/selenium/run_tests.py`
4. View report: `tests/selenium/test_report.html`

## Design System

### Colors
- **Primary**: Blue gradient
- **Secondary**: Purple gradient
- **Success**: Green
- **Error**: Red

### Components
Built with modern UI principles, fully responsive and accessible.

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t ms-eximp .
docker run -p 3000:3000 ms-eximp
```

## Migration from v1.x

Complete rewrite with Next.js 14, TypeScript, Tailwind CSS, and all business logic preserved.

## Changelog

### Version 2.0.0 (2024)
- Complete Next.js 14 migration
- TypeScript implementation
- Modern UI with Tailwind CSS
- Comprehensive test automation
- Professional branding

---

**Built for Financial Institutions**
