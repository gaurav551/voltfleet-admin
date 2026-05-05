# Changelog

All notable changes to **VoltFleet Admin** are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2025-05-05

### 🎉 Initial Release

This is the first public release of VoltFleet Admin — a modern EV fleet management dashboard template built with Next.js 14, Tailwind CSS, and shadcn/ui.

---

### Pages Added

- **Dashboard** — Fleet Command Center with KPI cards, active alerts panel, quick actions, and recent activity feed
- **Fleet Overview** — Full vehicle list with status indicators, battery levels, driver assignments, and range data
- **Live Tracking** — Real-time map view with color-coded vehicle markers, battery status, and side panel vehicle list
- **Charging Stations** — Station grid with availability, connector types, power output, and location data
- **Drivers** — Driver roster with performance scores, vehicle assignments, and contact info
- **Battery Health** — State of Health (SoH) analytics, cell balance heatmap with live monitoring, degradation prediction
- **Analytics** — Energy consumption charts, fleet utilization graphs, cost analysis
- **Performance** — Efficiency metrics, mi/kWh tracking, vehicle comparison data
- **Alerts & Notifications** — Dual-view (Inbox + Kanban) alert management with Rule Builder, severity levels, and assignee tracking
- **Settings** — System preferences, notification config, and account management

---

### Components Added

- Sidebar navigation with collapsible support and active link highlighting
- Top header bar with global search (⌘K), system status indicator, clock, and notification bell
- KPI metric cards with trend indicators (+/- percentage)
- Alert inbox items with severity color coding (critical / warning / info)
- Kanban board columns for alert workflow management
- Battery cell heatmap grid with green / amber / red status cells
- Data tables with status badges, action menus
- Real-time map with vehicle pin markers (moving / charging / idle states)
- Quick Actions panel with icon buttons
- Recent Activity feed with timestamps
- Rule Builder UI for custom alert configuration
- Modal overlays and slide-in drawers
- Form inputs, selects, toggles, and checkboxes (via shadcn/ui)
- Responsive sidebar with mobile toggle

---

### Technical

- Built on **Next.js 14** with App Router
- Fully typed with **TypeScript**
- Styled with **Tailwind CSS v3**
- UI components via **shadcn/ui**
- Icons via **Lucide React**
- Charts via **Recharts**
- Map via **Leaflet / React-Leaflet**
- ESLint configured with Next.js rules
- PostCSS and Tailwind build pipeline set up
- Clean `tsconfig.json` with path aliases

---

### Documentation

- Full `documentation/index.html` included — covers installation, structure, customization, and component reference
- `README.md` with quick start guide
- `CHANGELOG.md` (this file)

---

*VoltFleet Admin v1.0.0 — Initial release on ThemeForest / Envato Market*