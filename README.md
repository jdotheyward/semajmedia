# SEMAJ Media Tools

Internal tools and reference guides for Heyward Management Group / SEMAJ Media.

Built with React. Deployed on Vercel. Saves data to localStorage in your browser.

---

## Live Tools

| Tool | Description |
|------|-------------|
| Flipside Work Plan | Phase-by-phase Substack launch tracker with milestone dashboard |
| SocialBee Guide | Evergreen recycling, Marblism campaign integration, weekly workflow |

---

## Adding New Tools

1. Create a new file in `src/tools/` or `src/guides/`
2. Build it as a React component with `export default function YourTool()`
3. Import it in `src/App.jsx`
4. Add it to the `tools` or `guides` array in App.jsx

```javascript
// In App.jsx
import YourTool from "./tools/YourTool";

const tools = [
  // existing tools...
  {
    id: "yourtool",
    section: "tools",
    label: "Your Tool Name",
    icon: "🔧",
    brand: "SEMAJ Media",
    description: "What this tool does",
    component: YourTool,
  },
];
```

Push to GitHub → Vercel redeploys automatically.

---

## Storage

All data saves to `localStorage` in your browser. Progress persists between sessions on the same device and browser. To sync across devices, use the same browser profile or a cloud sync extension.

---

## Deployment

Hosted on Vercel. Every push to the `main` branch triggers an automatic redeploy.

- Vercel dashboard: vercel.com/dashboard
- Custom domain: can be added in Vercel project settings

---

Heyward Management Group LLC · SEMAJ Media · Internal use only
