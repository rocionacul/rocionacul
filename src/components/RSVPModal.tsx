import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitRSVP } from '../utils/rsvp';
import type { RSVPFormData } from '../types/rsvp';
import './RSVPModal.css';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>();

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const response = await submitRSVP(data);

    if (response.success) {
      setSubmitStatus({
        type: 'success',
        message: response.message || 'RSVP submitted successfully!',
      });
      reset();
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: null, message: '' });
      }, 2000);
    } else {
      setSubmitStatus({
        type: 'error',
        message: response.error || 'Something went wrong. Please try again.',
      });
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setSubmitStatus({ type: null, message: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="modal-close" disabled={isSubmitting} aria-label="Cerrar modal">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="modal-title text-gradient-purple">Confirmacion</h2>
        <p className="modal-subtitle">Gracias por venir!</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre y Apellido*</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className="form-input"
              placeholder="Nombre y Apellido"
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalido',
                },
              })}
              className="form-input"
              placeholder="tu.email@ejemplo.com"
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Telefono</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="form-input"
              placeholder="11 1234-5678"
            />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="number_of_guests" className="form-label">Cantidad de Invitados *</label>
            <input
              id="number_of_guests"
              type="number"
              min="1"
              max="10"
              {...register('number_of_guests', {
                required: 'La cantidad de invitados es requerida',
                min: { value: 1, message: 'Minimo 1 invitado' },
                max: { value: 10, message: 'Maximo 10 invitados' },
                valueAsNumber: true,
              })}
              className="form-input"
              placeholder="0"
            />
            {errors.number_of_guests && <p className="form-error">{errors.number_of_guests.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="comments" className="form-label">Dejar un comentario</label>
            <textarea
              id="comments"
              {...register('comments')}
              className="form-textarea"
              placeholder="Dejanos un mensaje (opcional)"
              rows={4}
            />
            {errors.comments && <p className="form-error">{errors.comments.message}</p>}
          </div>

          {submitStatus.type && (
            <div className={`alert alert-${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              'Confirmar Asistencia'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
