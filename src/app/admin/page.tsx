"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAllProjects, Project } from "@/lib/firestore";
import { FolderOpen, Eye, EyeOff, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const publishedCount = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-zinc-400">Welcome to the Anakupto admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <FolderOpen className="text-[#e59500]" size={24} />
            <span className="text-3xl font-bold">{projects.length}</span>
          </div>
          <p className="text-zinc-400">Total Projects</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="text-green-500" size={24} />
            <span className="text-3xl font-bold">{publishedCount}</span>
          </div>
          <p className="text-zinc-400">Published</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <EyeOff className="text-zinc-500" size={24} />
            <span className="text-3xl font-bold">{draftCount}</span>
          </div>
          <p className="text-zinc-400">Drafts</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#e59500] text-black font-semibold rounded-lg hover:bg-[#cc8400] transition-colors"
          >
            <Plus size={20} />
            New Project
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <FolderOpen size={20} />
            Manage Projects
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#e59500] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl">
            <p className="text-zinc-400 mb-4">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className="text-[#e59500] hover:underline"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                    Category
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
                {projects.slice(0, 5).map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: project.color }}
                        />
                        <span className="font-medium">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {project.category}
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
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-[#e59500] hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
