"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAllProjects, deleteProject, Project } from "@/lib/firestore";
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleting(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-zinc-400">Manage your portfolio projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-[#e59500] text-black font-semibold rounded-lg hover:bg-[#cc8400] transition-colors"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-[#e59500] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400 mb-4">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e59500] text-black font-semibold rounded-lg hover:bg-[#cc8400] transition-colors"
          >
            <Plus size={20} />
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Order
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-zinc-500">{project.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: project.color }}
                      />
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{project.category}</td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-zinc-800 px-2 py-1 rounded">
                      {project.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {project.published ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                        <Eye size={12} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                        <EyeOff size={12} />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {project.published && (
                        <a
                          href={`/work/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="View live"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id!, project.title)}
                        disabled={deleting === project.id}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === project.id ? (
                          <div className="w-[18px] h-[18px] border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
