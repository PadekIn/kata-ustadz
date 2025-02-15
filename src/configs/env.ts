import dotenv from "dotenv";
dotenv.config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  FE_URL: process.env.FE_URL || "http://localhost:3000",
  OUR_EMAIL: process.env.OUR_EMAIL || "company@mail.com",
  OUR_EMAIL_PASSWORD: process.env.OUR_EMAIL_PASSWORD || "password",
  HASH_SALT: process.env.HASH_SALT || "bismillah",
  JWT_SECRET: process.env.JWT_SECRET || "bismillahrahasia",
};

export default env;