-- Agregar columna para tracking de asistencia
-- Ejecutar en el SQL Editor de Supabase

ALTER TABLE guest_list 
ADD COLUMN attending BOOLEAN DEFAULT true;

-- Crear índice para queries más rápidas
CREATE INDEX idx_guest_list_attending ON guest_list(attending);
