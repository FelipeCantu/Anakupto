"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById, Project } from "@/lib/firestore";
import { ArrowLeft } from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-zinc-400">Update project details.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-[#e59500] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : project ? (
        <ProjectForm project={project} isEditing />
      ) : (
        <div className="text-center py-24">
          <p className="text-zinc-400 mb-4">Project not found.</p>
          <Link
            href="/admin/projects"
            className="text-[#e59500] hover:underline"
          >
            Back to Projects
          </Link>
        </div>
      )}
    </AdminLayout>
  );
}
