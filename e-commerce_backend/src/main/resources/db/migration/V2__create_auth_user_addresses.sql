CREATE TABLE "auth_user_addresses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "full_name" varchar(80) NOT NULL,
  "phone" varchar(20) NOT NULL,
  "address_line" text NOT NULL,
  "city" varchar(50) NOT NULL,
  "state" varchar(50) NOT NULL,
  "postal_code" varchar(20) NOT NULL,
  "country" varchar(50) NOT NULL,
  "created_at" timestamp DEFAULT (now())
);