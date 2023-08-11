//Assigns value to environment variable prod or dev.
export const domain = (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "http://localhost:3000/" : "http://tinyclicks.co/");