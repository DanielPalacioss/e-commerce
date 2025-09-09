CREATE TABLE "sales_invoices" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" uuid UNIQUE NOT NULL,
  "total" numeric(10,2) NOT NULL,
  "issued_at" timestamp DEFAULT (now())
);