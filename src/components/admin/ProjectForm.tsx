"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Project, generateSlug, createProject, updateProject } from "@/lib/firestore";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import Image from "next/image";

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

const emptyProject: Omit<Project, "id"> = {
  slug: "",
  title: "",
  category: "",
  type: "",
  image: "",
  description: "",
  color: "#ffffff",
  longDescription: "",
  features: [],
  technologies: [],
  gallery: [],
  order: 0,
  published: false,
};

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Project, "id">>(
    project ? { ...project } : emptyProject
  );
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  useEffect(() => {
    if (!isEditing && formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing && project?.id) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
      setNewTech("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const addGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryUrl.trim()],
      }));
      setNewGalleryUrl("");
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">
            Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              required
            />
            <p className="text-xs text-zinc-500 mt-1">
              URL: /work/{formData.slug || "..."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g., Concept • Immersive"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                placeholder="e.g., Web Experience"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Short Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500] resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Long Description
            </label>
            <textarea
              value={formData.longDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  longDescription: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Accent Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border border-zinc-800"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    order: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Media & Arrays */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">
            Media & Details
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Main Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="/projects/example.png"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              required
            />
            {formData.image && (
              <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="Add a feature..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-zinc-900 rounded-lg"
                >
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                placeholder="Add a technology..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full"
                >
                  <span className="text-sm">{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-medium mb-2">Gallery</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryImage())}
                placeholder="Add image URL..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#e59500]"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {formData.gallery.map((url, index) => (
                <div key={index} className="relative aspect-video group">
                  <Image
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="w-5 h-5 rounded bg-zinc-900 border-zinc-700 text-[#e59500] focus:ring-[#e59500]"
          />
          <span className="font-medium">Published</span>
        </label>

        <div className="flex gap-4">
          {formData.slug && (
            <a
              href={`/work/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Eye size={20} />
              Preview
            </a>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#e59500] text-black font-semibold rounded-lg hover:bg-[#cc8400] transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
          </button>
        </div>
      </div>
    </form>
  );
}
