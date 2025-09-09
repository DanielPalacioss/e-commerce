CREATE TABLE "sales_transactions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "invoice_id" uuid UNIQUE NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "payment_method" varchar(50),
    "status" varchar(30),
    "transaction_date" timestamp DEFAULT (now())
);