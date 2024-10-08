import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import closeSound from '../assets/sounds/clik_3_button.mp3';
import sendSound from '../assets/sounds/envoi_email.mp3';
import hoverSound from '../assets/sounds/hover_4_button.mp3';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitError, setSubmitError] = useState(null); // Définir l'état pour les erreurs d'envoi

  const closeSoundEffect = useRef(new Audio(closeSound));
  const sendSoundEffect = useRef(new Audio(sendSound));
  const hoverSoundEffect = useRef(new Audio(hoverSound));

  sendSoundEffect.current.volume = 0.4;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null); // Réinitialiser l'erreur d'envoi
  };

  const validateForm = () => {
    let tempErrors = {};
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
      tempErrors.name = "Le nom doit contenir entre 2 et 30 caractères alphabétiques";
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      tempErrors.email = "Veuillez entrer une adresse email valide";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      tempErrors.message = "Le message doit contenir au moins 10 caractères";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const sendEmail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }
      setIsSubmitted(true);
      setSubmitError(null);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitError("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      closeSoundEffect.current.play();
      await sendEmail();
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose('submit');
      }, closeSoundEffect.current.duration * 1000 + 1500);
    }
  };

  const handleClose = (closeType = 'manual') => {
    if (closeType === 'submit') {
      sendSoundEffect.current.play();
    } else {
      closeSoundEffect.current.play();
    }
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      resetForm();
    }, 300);
  };

  const playHoverSound = () => {
    hoverSoundEffect.current.currentTime = 0;
    hoverSoundEffect.current.play();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`contact-form-overlay ${isClosing ? 'closing' : ''}`}>
      <div className="contact-form-container">
        <button 
          className="close-button" 
          onClick={() => handleClose('manual')}
          onMouseEnter={playHoverSound}
        >
          &times;
        </button>
        <h3>Drunge</h3>
        <h2>Contactez-nous</h2>
        {isSubmitted ? (
          <div className="success-message">
            <p>Votre message a été envoyé avec succès !</p>
            <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Écrivez votre message"
              />
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <button 
              type="submit" 
              className="submit-button"
              onMouseEnter={playHoverSound}
            >
              Envoyer
            </button>
          </form>
        )}
        {submitError && <div className="error-message">{submitError}</div>} {/* Afficher les erreurs d'envoi */}
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactForm;
