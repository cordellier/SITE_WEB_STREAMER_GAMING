import { useState, useEffect, useRef } from 'react';
import closeSound from '../assets/sounds/clik_3_button.mp3';
import sendSound from '../assets/sounds/envoi_email.mp3';
import hoverSound from '../assets/sounds/hover_4_button.mp3';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeSoundEffect = useRef(new Audio(closeSound));
  const sendSoundEffect = useRef(new Audio(sendSound));
  const hoverSoundEffect = useRef(new Audio(hoverSound));

  // Réduire le volume du son d'envoi d'un tiers
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
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      tempErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'email est invalide";
    }
    if (!formData.message.trim()) tempErrors.message = "Le message est requis";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulaire soumis:', formData);
      closeSoundEffect.current.play();
      setIsSubmitted(true);
      setTimeout(() => handleClose(), closeSoundEffect.current.duration * 2000 + 2000);
    }
  };

  const handleClose = () => {
    closeSoundEffect.current.play();
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
          onClick={handleClose}
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
      </div>
    </div>
  );
};

export default ContactForm;