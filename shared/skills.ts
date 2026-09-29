import { z } from "zod";

// Downloadable Skill.md files. Each `fileName` must exist in the top-level
// `skills/` folder — that file is attached to the delivery email.
// PLACEHOLDERS: replace these entries (and the files) with the real skills.
export const skills = [
  {
    id: "needs-analysis",
    title: "Training Needs Analysis",
    description:
      "A Skill.md that guides an AI assistant through a structured training needs analysis — from stakeholder questions to a clear recommendation on whether training is the right fix.",
    tags: ["Analysis", "Strategy"],
    fileName: "needs-analysis.md",
  },
  {
    id: "course-outline",
    title: "Course Outline Builder",
    description:
      "A Skill.md that turns a subject-matter brief into a learner-centered course outline with objectives, modules, activities and assessments.",
    tags: ["Instructional Design", "Authoring"],
    fileName: "course-outline.md",
  },
] as const;

export type Skill = (typeof skills)[number];

const skillIds = skills.map((s) => s.id) as [string, ...string[]];

export const skillRequestSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(100),
  lastName: z.string().trim().min(1, "Please enter your last name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  organization: z.string().trim().max(200).optional().default(""),
  role: z.string().trim().max(200).optional().default(""),
  skillIds: z.array(z.enum(skillIds)).min(1, "Please select at least one skill"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive the skill by email" }),
  }),
});

export type SkillRequest = z.infer<typeof skillRequestSchema>;
