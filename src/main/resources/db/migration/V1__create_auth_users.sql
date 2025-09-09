CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "auth_users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(20) NOT NULL,
  "email" varchar(80) UNIQUE NOT NULL,
  "password" text NOT NULL,
  "role" varchar(30) NOT NULL,
  "created_at" timestamp DEFAULT (now())
);