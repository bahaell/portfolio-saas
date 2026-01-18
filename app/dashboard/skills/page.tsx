"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Award, Loader2 } from "lucide-react";
import { AddSkillModal } from "@/components/modals/add-skill-modal";
import apiService, { ApiUser, ApiSkill } from "@/lib/api";

export default function SkillsPage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await apiService.getMe();
        setUser(userData);
        if (userData) {
          const portfolios = await apiService.getPortfolios(userData._id);
          const allSkillsPromises = portfolios.map((p) =>
            apiService.getSkills(p._id)
          );
          const skillsArrays = await Promise.all(allSkillsPromises);
          const allSkills = skillsArrays.flat();
          setSkills(allSkills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSkill = (data: {
    name: string;
    category: string;
    proficiency: number;
  }) => {
    console.log("New skill:", data);
    // TODO: Implement create skill via API
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, ApiSkill[]>);

  const categories = Object.keys(groupedSkills);
  const displayCategory = selectedCategory || categories[0];
  const displaySkills = groupedSkills[displayCategory] || [];

  const getLevelLabel = (levelStr: string) => {
    // Map DB level string to label or use directly
    return levelStr;
  };

  const getLevelValue = (levelStr: string) => {
    // Map DB level to number 0-5 for progress bar
    const levels = {
      "Beginner": 1,
      "Intermediate": 2,
      "Advanced": 4,
      "Expert": 5
    };
    return levels[levelStr as keyof typeof levels] || 1;
  }

  const getLevelColor = (levelStr: string) => {
    const level = getLevelValue(levelStr);
    const colors = [
      {
        bg: "bg-muted",
        text: "text-muted-foreground",
        progress: "from-slate-400 to-slate-500",
      },
      {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        progress: "from-blue-400 to-blue-500",
      },
      {
        bg: "bg-cyan-500/10",
        text: "text-cyan-600 dark:text-cyan-400",
        progress: "from-cyan-400 to-cyan-500",
      },
      {
        bg: "bg-green-500/10",
        text: "text-green-600 dark:text-green-400",
        progress: "from-green-400 to-green-500",
      },
      {
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        progress: "from-purple-400 to-purple-500",
      },
      {
        bg: "bg-accent/10",
        text: "text-accent dark:text-accent/80",
        progress: "from-accent to-accent/80",
      },
    ];
    return colors[level] || colors[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-accent/10 rounded-lg">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Skills</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Highlight your expertise and professional capabilities
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setAddModalOpen(true)}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-1">Total Skills</p>
            <p className="text-2xl font-bold text-foreground">
              {skills.length}
            </p>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-1">Categories</p>
            <p className="text-2xl font-bold text-foreground">
              {categories.length}
            </p>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-1">Average Level</p>
            <p className="text-2xl font-bold text-foreground">
              {/* Simplified average calc or just placeholder */}
              -
            </p>
          </Card>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${displayCategory === category
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-4">
        {displaySkills.length > 0 ? (
          displaySkills.map((skill, index) => {
            const colors = getLevelColor(skill.level);
            const levelVal = getLevelValue(skill.level);
            const progressPercent = (levelVal / 5) * 100;

            return (
              <Card
                key={skill._id}
                className="p-6 border-border/50 hover:border-border hover:shadow-lg transition-all group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {skill.name}
                    </h3>
                    <p
                      className={`text-sm font-medium mt-1 inline-block px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}
                    >
                      {getLevelLabel(skill.level)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Proficiency
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {progressPercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.progress} transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-12 border-border/50 text-center">
            <Award className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No skills in this category yet
            </p>
            <p className="text-sm text-muted-foreground/70">
              Add your first skill to get started
            </p>
          </Card>
        )}
      </div>

      <AddSkillModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAdd={handleAddSkill}
      />
    </div>
  );
}
