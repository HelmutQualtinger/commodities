# Claude Code Guide for Commodities Project

This guide helps you work with the Commodities project using Claude Code. It covers project structure, development workflows, and best practices for common tasks.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technologies & Stack](#technologies--stack)
4. [Setup & Installation](#setup--installation)
5. [Development Workflow](#development-workflow)
6. [Docker Deployment](#docker-deployment)
7. [Using Claude Code](#using-claude-code)
8. [Common Tasks](#common-tasks)
9. [Project Features](#project-features)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Commodities** is a React-based web application that visualizes commodity price indices from 2000 to 2025. It allows users to:

- Compare commodity prices relative to different bases (Gold, Dollar, CHF, EUR, Wages)
- View interactive line charts with customizable time ranges
- Toggle individual commodities to focus on specific trends
- Analyze raw price data in a detailed table format
- Understand purchasing power changes over 25 years

**Key Purpose**: The project demonstrates how purchasing power of various bases (currencies, commodities) has changed relative to commodity prices since 2000.

**Live Demo**: https://preise.bekerh.ddns.net

---

## Project Structure

```
commodities/
├── src/
│   ├── main.tsx              # React app entry point
│   ├── App.tsx               # Main application component (all logic & UI)
│   ├── index.css             # Global styles
│   └── components/
│       └── TimeRangeSlider.tsx  # Time range slider component (currently unused)
├── public/
│   └── (static assets)
├── docker-compose.yaml       # Docker Compose configuration
├── Dockerfile                # Docker build configuration
├── package.json              # Node dependencies & scripts
├── vite.config.js            # Vite build configuration
├── nginx.conf                # Nginx configuration for production
├── server.js                 # Simple Node.js server
├── index.html                # HTML template
├── README.md                 # Project documentation (in German)
└── .gitignore                # Git ignore rules
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Core component containing all commodity data, charts, and UI logic |
| `docker-compose.yaml` | Defines services for containerized deployment |
| `Dockerfile` | Multi-stage build for Node.js and production server |
| `package.json` | Dependencies: React, React-DOM, Recharts, Tailwind CSS, Vite |
| `vite.config.js` | Build tool configuration for development and production |

---

## Technologies & Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript (tsx)** - Type-safe JavaScript
- **Recharts 3.5.1** - Charting library built on React components
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Vite 7.2.4** - Next-generation build tool

### Build & Development
- **Vite** - Fast HMR (Hot Module Replacement) during development
- **TypeScript** - Type checking and compilation
- **PostCSS & Autoprefixer** - CSS processing

### Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server
- **Node.js** - Runtime environment

### Testing & Screenshots
- **Playwright 1.57.0** - Browser automation (for screenshots)

---

## Setup & Installation

### Prerequisites

You need one of:
- **Node.js 18+** and npm/yarn installed locally
- **Docker & Docker Compose** for containerized development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/HelmutQualtinger/commodities.git
cd commodities

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Using Docker

```bash
# Build and start services
docker compose up -d

# View logs
docker compose logs -f commodities

# Stop services
docker compose down
```

The app will be available at `http://localhost:90`

### Network Configuration

The Docker Compose setup uses an **external network** called `reverse-proxy`:

```yaml
networks:
  reverse-proxy:
    external: true
```

**Create the network before starting:**
```bash
docker network create reverse-proxy
```

This allows the commodities service to communicate with other services on the `reverse-proxy` network (e.g., nginx reverse proxy, other applications).

---

## Development Workflow

### Scripts

```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Build for production (creates dist/ folder)
npm run preview  # Preview production build locally
```

### Development Tips

1. **Hot Module Replacement (HMR)**: Changes to React components automatically refresh in the browser
2. **No build step needed**: Vite handles compilation on-the-fly
3. **Type checking**: Use `tsc --noEmit` to check types without building
4. **Tailwind CSS**: All classes are available via Tailwind; no custom CSS needed for most styling

### Structure of App.tsx

The entire application logic is in `src/App.tsx`:

- **State Management**: Uses React hooks (useState)
  - `selectedCommodities`: Track which commodities are displayed
  - `basis`: Current base for comparison (Gold, Dollar, CHF, EUR, Lohn)
  - `timeRange`: Selected year range for filtering

- **Data Structure**:
  - `years`: Array of years from 2000 to 2025
  - `commodities`: Object with commodity names as keys, price arrays as values
  - `colors`: Object mapping commodity names to chart colors

- **Key Calculations**:
  - `ratios`: Commodity price / basis price
  - `data`: Indexed data with base year = 100
  - Filtering by `timeRange`

---

## Docker Deployment

### Docker Architecture

**Multi-stage build** in `Dockerfile`:
1. Build stage: Node.js builds the app with Vite
2. Runtime stage: Nginx serves the built files

### Building the Image

```bash
docker build -t commodities-app .
```

### Running with Docker Compose

```bash
# Start the service
docker compose up -d

# Stop the service
docker compose down

# Rebuild after code changes
docker compose up -d --build
```

### Configuration

- **Container name**: `commodities-app`
- **Environment**: `NODE_ENV=production`
- **Restart policy**: `unless-stopped`
- **Port mapping**: Internal 80 → External (configured in reverse proxy)

### Nginx Configuration

The `nginx.conf` file configures Nginx to:
- Serve static files from the built app
- Handle routing for Single Page Application (SPA)
- Set appropriate caching headers

---

## Using Claude Code

Claude Code is your AI-powered development assistant. Here's how to use it effectively with this project:

### Starting Claude Code

```bash
claude code
```

### Common Commands

| Task | Command | Description |
|------|---------|-------------|
| **Explore codebase** | Describe the file/component | Claude will search and explain |
| **Add a feature** | "Add X feature" | Claude will plan and implement |
| **Fix a bug** | "Fix X bug" | Claude will diagnose and fix |
| **Refactor code** | "Refactor X component" | Claude will improve structure |
| **Understand code** | "Explain X" | Claude will provide detailed explanation |
| **Add tests** | "Add tests for X" | Claude will write test cases |
| **Generate data** | "Add commodity X with data" | Claude will add new commodities |

### Development Tips with Claude Code

#### 1. **Adding New Commodities**

To add a new commodity to the app:

```
Claude, add a new commodity called "Lithium" with prices from 2000 to 2025.
The prices should reflect realistic lithium price trends over that period.
```

Claude will:
- Add the commodity name to the data structure
- Fill in realistic price data
- Add a color mapping
- Update the UI if needed

#### 2. **Modifying the Basis Selection**

To add new bases for comparison:

```
Claude, add a new basis option called "Rent" to the basis selector.
Include historical rent data for the 2000-2025 period.
```

#### 3. **Improving the UI**

To enhance styling or layout:

```
Claude, improve the responsive design of the commodity selector buttons.
Make them stack better on mobile devices.
```

#### 4. **Fixing Bugs**

When something breaks:

```
Claude, the chart doesn't display correctly when I select the 2020-2025 time range.
```

Claude will identify the issue (likely in the data indexing) and fix it.

#### 5. **Performance Optimization**

To optimize performance:

```
Claude, the chart is slow when rendering all 26 commodities.
Optimize the performance without losing functionality.
```

### Using Claude Code Tools

Claude Code has access to several tools:

- **Read files**: `Read` tool for viewing code
- **Edit files**: `Edit` tool for making changes
- **Search code**: `Grep` and `Glob` for finding patterns
- **Run bash**: `Bash` tool for executing commands
- **Git operations**: Full git support for commits and pushes
- **Execute code**: Run and test changes
- **Create PRs**: Generate pull requests on GitHub

### Best Practices

1. **Be Specific**: Instead of "Fix the app", say "Fix the time range slider not resetting when changing basis"
2. **Provide Context**: Include error messages, screenshots, or expected behavior
3. **Ask for Explanations**: "Explain how the price index calculation works"
4. **Request Code Reviews**: "Review the App.tsx component for performance issues"
5. **Use Code References**: Claude will reference file locations like `src/App.tsx:123`

---

## Common Tasks

### Adding a New Commodity

1. Get the historical price data (26 years: 2000-2025)
2. Add the data array to the `commodities` object in `src/App.tsx`
3. Add a color mapping in the `colors` object
4. The commodity automatically appears in the UI

**Example**:
```typescript
const commodities = {
  // ... existing commodities
  Lithium: [12.5, 13.2, 14.1, ...], // 26 values for 2000-2025
};

const colors = {
  // ... existing colors
  Lithium: '#10b981', // teal color
};
```

### Changing the Time Range

The time range is controlled by the dual slider in the UI. The app:
1. Filters the `years` array based on selection
2. Recalculates indices based on the new start year
3. Updates the chart and table automatically

No code changes needed—it's fully interactive.

### Switching Basis for Comparison

Users can select different bases (Gold, Dollar, CHF, EUR, Lohn). The app:
1. Retrieves the basis price array from `commodities[basis]`
2. Calculates ratios: `commodity / basis` for each year
3. Indexes the ratios with the start year = 100
4. Updates the chart with new lines

No code changes needed—it's fully interactive.

### Updating Price Data

To update prices for existing commodities:

1. Edit the price array in the `commodities` object
2. The changes instantly reflect in the chart and table
3. No rebuild needed in development (HMR updates automatically)

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Compiled HTML
- Hashed asset names (for caching)

### Deploying to Docker

```bash
docker compose up -d --build
```

Docker Compose will:
1. Build the image
2. Start the container
3. Map ports
4. Connect to the reverse-proxy network

---

## Project Features

### Interactive Line Chart

- **Library**: Recharts
- **Features**:
  - Multiple selectable lines (commodities)
  - X-axis: Years (2000-2025)
  - Y-axis: Price index (base year = 100)
  - Tooltip on hover: Shows exact values
  - Legend: Toggle commodities on/off
  - Baseline: Dashed line at y=100 for reference

### Basis Selection

Five options for comparing commodities:

| Basis | Description |
|-------|-------------|
| **Gold** | Purchasing power relative to gold (commodity base) |
| **Dollar** | Purchasing power relative to USD (currency base) |
| **CHF** | Purchasing power relative to Swiss Franc |
| **EUR** | Purchasing power relative to Euro |
| **Lohn** | Purchasing power relative to wages (labor cost) |

### Time Range Slider

- Dual-range input for filtering years
- Dynamic data recalculation
- Chart and table update in real-time
- Prevents invalid selections (min > max)

### Commodity Categories

The app includes 39 commodities across 5 categories:

| Category | Commodities |
|----------|-------------|
| **Currencies/Indices** | Gold, Dollar, CHF, EUR, Lohn |
| **Energy** | Strom (Electricity), Öl (Oil), Brent, Erdgas (Natural Gas), Kohle (Coal) |
| **Metals** | Stahl (Steel), Kupfer (Copper), Alu (Aluminum), Silber (Silver) |
| **Agriculture** | Weizen (Wheat), Mais (Corn), Soja (Soy), Pflanzenöl (Plant Oil) |
| **Food & Beverages** | Kakao (Cocoa), Kaffee (Coffee), Hühnerfleisch (Chicken), Eier (Eggs), Butter, Milch (Milk), Brot (Bread), Fleisch (Meat) |

### Data Table

- Shows raw price data for all commodities
- Filterable by selected time range
- Formatted numbers with proper locale (de-CH)
- Alternating row colors for readability

---

## Troubleshooting

### Issue: "Port 5173 already in use"

**Solution**: Vite will automatically use the next available port. Check the console output.

```bash
npm run dev
# Output: VITE v7.2.4 ready in 234 ms
# ➜ Local: http://localhost:5174
```

### Issue: Docker container won't start

**Possible causes**:
1. Network doesn't exist: `docker network create reverse-proxy`
2. Port already in use: Change port in docker-compose.yaml
3. Image build failed: `docker compose up -d --build` with verbose output

**Debug**:
```bash
docker compose logs commodities
docker inspect commodities-app
```

### Issue: Chart doesn't render

**Possible causes**:
1. Data format issue: Check that `commodities` object has all required keys
2. State update problem: Check React DevTools for state changes
3. Recharts issue: Verify data structure matches chart expectations

**Solution**: Check the browser console for errors:
- Open DevTools (F12)
- Look for red error messages
- Check Network tab for 404 errors

### Issue: Time range slider not working

**Possible causes**:
1. CSS issue: Inline styles might be overridden
2. Event handler not firing: Check React DevTools for state changes
3. Range validation preventing updates

**Solution**: Clear cache and rebuild:
```bash
npm run build
npm run preview
```

### Issue: Prices not updating after code changes

**Solution**: In development, HMR should auto-update:
```bash
npm run dev
```

If not working:
1. Check Vite console for errors
2. Save the file again (force re-compilation)
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Docker compose fails with "external network not found"

**Solution**: Create the external network first:
```bash
docker network create reverse-proxy
docker compose up -d
```

---

## Development Best Practices

### Code Style

- **Naming**: camelCase for variables/functions, PascalCase for components
- **Components**: Keep components focused on single responsibility
- **State**: Use useState for local component state
- **Styling**: Use Tailwind CSS classes; avoid inline styles when possible

### Performance

- **Chart rendering**: Currently re-renders on every state change; consider memoization for large datasets
- **Data filtering**: Efficient array slicing by index
- **Bundle size**: Recharts adds ~200KB; consider lightweight alternatives if needed

### Type Safety

- Use TypeScript interfaces for data structures
- Define types for component props
- Avoid `any` type; use specific types

### Testing Strategy

- Manual testing through UI is primary method
- Playwright available for automated screenshot tests
- Unit tests can be added via Vitest

---

## Resources

### Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Recharts Docs](https://recharts.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Related Files

- Project README: `README.md` (in German)
- Docker setup: `docker-compose.yaml`, `Dockerfile`
- Build config: `vite.config.js`

### Getting Help

Use Claude Code:
```
Claude, explain how [feature] works in this project.
```

Or ask specific questions:
```
Claude, how should I add a new commodity to the app?
Claude, why isn't the time range slider working?
Claude, optimize the chart rendering performance.
```

---

## Summary

The **Commodities** project is a modern React application demonstrating commodity price trends over 25 years. It's built with:
- **React + TypeScript** for type-safe components
- **Vite** for fast development
- **Recharts** for interactive visualizations
- **Tailwind CSS** for responsive design
- **Docker** for containerized deployment

Use **Claude Code** to:
- Add new commodities or features
- Fix bugs and issues
- Refactor and optimize code
- Understand the codebase
- Deploy and manage the application

Happy coding!
