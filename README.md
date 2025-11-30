# Commodities Project

This project is a web application built with React, TypeScript, and Vite that aims to display various commodities data. It provides a simple and efficient way to visualize and interact with commodity information, specifically focusing on the purchasing power of commodities relative to different bases since the year 2000.

## Features

*   **Interactive Line Chart**: Visualizes the price index of various commodities over time (2000-2025).
*   **Dynamic Basis Selection**: Allows users to switch the "base" currency or value against which all other commodities are measured. Options include:
    *   **Gold**
    *   **Dollar** (USD)
    *   **CHF** (Swiss Franc)
    *   **EUR** (Euro)
    *   **Lohn** (Wages)
*   **Customizable Comparisons**: Users can toggle specific commodities on and off to customize the chart view. Supported commodities include:
    *   **Currencies/Indices**: Gold, Dollar, CHF, EUR, Wages (Lohn)
    *   **Energy**: Electricity (Strom), Oil (Öl), Brent Crude, Natural Gas (Erdgas)
    *   **Metals**: Steel (Stahl), Copper (Kupfer), Aluminum (Alu), Silver (Silber)
    *   **Agriculture**: Wheat (Weizen), Corn (Mais), Soy (Soja), Vegetable Oil (Pflanzenöl), Cocoa (Kakao), Coffee (Kaffee)
    *   **Food**: Chicken (Hühnerfleisch), Eggs (Eier), Butter, Milk (Milch), Bread (Brot), Meat (Fleisch)
*   **Detailed Data Table**: A comprehensive table listing the raw price data for all commodities across all years.

![Commodities App Screenshot](./screenshot.png)

## How it Works

The application calculates a **Price Index** for each commodity, normalized to the year 2000 (Index = 100).

1.  **Select a Basis**: When you choose a basis (e.g., "Gold"), the application calculates how much of that basis was needed to buy the commodity in each year.
2.  **Normalization**: This ratio is then normalized so that the value in the year 2000 is always 100.
3.  **Interpretation**:
    *   **Index > 100**: The commodity has become **more expensive** relative to the selected basis (purchasing power of the basis has decreased).
    *   **Index < 100**: The commodity has become **cheaper** relative to the selected basis (purchasing power of the basis has increased).

## Technology Stack

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite**: A next-generation frontend tooling that provides a fast development experience.
*   **Recharts**: A composable charting library built on React components.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system.

*   Node.js (LTS version recommended)
*   npm (usually comes with Node.js) or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd commodities
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running the Project

To run the project in development mode:

```bash
npm run dev
```
or
```bash
yarn dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

To build the project for production:

```bash
npm run build
```
or
```bash
yarn build
```

This will create a `dist` directory with the production-ready static files.

### Viewing Locally

To view the built application directly from your file system (without a web server):

1.  Run `npm run build` to generate the `dist` folder.
2.  Open the `dist/index.html` file in your web browser.

*Note: The project is configured with `base: './'` in `vite.config.js` to support relative paths for this purpose.*