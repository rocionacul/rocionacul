import { supabase } from '../lib/supabase';
import type { RSVPFormData, RSVPResponse } from '../types/rsvp';

export async function submitRSVP(data: RSVPFormData): Promise<RSVPResponse> {
  try {
    const { error } = await supabase
      .from('guest_list')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          number_of_guests: data.number_of_guests,
          attending: data.attending ?? true,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: 'Error al enviar la confirmación. Intentá de nuevo.',
      };
    }

    return {
      success: true,
      message: data.attending === false 
        ? '¡Gracias por avisar! Te vamos a extrañar 😢' 
        : '¡Confirmación enviada! Nos vemos en la fiesta! 🎉',
    };
  } catch (err) {
    console.error('Error submitting RSVP:', err);
    return {
      success: false,
      error: 'Ocurrió un error inesperado. Intentá de nuevo.',
    };
  }
}
