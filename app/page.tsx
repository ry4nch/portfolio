'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";

interface Feature {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface Project {
  title: string;
  tools: string;
  role: string;
  impact: string;
  challenge: string;
  solution: string;
  process: string[];
  outcome: string;
  features: Feature[];
  sketch: string;
}

const project: Project = {
  title: "Setstats – Climbing Gym Data Platform",
  tools: "Cursor AI, v0.dev, Firebase",
  role: "Product Designer & Developer",
  impact: "Enabled our staff and setters to track setting data efficiently",
  challenge: "The climging gym struggled to build a google sheet that fit the needs of the setters.",
  solution: "Designed a sleek dashboard with interactive data visualization for route statistics.",
  process: [
    "Sketched out the app navigation and layout",
    "Created wireframes and UI mockups using v0.dev",
    "Developed and deployed the platform using Cursor AI and Firebase",
  ],
  outcome: "A responsive web app used by our staff and setters.",
  features: [
    { title: "Route Management", description: "First, I made sure that routes could be added, edited, and deleted. I also ensured that routes could be organized by dragging and dropping them on their respective location on the wall, and marked for reset so staff knows which routes need to be cleaned.", image: "/setstats_demo.gif", alt: "Interactive demo" },
    { title: "Data Analysis", description: "I also made sure that the data was displayed in a way that was easy to understand. I used a bar chart to display the number of routes that fall under a certain grade.", image: "/setstats_home.png", alt: "Data analysis interface" },
    { title: "Setter Statistics", description: "I made sure that the setters could see their own statistics, such as the number of routes they have set in both ropes and bouldering.", image: "/setstats_setters.png", alt: "Setter Statistics" },
    { title: "Customizable Settings", description: "I also made sure that the settings could be customized uniquely for each gym.", image: "/setstats_settings.png", alt: "Settings" }
  ],
  sketch: "/setstats_vision.jpeg"
};

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  const isGif = src.endsWith('.gif');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain select-none pointer-events-none"
            priority
            unoptimized={isGif}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
      </div>
    </Modal>
  );
};

