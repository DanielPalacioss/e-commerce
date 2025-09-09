DO $$
DECLARE
new_user_id uuid;
BEGIN
    -- Insertar admin
INSERT INTO auth_users (name, email, password, role)
VALUES ('admin','admin@example.com', 'admin', 'admin')
    ON CONFLICT (email) DO NOTHING;

-- Insertar cliente y capturar su id
INSERT INTO auth_users (name, email, password, role)
VALUES ('client','client@example.com', 'client123', 'client')
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO new_user_id;

-- Insertar dirección asociada al cliente
IF new_user_id IS NOT NULL THEN
        INSERT INTO auth_user_addresses (user_id, full_name, phone, address_line, city, state, postal_code, country)
        VALUES (new_user_id, 'Daniel Palacios', '3001234567', 'Calle Falsa 123', 'Bogotá', 'Cundinamarca', '110111', 'Colombia');
END IF;
END $$;
