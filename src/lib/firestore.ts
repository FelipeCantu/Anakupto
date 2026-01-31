import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  image: string;
  description: string;
  color: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  gallery: string[];
  order: number;
  published: boolean;
}

const PROJECTS_COLLECTION = "projects";

// Public: Get all published projects
export async function getProjects(limitCount?: number): Promise<Project[]> {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const q = limitCount
    ? query(
        projectsRef,
        where("published", "==", true),
        orderBy("order", "asc"),
        limit(limitCount)
      )
    : query(
        projectsRef,
        where("published", "==", true),
        orderBy("order", "asc")
      );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

// Public: Get single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const q = query(
    projectsRef,
    where("slug", "==", slug),
    where("published", "==", true),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Project;
}

// Admin: Get all projects (including unpublished)
export async function getAllProjects(): Promise<Project[]> {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const q = query(projectsRef, orderBy("order", "asc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

// Admin: Get project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Project;
}

// Admin: Create project
export async function createProject(
  data: Omit<Project, "id">
): Promise<string> {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const docRef = await addDoc(projectsRef, data);
  return docRef.id;
}

// Admin: Update project
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id">>
): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, data);
}

// Admin: Delete project
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Helper: Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
