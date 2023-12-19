export const DASHBOARD_FETCH_INTERVAL = 10 //Amount of seconds between dashboard fetch requests
export const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API
export const cookiesPages = ['/', '/dashboard', '/features'];
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const REFERRER_API_KEY = process.env.NEXT_PUBLIC_REFERRER_API_KEY;
export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TOP_LEVEL_ROUTES = ['dashboard', 'features', 'login', 'register', 'settings', '/user', '/profile', '/premium']