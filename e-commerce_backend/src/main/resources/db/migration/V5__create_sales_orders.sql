CREATE TABLE "sales_orders" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "shipping_address_id" uuid,
    "total" numeric(10,2) NOT NULL,
    "status" varchar(30),
    "created_at" timestamp DEFAULT (now())
);