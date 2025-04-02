// components/projects/ProjectGrid.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { client, urlFor } from '@/sanity/lib/client';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  summary: string;
  status: string;
}

const ProjectGrid: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(`
          *[_type == "project"] | order(title asc) {
            _id,
            title,
            slug,
            mainImage,
            summary,
            status
          }
        `);
        
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  const handleProjectClick = (slug: string) => {
    window.location.href = `/projects/${slug}`;
  };

  if (loading) {
    return (
      <div className="w-full px-5 py-8">
        <p>Loading projects...</p>
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

  if (projects.length === 0) {
    return (
      <div className="w-full px-5 py-8">
        <p>No projects found. Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project._id}
            className="relative cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg"
            onClick={() => handleProjectClick(project.slug.current)}
          >
            {/* Project Image */}
            <div className="relative h-80 w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: project.mainImage ? 
                    `url(${urlFor(project.mainImage).width(600).height(400).url()})` : 
                    'none',
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#123800] to-transparent opacity-90"></div>
              
              {/* Status Badge */}
              {project.status && (
                <div className="absolute top-4 right-4 bg-white text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </div>
              )}
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-sm">{project.summary || 'Click to learn more about this project'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;