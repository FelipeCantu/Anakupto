"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects, Project } from "@/lib/firestore";

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
            Explore our portfolio of concept projects showcasing cutting-edge 3D
            web experiences and immersive digital solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#e59500] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-lg">No projects found.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  description={project.description}
                  color={project.color}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
