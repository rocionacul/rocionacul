-- Policy adicional para permitir leer la lista de invitados
-- Ejecutar esto en el SQL Editor de Supabase

CREATE POLICY "Allow public reads for guest list" ON guest_list
  FOR SELECT
  TO anon
  USING (true);
