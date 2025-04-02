'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("qS2YT04v2162dGLTr");

// Extend the Window interface for reCAPTCHA v2
declare global {
  interface Window {
    grecaptcha: {
      render: (container: string | HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => void;
      reset: () => void;
      getResponse: () => string;
    };
  }
}

const ContactSection = ({ hideHeading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (!recaptchaRef.current) return;

      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('reCAPTCHA script loaded');
        // Wait for grecaptcha to be available
        const waitForRecaptcha = () => {
          if (window.grecaptcha && window.grecaptcha.render) {
            recaptchaRef.current!.innerHTML = '';
            window.grecaptcha.render(recaptchaRef.current!, {
              sitekey: '6LcdAQErAAAAADT35OtVCvTtV_e4aCuORgOJICM1',
              callback: (token: string) => {
                setRecaptchaToken(token);
                console.log('reCAPTCHA token generated:', token);
              },
            });
            setIsRecaptchaLoaded(true);
            console.log('reCAPTCHA rendered successfully');
          } else {
            console.log('Waiting for grecaptcha...');
            setTimeout(waitForRecaptcha, 100); // Retry every 100ms
          }
        };
        waitForRecaptcha();
      };

      script.onerror = () => {
        console.error('reCAPTCHA script failed to load');
        setStatus('Failed to load reCAPTCHA');
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        setIsRecaptchaLoaded(false);
      };
    };

    loadRecaptcha();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (status === 'Message sent successfully!' || status === 'Failed to send message. Please try again.') {
      timeoutId = setTimeout(() => setStatus(''), 6000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    if (!formData.name || !formData.surname || !formData.email || !formData.message) {
      setStatus('Please fill in all fields');
      return;
    }

    if (!recaptchaToken) {
      setStatus('Please complete the reCAPTCHA challenge');
      return;
    }

    const templateParams = {
      from_name: `${formData.name} ${formData.surname}`,
      from_email: formData.email,
      message: formData.message,
      'g-recaptcha-response': recaptchaToken,
    };

    emailjs
      .send("service_k49108k", "template_epv6wj9", templateParams, "qS2YT04v2162dGLTr")
      .then((response: { status: number; text: string }) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', surname: '', email: '', message: '' });
        setRecaptchaToken(null);
        if (window.grecaptcha) window.grecaptcha.reset();
      })
      .catch((error: unknown) => {
        console.error('FAILED...', error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <>
      {!hideHeading && (
        <h2 className="heading-2 mb-6 text-[#123800]">Contact Us</h2>
      )}
      
      <form onSubmit={handleSubmit} className="border border-[#123800] rounded-lg p-4 space-y-3">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-[#123800]">Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-[#123800] rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="surname" className="block mb-1 font-medium text-[#123800]">Surname</label>
          <input 
            type="text" 
            id="surname" 
            value={formData.surname}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-[#123800] rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-[#123800]">Email</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-[#123800] rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1 font-medium text-[#123800]">Message</label>
          <textarea 
            id="message" 
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-[#123800] rounded-md"
          ></textarea>
        </div>

        <div ref={recaptchaRef} className="my-2"></div>

        {status && (
          <div className={`
            p-2 rounded-md text-center text-sm
            ${status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          `}>
            {status}
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full py-2 bg-[#123800] text-white font-bold rounded-md hover:bg-opacity-90 transition-colors"
          disabled={!isRecaptchaLoaded}
        >
          Submit
        </button>

        <input type="hidden" name="g-recaptcha-response" value={recaptchaToken || ''} />
      </form>
    </>
  );
};

export default ContactSection;