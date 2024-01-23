export const DASHBOARD_FETCH_INTERVAL = 10 //Amount of seconds between dashboard fetch requests
export const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const REFERRER_API_KEY = process.env.NEXT_PUBLIC_REFERRER_API_KEY;
export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

//AWS configuration
export const AWS_S3_PREFIX = process.env.NEXT_PUBLIC_AWS_S3_PREFIX;
export const AWS_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY;
export const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY

//Routes
export const TOP_LEVEL_ROUTES = ['dashboard', 'features', 'login', 'register', 'settings', '/user', '/profile', '/premium']
export const cookiesPages = ['/', '/dashboard', '/features'];
