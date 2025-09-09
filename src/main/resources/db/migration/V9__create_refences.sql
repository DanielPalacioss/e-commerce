ALTER TABLE "inventory_product_stocks"
    ADD CONSTRAINT "fk_inventory_product_stocks_product_id"
        FOREIGN KEY ("product_id") REFERENCES "inventory_products" ("id");

ALTER TABLE "sales_orders"
    ADD CONSTRAINT "fk_sales_orders_user_id"
        FOREIGN KEY ("user_id") REFERENCES "auth_users" ("id");

ALTER TABLE "auth_user_addresses"
    ADD CONSTRAINT "fk_auth_user_addresses_user_id"
        FOREIGN KEY ("user_id") REFERENCES "auth_users" ("id");

ALTER TABLE "sales_order_items"
    ADD CONSTRAINT "fk_sales_order_items_order_id"
        FOREIGN KEY ("order_id") REFERENCES "sales_orders" ("id");

ALTER TABLE "sales_order_items"
    ADD CONSTRAINT "fk_sales_order_items_product_id"
        FOREIGN KEY ("product_id") REFERENCES "inventory_products" ("id");

ALTER TABLE "sales_invoices"
    ADD CONSTRAINT "fk_sales_invoices_order_id"
        FOREIGN KEY ("order_id") REFERENCES "sales_orders" ("id");

ALTER TABLE "sales_transactions"
    ADD CONSTRAINT "fk_sales_transactions_invoice_id"
        FOREIGN KEY ("invoice_id") REFERENCES "sales_invoices" ("id");