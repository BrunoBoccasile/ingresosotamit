import { config } from "dotenv";

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true });
} else {
  config({ path: '.env.production', override: true });

}

console.log("NODE_ENV:", process.env.NODE_ENV);
export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;