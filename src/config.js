import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "sebastian";
export const DB_PASSWORD = process.env.DB_PASSWORD || "3203245980Rodri";
export const DB_HOST =
  process.env.DB_HOST || "miranchito.mysql.database.azure.com";
export const DB_DATABASE = process.env.DB_DATABASE || "miranchito";
