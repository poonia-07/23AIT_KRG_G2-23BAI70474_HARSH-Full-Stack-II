# EcoTracker - Full Stack II Project

## 📋 Project Overview

**EcoTracker** is a comprehensive full-stack learning project that demonstrates progressive React development patterns and state management techniques. The project tracks carbon footprint activities and provides a dashboard for monitoring ecological impact. It's organized into 4 experiments, each building upon the previous one with increasingly advanced React concepts.

---

## 📁 Project Structure

```
23AIT_KRG_G2-23BAI70474_HARSH-Full-Stack-II/
├── Exp 1/              # Basic React Setup
│   └── Code/
├── Exp 2/              # Context API & Authentication
├── Exp 3/              # Redux State Management
│   └── Redux/
└── Exp 4/              # Redux with Material-UI & Code Splitting
    └── Code/
```

---

## 🔄 Experiments Overview

### **Experiment 1: Basic React Setup**
**Location:** `Exp 1/Code/`

**Purpose:** Foundation of React application with basic component structure

**Features:**
- Basic component setup with React and Vite
- Landing page with Dashboard and Log pages
- Header component showing "EcoTracker" branding
- Welcome message display
- Sample data integration with logs

**Technologies:**
- React 19.2.0
- Vite (build tool)
- Basic component structure

**Key Files:**
- `App.jsx` - Main application with Header, Dashboard, and Log components
- `components/Header.jsx` - Navigation header
- `pages/DashBoard.jsx` - Dashboard display
- `pages/Log.jsx` - Activity logs display
- `data/logs.js` - Sample activity data

**To Run:**
```bash
cd "Exp 1/Code"
npm install
npm run dev
```

---

### **Experiment 2: Context API & Authentication**
**Location:** `Exp 2/`

**Purpose:** Implement authentication and route protection with Context API

**Features:**
- User authentication system
- Route-protected pages
- Context-based state management using `AuthContext`
- Multiple dashboard views
- Role-based access control

**Technologies:**
- React 19.2.0
- React Router 7.12.0
- Context API for state management
- Vite

**Key Components:**
- **AuthContext** - Global authentication state management
- **ProtectedRoute** - Route wrapper for authenticated pages
- **Login** - Login page for authentication
- **Dashboard Pages:**
  - DashboardLayout - Main dashboard wrapper
  - DashboardSummary - Summary view
  - DashboardAnalytics - Analytics view
  - DashboardSettings - Settings view
- **Logs** - Activities log viewer

**Route Structure:**
```
/login              → Login page (public)
/                   → DashboardLayout (protected)
  ├── /summary      → Summary view
  ├── /analytics    → Analytics view
  └── /settings     → Settings view
/logs               → Logs page (protected)
```

**Key Files:**
- `src/context/AuthContext.jsx` - Authentication context provider
- `src/routes/ProtectedRoute.jsx` - Route protection logic
- `src/App.jsx` - Route configuration

**To Run:**
```bash
cd Exp 2
npm install
npm run dev
```

---

### **Experiment 3: Redux State Management**
**Location:** `Exp 3/Redux/`

**Purpose:** Replace Context API with Redux for global state management using Redux Toolkit

**Features:**
- Redux store configuration with Redux Toolkit
- Async thunks for data fetching
- Loading states and error handling
- Slice-based state organization
- All features from Exp 2 plus Redux state management

**Technologies:**
- React 19.2.0
- React Router 7.12.0
- Redux Toolkit 2.11.2
- React-Redux 9.2.0
- Vite

**Redux Store Structure:**
- **Store** - Configured with `configureStore`
- **LogSlice** - Handles log data state
  - State:
    - `data` - Array of activity logs
    - `status` - Loading status (idle, loading, success, failed)
    - `error` - Error message if any
  - Async Thunk: `fetchLogs` - Simulates API call with 1s delay

**Key Features:**
```javascript
// LogSlice Structure
{
  logs: {
    data: [],           // Activity logs
    status: "idle",     // Loading state
    error: null         // Error message
  }
}
```

**Key Files:**
- `src/store/store.jsx` - Redux store configuration
- `src/store/logSlice.jsx` - Logs slice with async thunks
- `src/App.jsx` - Same route structure as Exp 2

**Sample Log Data:**
```javascript
[
  { id: 1, activity: "Car Travel", carbon: 4 },
  { id: 2, activity: "Electricity Usage", carbon: 6 },
  { id: 3, activity: "Cycling", carbon: 0 },
  { id: 4, activity: "Bus Travel", carbon: 3 },
  { id: 5, activity: "Solar Energy Usage", carbon: 1 },
  { id: 6, activity: "Flight Travel", carbon: 8 }
]
```

**To Run:**
```bash
cd "Exp 3/Redux"
npm install
npm run dev
```

---

### **Experiment 4: Advanced Redux with Material-UI & Code Splitting**
**Location:** `Exp 4/Code/`

**Purpose:** Production-ready application with UI library, lazy loading, and advanced patterns

