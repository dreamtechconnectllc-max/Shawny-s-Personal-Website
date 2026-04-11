import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, BookOpen, Star, ArrowRight, Lock } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/SH_logo_pink.png";

const courses = [
  {
    id: 1,
    title: "L&D Foundations: Building Effective Learning Programs",
    description:
      "Master the fundamentals of instructional design, adult learning theory, and program development. Learn how to design, develop, and deliver impactful learning experiences from scratch.",
    category: "Instructional Design",
    level: "Beginner",
    duration: "6 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["ADDIE", "Adult Learning", "ILT", "VILT"],
    comingSoon: true,
  },
  {
    id: 2,
    title: "LMS Mastery: Implementation & Administration",
    description:
      "Everything you need to successfully implement, configure, and manage a Learning Management System. From vendor selection to user adoption strategies.",
    category: "LMS",
    level: "Intermediate",
    duration: "4 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["LMS", "Canvas", "Docebo", "Administration"],
    comingSoon: true,
  },
  {
    id: 3,
    title: "Proving ROI: Demonstrating the Value of L&D",
    description:
      "Learn how to measure, track, and communicate the business impact of your learning initiatives. Turn data into compelling stories that win stakeholder buy-in.",
    category: "Analytics & ROI",
    level: "Intermediate",
    duration: "3 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["ROI", "Kirkpatrick", "Data", "Stakeholders"],
    comingSoon: true,
  },
  {
    id: 4,
    title: "Scaling Your L&D Team: Leadership & Strategy",
    description:
      "Go from individual contributor to L&D leader. Build your team, set strategy, manage budgets, and position learning as a true business driver.",
    category: "Leadership",
    level: "Advanced",
    duration: "8 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["Leadership", "Strategy", "Team Building", "Budget"],
    comingSoon: true,
  },
  {
    id: 5,
    title: "AI Tools for L&D Professionals",
    description:
      "Harness the power of AI to supercharge your instructional design workflow. From content creation to needs analysis — work smarter, not harder.",
    category: "AI & Technology",
    level: "Beginner",
    duration: "2 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["AI", "ChatGPT", "Automation", "Productivity"],
    comingSoon: true,
  },
  {
    id: 6,
    title: "Training Needs Analysis: From Gap to Solution",
    description:
      "Conduct thorough training needs analyses that lead to the right solutions. Learn when training is — and isn't — the answer, and how to recommend next steps.",
    category: "Instructional Design",
    level: "Beginner",
    duration: "2 weeks",
    students: "Coming Soon",
    rating: null,
    tags: ["TNA", "Gap Analysis", "Root Cause", "Solutions"],
    comingSoon: true,
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export default function Courses() {
  return (
    <div className="min-h-screen bg-foreground text-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" data-testid="img-logo-courses" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-back-home">
              ← Back to Portfolio
            </Link>
          </div>
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white" asChild data-testid="button-courses-waitlist-nav">
            <a href="#courses-list">Browse Courses</a>
          </Button>
        </nav>
      </header>

      <section className="pt-40 pb-24 px-6 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1 text-sm" data-testid="badge-coming-soon">
              Coming Soon
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight mb-6" data-testid="text-courses-heading">
              Level Up Your{" "}
              <span className="text-pink-500">L&D Career</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10 leading-relaxed" data-testid="text-courses-subheading">
              Practical, no-fluff courses built by an L&D practitioner with 10+ years in the field. Real strategies. Real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-background/60 text-sm" data-testid="text-stat-courses">
                <BookOpen className="h-4 w-4 text-pink-500" />
                <span>6 Courses Planned</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm" data-testid="text-stat-discount">
                <Star className="h-4 w-4 text-pink-500" />
                <span>Early access discounts available</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm" data-testid="text-stat-instructors">
                <Users className="h-4 w-4 text-pink-500" />
                <span>Expert-led curriculum</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="courses-list" className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-courses-list-title">Upcoming Courses</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-courses-list-desc">
              All courses are in development. Join the waitlist from the home page to be first in line — waitlist members get an exclusive launch discount.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                data-testid={`card-course-${course.id}`}
              >
                <Card className="h-full border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
                        {course.category}
                      </Badge>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${levelColors[course.level]}`} data-testid={`badge-level-${course.id}`}>
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-3 leading-snug" data-testid={`text-course-title-${course.id}`}>
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow" data-testid={`text-course-desc-${course.id}`}>
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          {course.students}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center bg-foreground rounded-2xl p-12 text-background"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4" data-testid="text-cta-heading">
              Be first. Get the discount.
            </h3>
            <p className="text-background/70 mb-8 max-w-lg mx-auto">
              Waitlist members who choose to reserve their spot at launch will receive an exclusive early-bird discount on any course.
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white group" asChild data-testid="button-go-home-waitlist">
              <Link href="/">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p data-testid="text-courses-footer">&copy; {new Date().getFullYear()} Shawny Hargrove · DreamTech Connect</p>
      </footer>
    </div>
  );
}
