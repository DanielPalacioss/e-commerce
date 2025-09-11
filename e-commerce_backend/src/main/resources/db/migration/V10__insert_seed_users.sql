DO $$
DECLARE
new_user_id uuid;
BEGIN
    -- Insertar admin
INSERT INTO auth_users (name, username, email, password, role)
VALUES ('admin', 'admin123', 'admin@example.com', '$2a$10$vJYDRDcz0THJjBpZrxXCVuZUuAfVYLCz1Ufle/VJeN487tOQXkJJK', 'ADMIN')
    ON CONFLICT (email) DO NOTHING;

-- Insertar cliente y capturar su id
INSERT INTO auth_users (name, username, email, password, role)
VALUES ('client', 'client123','client@example.com', '$2a$10$QBvYccuyiVMqZIfCgHO3FOT8aoSlP0Osh1THonNT4c0kKIF1OyhFq', 'CLIENT')
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO new_user_id;

-- Insertar dirección asociada al cliente
IF new_user_id IS NOT NULL THEN
        INSERT INTO auth_user_addresses (user_id, full_name, phone, address_line, city, state, postal_code, country)
        VALUES (new_user_id, 'Daniel Palacios', '3001234567', 'Calle Falsa 123', 'Bogotá', 'Cundinamarca', '110111', 'Colombia');
END IF;
END $$;