**Features:**
- All features from Exp 3 plus:
- Material-UI component library for professional styling
- Code splitting with React Suspense lazy loading
- Route-based code splitting
- Enhanced error boundaries and loading states
- Emotion styling (required by Material-UI)

**Technologies:**
- React 19.2.0
- React Router 7.12.0
- Redux Toolkit 2.11.2
- React-Redux 9.2.0
- Material-UI 7.3.8
- Emotion (CSS-in-JS)
- Vite
- ESLint for code quality

**Key Enhancements:**
1. **Lazy Loading** - Components loaded on demand:
   ```javascript
   const Login = lazy(() => import("./pages/Login"));
   const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
   // ... other components
   ```

2. **Suspense Boundary** - Fallback loading state during code split:
   ```javascript
   <Suspense fallback={<h2>Loading...</h2>}>
     <Routes>{/* ... */}</Routes>
   </Suspense>
   ```

3. **Material-UI Integration** - Professional UI components
4. **Logout Page** - Added explicit logout route

**Route Structure (Enhanced):**
```
/login              → Login (lazy loaded, protected)
/logout             → Logout (lazy loaded)
/                   → DashboardLayout (lazy loaded, protected)
  ├── /summary      → DashboardSummary (lazy loaded)
  ├── /analytics    → DashboardAnalytics (lazy loaded)
  └── /settings     → DashboardSettings (lazy loaded)
/logs               → Logs (lazy loaded, protected)
```

**Key Files:**
- `src/App.jsx` - Advanced route configuration with lazy loading
- `src/store/store.jsx` - Redux store
- `src/store/logSlice.jsx` - Logs state management
- `src/routes/ProtectedRoute.jsx` - Route protection
- `src/context/AuthContext.jsx` - Authentication context
- `src/components/Header.jsx` - Navigation header

**To Run:**
```bash
cd "Exp 4/Code"
npm install
npm run dev
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start (Choose One Experiment)

**For Experiment 1:**
```bash
cd "Exp 1/Code"
npm install
npm run dev
```

**For Experiment 2:**
```bash
cd Exp 2
npm install
npm run dev
```

**For Experiment 3:**
```bash
cd "Exp 3/Redux"
npm install
npm run dev
```

**For Experiment 4:**
```bash
cd "Exp 4/Code"
npm install
npm run dev
```

---

## 📚 Learning Progression

| Experiment | Focus | Key Concepts |
|------------|-------|--------------|
| **Exp 1** | Basic Setup | Components, Props, Basic Structure |
| **Exp 2** | Authentication & Routes | Context API, React Router, Protected Routes |
| **Exp 3** | State Management | Redux Toolkit, Slices, Async Thunks |
| **Exp 4** | Production-Ready | Code Splitting, Lazy Loading, UI Library |

---

## 🛠️ Common Commands

For any experiment, these commands are available:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 📊 Data Model

### Activity Log Entry
```javascript
{
  id: number,           // Unique identifier
  activity: string,     // Name of the activity
  carbon: number        // Carbon footprint rating (0-8)
}
```

**Sample Activities & Carbon Ratings:**
- Car Travel: 4
- Electricity Usage: 6
- Cycling: 0
- Bus Travel: 3
- Solar Energy Usage: 1
- Flight Travel: 8

---

## 🔐 Authentication

**Experiment 2, 3, and 4** implement a basic authentication system:
- Login page for user authentication
- Protected routes that require authentication
- AuthContext for managing authentication state
- Logout functionality

Default authentication behavior:
- Unauthenticated users redirected to login
- Authenticated users can access dashboard and logs
- Routes protected via `ProtectedRoute` component

---

## 📦 Dependencies Summary

### Common to All
- React 19.2.0
- Vite 7.2.4
- ESLint 9.39.1

### Exp 2 & 3 & 4
- React Router DOM 7.12.0

### Exp 3 & 4
- Redux Toolkit 2.11.2
- React-Redux 9.2.0

### Exp 4 Only
- Material-UI 7.3.8
- Emotion (React & Styled) 11.14.0

---

## 💡 Key Takeaways

1. **Exp 1**: Foundation of React component architecture
2. **Exp 2**: Client-side routing and authentication patterns
3. **Exp 3**: Centralized state management with Redux
4. **Exp 4**: Performance optimization and professional UI

---

## 📝 Notes

- Each experiment is independent and self-contained
- No shared dependencies between folders
- All experiments use Vite as the build tool
- ESLint configuration included for code quality
- Project demonstrating scalable React patterns

---

## 👨‍💼 Project Information

- **Student ID:** 23BAI70474
- **Student Name:** HARSH
- **Course:** Full Stack II
- **Project Type:** Progressive Learning Project

---

## 📖 File Organization Guide

### Component Structure
- `components/` - Reusable UI components (Header, etc.)
- `pages/` - Page components (Dashboard, Login, etc.)
- `context/` - Context providers (AuthContext)
- `routes/` - Route components (ProtectedRoute)
- `store/` - Redux store configuration (Exp 3 & 4)
- `data/` - Static data files (logs.js)

### Styling
- `*.css` - Component-specific styles
- Material-UI (Exp 4) - Component library styles

---

**Last Updated:** February 2026

