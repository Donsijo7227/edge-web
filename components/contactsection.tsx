'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("qS2YT04v2162dGLTr");

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // Effect to clear status message after 6 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (status === 'Message sent successfully!' || status === 'Failed to send message. Please try again.') {
      timeoutId = setTimeout(() => {
        setStatus('');
      }, 6000);
    }

    // Cleanup function to clear timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [status]);

  // Handle input changes with explicit type
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle form submission with explicit type
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    // Validate form data
    if (!formData.name || !formData.surname || !formData.email || !formData.message) {
      setStatus('Please fill in all fields');
      return;
    }

    // Create template parameters
    const templateParams = {
      from_name: `${formData.name} ${formData.surname}`,
      from_email: formData.email,
      message: formData.message
    };

    emailjs
    .send(
      "service_k49108k", 
      "template_epv6wj9", 
      templateParams,
      "qS2YT04v2162dGLTr" 
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus('Message sent successfully!');
      // Reset form
      setFormData({
        name: '',
        surname: '',
        email: '',
        message: ''
      });
    }, (error) => {
      console.error('FAILED...', error);
      setStatus('Failed to send message. Please try again.');
    });
  };

  return (
    <section className="py-10 px-4 content-block">
      <div className="container mx-auto">
        <h2 className="heading-2 mb-6 text-[#123800] text-left">Contact Us</h2>
        
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="w-full md:w-[466px] md:mr-0">
            <form 
              onSubmit={handleSubmit} 
              className="border border-[#123800] rounded-lg p-4 space-y-3"
            >
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

              {status && (
                <div className={`
                  p-2 rounded-md text-center text-sm
                  ${status.includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'}
                `}>
                  {status}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full py-2 bg-[#123800] text-white font-bold rounded-md hover:bg-opacity-90 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
          
          <div className="hidden md:block md:flex-1">
            <div className="relative w-full" style={{ height: '640px' }}>
              <Image 
                src="/images/contact-plants.jpg" 
                alt="Succulent plants collection" 
                fill
                className="rounded-lg object-cover"
                style={{ objectPosition: 'center' }}
                sizes="(max-width: 1200px) 60vw, 700px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;