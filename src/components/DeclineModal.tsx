import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitRSVP } from '../utils/rsvp';
import './DeclineModal.css';

interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeclineFormData {
  name: string;
  comments?: string;
}

export const DeclineModal: React.FC<DeclineModalProps> = ({ isOpen, onClose }) => {
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
  } = useForm<DeclineFormData>();

  const onSubmit = async (data: DeclineFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const response = await submitRSVP({
      name: data.name,
      number_of_guests: null,
      attending: false,
      comments: data.comments,
    });

    if (response.success) {
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Gracias por avisar!',
      });
      reset();
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: null, message: '' });
      }, 2000);
    } else {
      setSubmitStatus({
        type: 'error',
        message: response.error || 'Algo salio mal. Intenta de nuevo.',
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
      <div className="modal-content decline-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="modal-close" disabled={isSubmitting} aria-label="Cerrar modal">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="modal-title">No puedo ir 😢</h2>
        <p className="modal-subtitle">Te vamos a extrañar, pero gracias por avisar!</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="decline-name" className="form-label">Nombre y Apellido *</label>
            <input
              id="decline-name"
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className="form-input"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="decline-comments" className="form-label">Dejar un comentario</label>
            <textarea
              id="decline-comments"
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

          <button type="submit" disabled={isSubmitting} className="btn-decline-submit">
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              'Confirmar que no asistire'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
