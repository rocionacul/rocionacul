import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './GuestList.css';

interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  number_of_guests: number;
  attending: boolean;
  attended: boolean;
  created_at: string;
}

export const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from('guest_list')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGuests(data || []);
    } catch (err) {
      console.error('Error fetching guests:', err);
      setError('Error al cargar la lista de invitados');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendedToggle = async (guestId: string, currentAttended: boolean) => {
    // Solo permitir marcar como "asistió" (de false a true), no desmarcar
    if (currentAttended) {
      return; // Ya está marcado, no hacer nada
    }

    try {
      const { error } = await supabase
        .from('guest_list')
        .update({ attended: true })
        .eq('id', guestId);

      if (error) throw error;

      // Actualizar el estado local
      setGuests(prevGuests =>
        prevGuests.map(guest =>
          guest.id === guestId ? { ...guest, attended: true } : guest
        )
      );
    } catch (err) {
      console.error('Error updating attendance:', err);
      alert('Error al marcar asistencia');
    }
  };

  const attending = guests.filter(g => g.attending);
  const notAttending = guests.filter(g => !g.attending);
  const totalAttending = attending.reduce((sum, guest) => sum + guest.number_of_guests, 0);
  const totalAttended = attending.filter(g => g.attended).length;
  const totalAttendedGuests = attending.filter(g => g.attended).reduce((sum, guest) => sum + guest.number_of_guests, 0);

  if (loading) {
    return (
      <div className="guest-list-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guest-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <h1 className="text-gradient-purple">Lista de Invitados</h1>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{attending.length}</span>
            <span className="stat-label">Confirmados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{totalAttending}</span>
            <span className="stat-label">Personas</span>
          </div>
          <div className="stat-card stat-attended">
            <span className="stat-number">{totalAttended}</span>
            <span className="stat-label">Ingresaron</span>
          </div>
          <div className="stat-card stat-attended">
            <span className="stat-number">{totalAttendedGuests}</span>
            <span className="stat-label">Personas ingresadas</span>
          </div>
          <div className="stat-card stat-declined">
            <span className="stat-number">{notAttending.length}</span>
            <span className="stat-label">No van</span>
          </div>
        </div>
      </div>

      {guests.length === 0 ? (
        <div className="no-guests">
          <p>Todavía no hay confirmaciones 😢</p>
        </div>
      ) : (
        <>
          {/* Sección de invitados que asisten */}
          {attending.length > 0 && (
            <div className="guest-section">
              <h2 className="section-title attending-title">✓ Asisten ({attending.length})</h2>
              <div className="guest-table">
                <table>
                  <thead>
                <tr>
                  <th>Ingreso</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Invitados</th>
                  <th>Fecha</th>
                </tr>
                  </thead>
                  <tbody>
                    {attending.map((guest) => (
                      <tr key={guest.id} className={guest.attended ? 'attended-row' : ''}>
                        <td className="attended-toggle-cell">
                          <button
                            className={`attended-toggle ${guest.attended ? 'attended' : ''}`}
                            onClick={() => handleAttendedToggle(guest.id, guest.attended)}
                            disabled={guest.attended}
                            title={guest.attended ? 'Ya ingresó al evento' : 'Marcar como ingresado'}
                          >
                            {guest.attended ? '✓' : '○'}
                          </button>
                        </td>
                        <td className="guest-name">{guest.name}</td>
                        <td>{guest.email || '-'}</td>
                        <td>{guest.phone || '-'}</td>
                        <td className="guest-count">{guest.number_of_guests}</td>
                        <td className="guest-date">
                          {new Date(guest.created_at).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sección de invitados que no asisten */}
          {notAttending.length > 0 && (
            <div className="guest-section">
              <h2 className="section-title declined-title">✗ No asisten ({notAttending.length})</h2>
              <div className="guest-table declined-table">
                <table>
                  <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Fecha</th>
                </tr>
                  </thead>
                  <tbody>
                    {notAttending.map((guest) => (
                      <tr key={guest.id}>
                        <td className="guest-name">{guest.name}</td>
                        <td>{guest.email || '-'}</td>
                        <td>{guest.phone || '-'}</td>
                        <td className="guest-date">
                          {new Date(guest.created_at).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <div className="back-link">
        <a href="/">← Volver a la invitación</a>
      </div>
    </div>
  );
};
