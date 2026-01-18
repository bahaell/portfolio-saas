"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, Loader2 } from "lucide-react";
import { AddProjectModal } from "@/components/modals/add-project-modal";
import { ProjectDetailsModal } from "@/components/modals/project-details-modal";
import { ImageCarousel } from "@/components/project/image-carousel";
import apiService, { ApiUser, ApiProject, ApiPortfolio } from "@/lib/api";

export default function ProjectsPage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await apiService.getMe();
        setUser(userData);
        if (userData) {
          const portfolios = await apiService.getPortfolios(userData._id);
          // Fetch projects for all portfolios to aggregage "My Projects" view
          const allProjectsPromises = portfolios.map((p) =>
            apiService.getProjects(p._id)
          );
          const projectsArrays = await Promise.all(allProjectsPromises);
          const allProjects = projectsArrays.flat();
          setProjects(allProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProject = (data: {
    title: string;
    description: string;
    link: string;
    image: string;
  }) => {
    console.log("New project:", data);
    // TODO: Implement create project via API (requires selecting a portfolio)
    // For now, this is just UI integration as per Step 2.3
  };

  const handleViewDetails = (project: ApiProject) => {
    // Adapter for modal which might expect different fields?
    // The modal expects mock structure. We pass ApiProject.
    // Ensure compatibility or mapped.
    setSelectedProject({
      ...project,
      id: project._id,
      link: project.demoUrl || project.githubUrl, // Map link
      image: project.images?.[0], // Map first image if needed
      featured: false, // Not in DB yet
    });
    setDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Showcase your best work and projects
          </p>
        </div>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No projects found. Add one to your portfolios.
          </div>
        ) : (
          projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden border-border/50 hover:shadow-premium transition-all hover-lift group"
            >
              {project.images && project.images.length > 0 ? (
                <div className="p-4">
                  <ImageCarousel
                    images={project.images}
                    title={project.title}
                  />
                </div>
              ) : (
                <div className="relative h-40 bg-muted overflow-hidden">
                  {/* Placeholder if no images */}
                  <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                </div>
              )}

              <div
                className={`${project.images && project.images.length > 0 ? "pt-0" : ""
                  } p-4`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {/* Featured flag not in DB yet */}
                  {/* {project.featured && <Star className="w-4 h-4 fill-accent text-accent" />} */}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <Button
                  onClick={() => handleViewDetails(project)}
                  variant="outline"
                  className="w-full text-sm bg-transparent"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <AddProjectModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAdd={handleAddProject}
      />
      <ProjectDetailsModal
        project={selectedProject}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  );
}
