# VoltFleet — EV Fleet Management Admin Template

![VoltFleet Preview](documentation/preview.png)

> A modern, production-ready admin dashboard for electric vehicle fleet management. Built with Next.js 14, Tailwind CSS, and shadcn/ui.

---

## 📦 What's Included

```
voltfleet-admin/
├── app/                        # Next.js App Router pages
│   ├── dashboard/              # Fleet Command Center
│   ├── fleet-overview/         # Fleet Overview page
│   ├── live-tracking/          # Real-time Vehicle Tracking (map)
│   ├── charging-stations/      # Charging Station Management
│   ├── drivers/                # Driver Management
│   ├── battery-health/         # Battery Health Analytics
│   ├── analytics/              # Analytics & Reports
│   ├── performance/            # Performance Metrics
│   ├── alerts/                 # Alerts & Notifications
│   └── settings/               # Settings page
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui base components
│   ├── layout/                 # Sidebar, Header, Navigation
│   ├── charts/                 # Chart components
│   └── widgets/                # Dashboard widgets
├── lib/                        # Utilities and helpers
├── public/                     # Static assets
├── documentation/              # Full HTML documentation
│   └── index.html
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Requirements

| Tool | Version |
|------|---------|
| Node.js | v18.17 or higher |
| npm / yarn / pnpm | Latest |
| Git | Any recent version |

### Installation

**1. Extract the ZIP file**

```bash
unzip voltfleet-admin.zip
cd voltfleet-admin
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## ✨ Features

### Dashboard & Navigation
- **Fleet Command Center** — Real-time monitoring overview with KPI cards
- **Fully functional sidebar navigation** — All links route to working pages
- **Responsive layout** — Works on desktop, tablet, and mobile
- **Dark theme** — Professional dark UI throughout
- **Quick search** — Global search bar with keyboard shortcut (⌘K)

### Pages Included (10 Total)
| Page | Description |
|------|-------------|
| Dashboard | Fleet KPIs, active alerts, quick actions, recent activity |
| Fleet Overview | Vehicle list with status, battery, and driver info |
| Live Tracking | Real-time map with vehicle markers and status panel |
| Charging Stations | Station management with availability and power data |
| Drivers | Driver profiles, scores, and assignments |
| Battery Health | SoH analytics, cell balance heatmap, degradation trends |
| Analytics | Charts, energy consumption, and fleet statistics |
| Performance | Efficiency metrics and vehicle performance data |
| Alerts & Notifications | Inbox + Kanban alert management with rule builder |
| Settings | System configuration and preferences |

### UI Components
- Stat/KPI metric cards
- Data tables with sorting
- Alert inbox with triage workflow
- Kanban board for alert management
- Battery cell balance heatmap
- Line, bar, and area charts
- Real-time map integration
- Status badges and indicators
- Modal dialogs and drawers
- Form inputs and selects

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **UI Library**: shadcn/ui
- **Language**: TypeScript
- **Icons**: Lucide React
- **Charts**: Recharts
- **Map**: Leaflet / React-Leaflet

---

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts` to update the color palette:

```ts
theme: {
  extend: {
    colors: {
      primary: "#22c55e",    // Change brand color here
      background: "#0a0f0d",
      card: "#111814",
    }
  }
}
```

### Changing the Logo / Brand Name

Open `components/layout/Sidebar.tsx` and update the logo and brand name:

```tsx
<span className="font-bold text-lg">YourBrand</span>
```

### Adding New Pages

1. Create a new folder under `app/your-page/`
2. Add `page.tsx` inside it
3. Add a link in `components/layout/Sidebar.tsx`

---

## 🗂️ File Structure Details

### `app/` — Pages

Each folder corresponds to a route. Uses Next.js 14 App Router conventions.

### `components/ui/` — shadcn/ui Components

Pre-configured shadcn/ui components. Add more via:

```bash
npx shadcn-ui@latest add [component-name]
```

### `lib/` — Utilities

Helper functions, mock data, and type definitions.

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 📄 Documentation

Full documentation is available at:

```
documentation/index.html
```

Open this file in any browser — no server required.

---

## 🆘 Support

If you have questions or issues, please use the **Envato item comments** section on the ThemeForest item page. We respond within **24–48 hours**.

Before posting, please:
- Check the `documentation/index.html` for answers
- Make sure you're running Node.js v18+
- Check the console for any error messages

---

## 📝 Credits

- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Lucide Icons](https://lucide.dev/) — Icon library
- [Recharts](https://recharts.org/) — Charting library

---

## ⚖️ License

This template is licensed under the **Envato Regular License**.

- ✅ Use in one end product (personal or client project)
- ✅ Free updates via ThemeForest
- ❌ Do not resell or redistribute the source code
- ❌ Do not use in SaaS products without an Extended License

For multi-use or SaaS projects, please purchase the **Extended License**.

---

## 📬 Contact

For pre-sale questions or custom work, message us via the ThemeForest author profile page.

---

*VoltFleet Admin — Built with care for EV fleet operators and developers.*