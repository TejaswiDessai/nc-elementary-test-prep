# Testing Documentation - NC Elementary Test Prep

## 🏗️ Test Architecture
This project employs a tiered testing strategy to ensure stability and correctness across the entire application.

### 1. Unit Tests (Vitest)
**Location**: `tests/unit/`
**Purpose**: Test individual utility functions (e.g., `loader.js`) and logic in isolation.
**Tooling**: Vitest + Mocking (via `vi`).

### 2. Integration Tests (Vitest + RTL)
**Location**: `tests/integration/`
**Purpose**: Test React components in isolation to verify rendering and user interaction.
**Tooling**: React Testing Library + `@testing-library/jest-dom`.

### 3. End-to-End (E2E) Tests (Playwright)
**Location**: `tests/e2e/`
**Purpose**: Verify critical user journeys (e.g., completing a quiz) across multiple browser engines and screen sizes.
**Tooling**: Playwright.

---

## 🚀 Setup Instructions

### Installation
```bash
npm install
```

### Running Tests
| Command | Description |
| :--- | :--- |
| `npm test` | Runs unit and integration tests |
| `npm run test:watch` | Runs tests in watch mode (dev) |
| `npm run test:coverage` | Generates coverage report |
| `npm run test:e2e` | Runs E2E tests in headless mode |

### Playwright Setup
If running E2E tests locally for the first time:
```bash
npx playwright install
```

---

## 🛠️ Mocking Strategy
- **Data Mocking**: We use `vi.fn()` to mock `fetch` calls in unit tests to avoid network dependency.
- **Fixtures**: Store reusable JSON data in `tests/fixtures/` for consistent test inputs.

## 📊 Coverage Targets
We aim for the following minimum thresholds:
- Statements: 90%
- Branches: 80%
- Functions: 90%
- Lines: 90%

Coverage reports are generated in the `/coverage` folder as HTML.

## 🔍 Troubleshooting
- **`jsdom` errors**: Ensure `tests/setup.js` is listed in `vite.config.js`.
- **Playwright timeout**: Increase timeout in `playwright.config.js` or check if the local dev server is running (`npm run dev`).
- **Coverage failures**: Run `npm run test:coverage` to identify missing branches in the HTML report.
