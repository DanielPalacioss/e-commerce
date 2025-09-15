CREATE TABLE "inventory_products" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar(25) NOT NULL,
    "description" text,
    "price" numeric(10,2) NOT NULL,
    "image_url" text,
    "image_public_id" text,
    "category" varchar(20) NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp DEFAULT (now())
);