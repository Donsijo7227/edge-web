// components/events/EventGrid.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { client, urlFor } from '@/sanity/lib/client';
import { Clock, MapPin, Leaf } from 'lucide-react';

interface Event {
  _id: string;
  title?: string;
  name?: string; // Legacy field
  image?: any;
  date?: string;
  endDate?: string;
  location?: string;
  address?: string;
  description?: string;
  details?: any; // For block content
  venue?: any;
  eventType?: string;
}

const EventGrid: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await client.fetch(`
          *[_type == "event"] | order(date asc) {
            _id,
            title,
            name,
            image,
            date,
            endDate,
            location,
            address,
            description,
            details,
            venue,
            eventType
          }
        `);
        
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  const formatEventDate = (startDate?: string, endDate?: string) => {
    if (!startDate) return 'Date TBD';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    };
    
    const month = start.toLocaleString('en-US', { month: 'long' });
    const day = start.getDate();
    const year = start.getFullYear();
    
    if (end) {
      return `${month} ${day}, ${year}, ${formatTime(start)} – ${formatTime(end)}`;
    } else {
      return `${month} ${day}, ${year}, ${formatTime(start)}`;
    }
  };

  if (loading) {
    return (
      <div className="w-full px-5 py-8">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-5 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full px-5 py-8">
        <p>No upcoming events at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 content-block pt-mobile-block md:pt-desktop-block">
      <div className="space-y-8">
        {events.map((event) => {
          // Handle both title and name
          const eventTitle = event.title || event.name || 'Untitled Event';
          
          // Get location from either direct fields or venue reference
          let locationName = 'Location TBD';
          let locationAddress = '';
          
          if (event.location) {
            locationName = event.location;
          } else if (event.venue && typeof event.venue === 'object' && event.venue.name) {
            locationName = event.venue.name;
          }
          
          if (event.address) {
            locationAddress = event.address;
          } else if (event.venue && typeof event.venue === 'object' && event.venue.address) {
            locationAddress = event.venue.address;
          }
          
          // Get description from either field
          const description = event.description || 
            (event.details ? 'See event details for more information' : 'No description available');
          
          return (
            <div 
              key={event._id}
              className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden shadow"
            >
              {/* Event Image */}
              <div className="md:w-2/5 h-64 md:h-auto bg-gray-200">
                {event.image ? (
                  <img
                    src={urlFor(event.image).width(600).height(400).url()}
                    alt={eventTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                        const placeholder = document.createElement('div');
                        placeholder.textContent = 'No image available';
                        placeholder.className = 'text-gray-500';
                        e.currentTarget.parentElement.appendChild(placeholder);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Event Details */}
              <div className="md:w-3/5 p-6">
                <h2 className="text-2xl font-bold mb-4">{eventTitle}</h2>
                
                {/* Date and Time */}
                <div className="flex items-start mb-3">
                  <Clock className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-700" />
                  <span>{formatEventDate(event.date, event.endDate)}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-start mb-3">
                  <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-700" />
                  <div>
                    <div>{locationName}</div>
                    {locationAddress && <div className="text-gray-600">{locationAddress}</div>}
                  </div>
                </div>
                
                {/* Description */}
                <div className="flex items-start">
                  <Leaf className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-700" />
                  <p className="text-gray-700">{description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventGrid;