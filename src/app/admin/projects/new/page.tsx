"use client";

import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
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
        <h1 className="text-3xl font-bold mb-2">New Project</h1>
        <p className="text-zinc-400">Create a new portfolio project.</p>
      </div>

      <ProjectForm />
    </AdminLayout>
  );
}
