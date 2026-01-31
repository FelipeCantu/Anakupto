// Run with: npx tsx scripts/seed-projects.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArlvQKki0M0t0auqOiZcWj_AEjB0UH7o4",
  authDomain: "anakupto-cb3f5.firebaseapp.com",
  projectId: "anakupto-cb3f5",
  storageBucket: "anakupto-cb3f5.firebasestorage.app",
  messagingSenderId: "906949295862",
  appId: "1:906949295862:web:641389bcc47097d5e9b6d7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projects = [
  {
    slug: "neo-tokyo-net",
    title: "Neo-Tokyo Net",
    category: "Concept • Immersive Cityscape",
    type: "Web Experience",
    image: "/projects/cyberpunk.png",
    description: "A fully explorable 3D city interface for a decentralized network.",
    color: "#00f0ff",
    longDescription: "Neo-Tokyo Net is an immersive 3D web experience that transports users into a cyberpunk cityscape. Built with cutting-edge WebGL technology, it features real-time lighting, dynamic weather systems, and interactive elements that respond to user input. The project showcases the possibilities of browser-based 3D environments for storytelling and brand experiences.",
    features: [
      "Fully explorable 3D environment",
      "Real-time dynamic lighting",
      "Interactive hotspots with animations",
      "Ambient soundscape integration",
      "Mobile-optimized performance"
    ],
    technologies: ["Three.js", "React Three Fiber", "GSAP", "WebGL", "Blender"],
    gallery: [],
    order: 1,
    published: true,
  },
  {
    slug: "luminous-forms",
    title: "Luminous Forms",
    category: "Concept • Virtual Gallery",
    type: "Web Experience",
    image: "/projects/gallery.png",
    description: "Digital art exhibition space featuring procedurally generated sculptures.",
    color: "#ff0055",
    longDescription: "Luminous Forms reimagines the art gallery experience for the digital age. This virtual exhibition space features procedurally generated 3D sculptures that evolve based on viewer interaction. Each visit creates a unique artistic experience, blending generative art with immersive web technology.",
    features: [
      "Procedurally generated artworks",
      "First-person gallery navigation",
      "Dynamic lighting based on artwork",
      "Social viewing capabilities",
      "NFT integration ready"
    ],
    technologies: ["Three.js", "React", "Shader programming", "WebGL 2.0", "Node.js"],
    gallery: [],
    order: 2,
    published: true,
  },
  {
    slug: "aura-x-configurator",
    title: "Aura X Configurator",
    category: "Concept • E-Commerce",
    type: "Product Configurator",
    image: "/projects/ecommerce.png",
    description: "Real-time 3D product customization with physics-based materials.",
    color: "#ffffff",
    longDescription: "Aura X Configurator demonstrates the future of e-commerce with real-time 3D product customization. Users can modify colors, materials, and components while seeing photorealistic results instantly. Physics-based rendering ensures accurate material representation, helping customers make confident purchasing decisions.",
    features: [
      "Real-time material customization",
      "Physics-based rendering (PBR)",
      "360° product rotation",
      "AR preview capability",
      "One-click checkout integration"
    ],
    technologies: ["Three.js", "React Three Fiber", "HDRI lighting", "glTF", "Shopify API"],
    gallery: [],
    order: 3,
    published: true,
  },
  {
    slug: "gaia-visualizer",
    title: "Gaia Visualizer",
    category: "Concept • Data Visualization",
    type: "Interactive Dashboard",
    image: "/projects/globe.png",
    description: "Global climate data visualized in an interactive WebGL globe.",
    color: "#00ff88",
    longDescription: "Gaia Visualizer transforms complex climate data into an intuitive, interactive experience. Users can explore temperature changes, weather patterns, and environmental metrics across the globe through an elegant 3D interface. The project demonstrates how data visualization can be both informative and emotionally engaging.",
    features: [
      "Interactive 3D globe navigation",
      "Real-time data streaming",
      "Time-lapse animations",
      "Customizable data layers",
      "Export and sharing tools"
    ],
    technologies: ["Three.js", "D3.js", "WebGL", "REST APIs", "Canvas"],
    gallery: [],
    order: 4,
    published: true,
  },
  {
    slug: "archviz-studio",
    title: "Archviz Studio",
    category: "Concept • Real Estate",
    type: "Virtual Tour",
    image: "/projects/archviz.png",
    description: "Photorealistic architectural walkthroughs directly in the browser.",
    color: "#fbbf24",
    longDescription: "Archviz Studio brings architectural visualization to the web browser without plugins or downloads. This concept showcases photorealistic interior and exterior walkthroughs with dynamic time-of-day lighting, material switching, and measurement tools. Perfect for real estate, architecture firms, and interior designers.",
    features: [
      "Photorealistic rendering",
      "Dynamic time-of-day lighting",
      "Material and furniture swapping",
      "Measurement and annotation tools",
      "VR headset support"
    ],
    technologies: ["Three.js", "React Three Fiber", "Baked lighting", "HDR", "WebXR"],
    gallery: [],
    order: 5,
    published: true,
  },
  {
    slug: "luxe-motorsports",
    title: "Luxe Motorsports",
    category: "Concept • Automotive",
    type: "Car Configurator",
    image: "/projects/automotive.png",
    description: "High-fidelity car configurator with cinematic studio lighting.",
    color: "#94a3b8",
    longDescription: "Luxe Motorsports showcases automotive visualization at its finest. This high-fidelity car configurator features cinematic studio lighting, accurate paint and material rendering, and smooth camera transitions. Users can explore every detail of the vehicle while customizing colors, wheels, and interior options.",
    features: [
      "Cinematic camera movements",
      "Accurate automotive paint simulation",
      "Interior exploration mode",
      "Day/night environment switching",
      "High-resolution texture streaming"
    ],
    technologies: ["Three.js", "React Three Fiber", "PBR Materials", "Environment maps", "Post-processing"],
    gallery: [],
    order: 6,
    published: true,
  },
];

async function seed() {
  console.log("Starting seed...");

  const projectsRef = collection(db, "projects");

  for (const project of projects) {
    // Check if project already exists
    const q = query(projectsRef, where("slug", "==", project.slug));
    const existing = await getDocs(q);

    if (!existing.empty) {
      console.log(`Skipping "${project.title}" - already exists`);
      continue;
    }

    await addDoc(projectsRef, project);
    console.log(`Created: ${project.title}`);
  }

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