// Add icons for each section
const SectionIcon = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <div className={`inline-block mr-4 text-${color}`}>
    {children}
  </div>
);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Set initial header height
    setHeaderHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setHeaderHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Simplified calculations
  const progress = Math.min(1, scrollY / headerHeight);
  const currentHeaderHeight = headerHeight * (1 - progress * 0.9); // Keep 10% of height at minimum
  const titleScale = Math.max(0.2, 1 - (progress * 0.9)); // More aggressive scaling
  const navOpacity = progress;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5 }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background */}
      <div 
        className="fixed top-0 w-full z-50 bg-gray-900"
        style={{ 
          height: `${currentHeaderHeight}px`,
        }}
      >
        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12">
          <div className="flex flex-col items-start w-full">
            <motion.div 
              className="transform-gpu w-full"
              style={{ 
                transform: `scale(${titleScale})`,
                transformOrigin: 'left center'
              }}
              animate={{ opacity: 1 }} 
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer hover:opacity-80 transition-opacity max-w-[600px] w-full"
              >
                <Image
                  src="/signature.png"
                  alt="Ryan Chin"
                  width={800}
                  height={160}
                  className="object-contain w-full"
                  priority
                />
              </button>
            </motion.div>
          </div>
          
          {/* Navigation Links - Always visible */}
          <motion.nav 
            className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 space-x-4 md:space-x-8 text-sm md:text-base"
          >
            <button 
              onClick={() => scrollToSection('setstats')} 
              className="text-white hover:text-[#4A9EFF] transition-colors"
            >
              SetStats
            </button>
            <button 
              onClick={() => scrollToSection('artwork')} 
              className="text-white hover:text-[#4A9EFF] transition-colors"
            >
              Digital Artwork
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-[#4A9EFF] transition-colors"
            >
              Contact
            </button>
          </motion.nav>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full bg-white">
        <div style={{ paddingTop: `${headerHeight + 48}px` }}>
          {/* Setstats Section */}
          <section id="setstats" className="w-full px-12 py-20">
            <motion.h2 
              className="text-4xl font-bold mb-8 text-black"
              {...fadeInUp}
            >
              SetStats
            </motion.h2>

            <div className="flex gap-8 mb-8">
              <motion.div 
                className="relative w-1/2 h-[400px] rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/setter_photo.jpg"
                  alt="Climbing Route Setter"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </motion.div>

              <div className="w-1/2 space-y-8">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF] mr-2">
                      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" clipRule="evenodd" />
                    </svg>
                    <strong className="text-[#4A9EFF] text-lg">Role</strong>
                  </div>
                  <p className="text-black text-lg">{project.role}</p>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF] mr-2">
                      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143z" clipRule="evenodd" />
                    </svg>
                    <strong className="text-[#4A9EFF] text-lg">Impact</strong>
                  </div>
                  <p className="text-black text-lg">{project.impact}</p>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF] mr-2">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" clipRule="evenodd" />
                    </svg>
                    <strong className="text-[#4A9EFF] text-lg">Problem</strong>
                  </div>
                  <p className="text-black text-lg">{project.challenge}</p>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF] mr-2">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <strong className="text-[#4A9EFF] text-lg">Solution</strong>
                  </div>
                  <p className="text-black text-lg">{project.solution}</p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mt-8 relative"
            >
              <div className="flex items-center relative max-w-[1400px] mx-auto">
                <button 
                  onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                  className="absolute z-10 p-2 text-black hover:text-[#4A9EFF] transition-colors bg-white bg-opacity-50 rounded-full"
                  style={{ 
                    transform: 'translate(-50%, -50%)', 
                    top: '50%',
                    left: '12px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="overflow-hidden h-[600px] max-w-3xl mx-auto rounded-xl bg-white border-[5px] border-gray-200 w-full">
                  <motion.div 
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSection * 16.67}%)`,
                      width: '600%' // 6 sections
                    }}
                  >
                    {/* Vision Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <h3 className="text-2xl font-bold text-[#4A9EFF] mb-4">Vision</h3>
                        <motion.div 
                          className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer mb-8"
                          onClick={() => setSelectedImage({ src: project.sketch, alt: "Setstats Sketch" })}
                        >
                          <Image
                            src={project.sketch}
                            alt="Setstats Sketch"
                            fill
                            className="object-contain select-none pointer-events-none"
                            priority
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                          />
                        </motion.div>
                        <motion.p className="text-black text-lg">
                          I wanted to create a platform that simplifies data entry, enhances route management, and provides 
                          a fun competitive atmosphere for our setters. I began by sketching out the app navigation and layout 
                          using v0.dev.
                        </motion.p>
                      </div>
                    </div>

                    {/* Route Management Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <div className="flex flex-col items-center">
                          {project.features.slice(0, 1).map((feature, i) => (
                            <motion.div 
                              key={i}
                              className="space-y-4 mb-4"
                            >
                              <div className="flex items-center justify-center space-x-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF]">
                                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-lg font-bold text-black text-center">{feature.title}</h4>
                              </div>
                              <div 
                                className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer w-full"
                                onClick={() => setSelectedImage({ src: feature.image, alt: feature.alt })}
                              >
                                <Image
                                  src={feature.image}
                                  alt={feature.alt}
                                  fill
                                  className="object-contain select-none pointer-events-none"
                                  unoptimized={feature.image.endsWith('.gif')}
                                  onContextMenu={(e) => e.preventDefault()}
                                  draggable={false}
                                />
                              </div>
                              <p className="text-black text-base text-center mt-4">{feature.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Data Analysis Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <div className="flex flex-col items-center">
                          {project.features.slice(1, 2).map((feature, i) => (
                            <motion.div 
                              key={i}
                              className="space-y-4 mb-4"
                            >
                              <div className="flex items-center justify-center space-x-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF]">
                                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                </svg>
                                <h4 className="text-lg font-bold text-black text-center">{feature.title}</h4>
                              </div>
                              <div 
                                className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer w-full"
                                onClick={() => setSelectedImage({ src: feature.image, alt: feature.alt })}
                              >
                                <Image
                                  src={feature.image}
                                  alt={feature.alt}
                                  fill
                                  className="object-contain select-none pointer-events-none"
                                  unoptimized={feature.image.endsWith('.gif')}
                                  onContextMenu={(e) => e.preventDefault()}
                                  draggable={false}
                                />
                              </div>
                              <p className="text-black text-base text-center mt-4">{feature.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Setter Statistics Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <div className="flex flex-col items-center">
                          {project.features.slice(2, 3).map((feature, i) => (
                            <motion.div 
                              key={i}
                              className="space-y-4 mb-4"
                            >
                              <div className="flex items-center justify-center space-x-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF]">
                                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-lg font-bold text-black text-center">{feature.title}</h4>
                              </div>
                              <div 
                                className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer w-full"
                                onClick={() => setSelectedImage({ src: feature.image, alt: feature.alt })}
                              >
                                <Image
                                  src={feature.image}
                                  alt={feature.alt}
                                  fill
                                  className="object-contain select-none pointer-events-none"
                                  unoptimized={feature.image.endsWith('.gif')}
                                  onContextMenu={(e) => e.preventDefault()}
                                  draggable={false}
                                />
                              </div>
                              <p className="text-black text-base text-center mt-4">{feature.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Settings Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <div className="flex flex-col items-center">
                          {project.features.slice(3, 4).map((feature, i) => (
                            <motion.div 
                              key={i}
                              className="space-y-4 mb-4"
                            >
                              <div className="flex items-center justify-center space-x-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#4A9EFF]">
                                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-lg font-bold text-black text-center">{feature.title}</h4>
                              </div>
                              <div 
                                className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer w-full"
                                onClick={() => setSelectedImage({ src: feature.image, alt: feature.alt })}
                              >
                                <Image
                                  src={feature.image}
                                  alt={feature.alt}
                                  fill
                                  className="object-contain select-none pointer-events-none"
                                  unoptimized={feature.image.endsWith('.gif')}
                                  onContextMenu={(e) => e.preventDefault()}
                                  draggable={false}
                                />
                              </div>
                              <p className="text-black text-base text-center mt-4">{feature.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Process Section */}
                    <div className="w-1/6 flex-shrink-0 px-4 h-full flex items-center">
                      <div className="max-w-xl mx-auto p-8">
                        <h3 className="text-2xl font-bold text-[#4A9EFF] mb-4">Process & Outcome</h3>
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-lg font-bold text-black mb-4">Development Process</h4>
                            <ul className="list-disc list-inside text-black space-y-2">
                              {project.process.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-black mb-4">Outcome</h4>
                            <p className="text-black text-lg">{project.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <button 
                  onClick={() => setCurrentSection(prev => Math.min(5, prev + 1))}
                  className="absolute z-10 p-2 text-black hover:text-[#4A9EFF] transition-colors bg-white bg-opacity-50 rounded-full"
                  style={{ 
                    transform: 'translate(50%, -50%)', 
                    top: '50%',
                    right: '12px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Section Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {['Vision', 'Route Management', 'Data Analysis', 'Setter Statistics', 'Settings', 'Process'].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSection === index ? 'bg-[#4A9EFF]' : 'bg-black bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </section>

          {/* Digital Artwork Section */}
          <section id="artwork" className="w-full px-12 py-20 bg-gray-900">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-white flex items-center"
              {...fadeInUp}
            >
              <SectionIcon color="[#4A9EFF]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                  <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                </svg>
              </SectionIcon>
              Digital Artwork
            </motion.h2>

            <div className="grid grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <motion.div 
                  className="relative h-[600px] w-full rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => setSelectedImage({ src: "/abstract.png", alt: "Abstract Art" })}
                >
                  <Image
                    src="/abstract.png"
                    alt="Abstract Art"
                    fill
                    className="object-contain select-none pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                </motion.div>
                <motion.h3 className="text-xl font-bold mt-4 text-white text-center">Abstract Art</motion.h3>
                <motion.p className="text-white mt-2 text-center">Original digital artwork</motion.p>
              </motion.div>

              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <motion.div 
                    className="relative h-[300px] w-full rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                    onClick={() => setSelectedImage({ src: "/crux_tee.png", alt: "Crux T-Shirt Design" })}
                  >
                    <Image
                      src="/crux_tee.png"
                      alt="Crux T-Shirt Design"
                      fill
                      className="object-contain select-none pointer-events-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </motion.div>
                  <motion.h3 className="text-xl font-bold mt-4 text-white text-center">Crux T-Shirt Design</motion.h3>
                  <motion.p className="text-white mt-2 text-center">Custom t-shirt design for climbing club</motion.p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <motion.div 
                    className="relative h-[300px] w-full rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                    onClick={() => setSelectedImage({ src: "/pikapp_tee.png", alt: "Pi Kappa Phi Design" })}
                  >
                    <Image
                      src="/pikapp_tee.png"
                      alt="Pi Kappa Phi Design"
                      fill
                      className="object-contain select-none pointer-events-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </motion.div>
                  <motion.h3 className="text-xl font-bold mt-4 text-white text-center">Pi Kappa Phi Design</motion.h3>
                  <motion.p className="text-white mt-2 text-center">Fraternity t-shirt design</motion.p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <motion.div 
                    className="relative h-[300px] w-full rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                    onClick={() => setSelectedImage({ src: "/radiohead_design.png", alt: "Radiohead Artwork" })}
                  >
                    <Image
                      src="/radiohead_design.png"
                      alt="Radiohead Artwork"
                      fill
                      className="object-contain select-none pointer-events-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </motion.div>
                  <motion.h3 className="text-xl font-bold mt-4 text-white text-center">Radiohead Artwork</motion.h3>
                  <motion.p className="text-white mt-2 text-center">Fan art inspired by Radiohead's music</motion.p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full px-12 py-20">
            <motion.div className="space-y-8" {...fadeInUp}>
              <h2 className="text-4xl font-bold text-black flex items-center">
                <SectionIcon color="[#4A9EFF]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" clipRule="evenodd" />
                  </svg>
                </SectionIcon>
                Contact & Links
              </h2>
              <div className="space-y-4">
                <p className="text-black">
                  <strong>LinkedIn:</strong>{' '}
                  <a href="www.linkedin.com/in/ryan-chin-709059256" className="text-[#4A9EFF] hover:text-[#2563eb] hover:underline">
                    linkedin.com/in/ryan-chin-709059256
                  </a>
                </p>
                <p className="text-black">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ry4nch@gmail.com" className="text-[#4A9EFF] hover:text-[#2563eb] hover:underline">
                    ry4nch@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src || ''}
        alt={selectedImage?.alt || ''}
      />
    </div>
  );
}
