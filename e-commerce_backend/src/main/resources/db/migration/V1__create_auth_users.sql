CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "auth_users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(50) NOT NULL,
  "username" varchar(20) UNIQUE NOT NULL,
  "email" varchar(80) UNIQUE NOT NULL,
  "password" text NOT NULL,
  "role" varchar(10) NOT NULL,
  "profile_picture_url" text,
  "profile_picture_public_id" text,
  "created_at" timestamp DEFAULT (now())
);