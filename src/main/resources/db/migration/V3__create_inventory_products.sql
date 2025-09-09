CREATE TABLE "inventory_products" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar(100) NOT NULL,
    "description" text,
    "price" numeric(10,2) NOT NULL,
    "image_url" text,
    "created_at" timestamp DEFAULT (now())
);