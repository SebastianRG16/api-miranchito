import { createPool } from "mysql2/promise";
import { createRequire } from "module";
import "./config.js";
import {
  DB_PORT,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
} from "./config.js";
const require = createRequire(import.meta.url);
const fs = require("fs");

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
  ssl: { ca: fs.readFileSync("./DigiCertGlobalRootCa.crt.pem") },
});
