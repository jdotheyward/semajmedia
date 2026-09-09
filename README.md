# SEMAJ Media Tools

Internal tools for Heyward Management Group / SEMAJ Media.

Built with Create React App. Deployed on Vercel. Saves data to localStorage in the browser.

Styling lives in `src/styles.css` as CSS custom properties on the SEMAJ Media palette
(navy `#213E68`, coral `#D4562F`, amber `#A8915E`) with Bebas Neue, Source Serif 4,
and IBM Plex Mono loaded in `public/index.html`.

---

## Live Tools

The SocialBee guide moved out of this app into a standalone page. It lives at
`public/socialbee.html` and deploys to `/socialbee.html` — CRA copies `public/`
to the build root untouched, so it needs no build step and no routing.

| Tool | Description |
|------|-------------|
| Flipside Work Plan | Phase-by-phase Substack launch tracker with milestone dashboard |

---

## Adding New Tools

1. Create a new file in `src/tools/`
2. Build it as a React component with `export default function YourTool()`
3. Import it in `src/App.jsx`
4. Add it to the `tools` array in App.jsx

```javascript
// In App.jsx
import YourTool from "./tools/YourTool";

const tools = [
  // existing tools...
  {
    id: "yourtool",
    label: "Your Tool Name",
    brand: "SEMAJ Media",
    component: YourTool,
  },
];
```

Push to GitHub → Vercel redeploys automatically.

---

## Storage

All data saves to `localStorage` in the browser. Progress persists between sessions
on the same device and browser. There is no server and no account, so progress does
not follow you to a different device or a different browser.

If the browser blocks storage (Safari private browsing, or third-party storage
restrictions), the work plan header says so instead of failing silently.

---

## Deployment

Hosted on Vercel. Every push to the `main` branch triggers an automatic redeploy.

- Vercel dashboard: vercel.com/dashboard
- Custom domain: can be added in Vercel project settings

---

Heyward Management Group LLC · SEMAJ Media · Internal use only
