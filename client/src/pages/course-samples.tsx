import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, GraduationCap, Clock, MonitorPlay } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/SH_logo_pink.png";
// Unsplash photo 6ie6OjshvWg (free Unsplash License)
import gtmCourseImage from "@assets/gtm-course-virtual-sales-call.jpg";

// Course files live in client/public/samples/<folder>/ and are served as-is.
// `url` points at the course's index.html; leave it empty to show "Preview coming soon".
const courseSamples: {
  id: string;
  title: string;
  description: string;
  format: string;
  duration?: string;
  tags: string[];
  image?: string;
  url: string;
}[] = [
  {
    id: "gtm-sales-accelerator",
    title: "GTM Sales Accelerator Psychology Course",
    // DRAFT description — edit to match the course
    description: "An interactive course that equips go-to-market teams with the buyer psychology behind high-performing sales conversations — and how to apply it to accelerate deals.",
    format: "eLearning",
    tags: ["Sales Enablement", "GTM", "Psychology"],
    image: gtmCourseImage,
    url: "/samples/gtm-sales-accelerator/index.html",
  },
];

export default function CourseSamples() {
  return (
    <div className="min-h-screen bg-foreground text-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-home-samples">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-back-home-samples">
            ← Back to Portfolio
          </Link>
        </nav>
      </header>

      <section className="pt-40 pb-24 px-6 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1 text-sm">
              Projects
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight mb-6" data-testid="text-samples-heading">
              Course <span className="text-pink-500">Samples</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl leading-relaxed">
              Explore examples of learning experiences I've designed and built. Open any sample to view it — no sign-up required.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseSamples.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 relative overflow-hidden group flex flex-col" data-testid={`card-sample-${course.id}`}>
                <div className="absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="aspect-video bg-foreground flex items-center justify-center relative overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-sample-${course.id}`}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
                      <GraduationCap className="h-10 w-10 text-pink-400 relative z-10" aria-hidden="true" />
                    </>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{course.description}</p>
                  <div className="flex gap-5 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5"><MonitorPlay className="h-4 w-4 text-pink-500" />{course.format}</span>
                    {course.duration && (
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-pink-500" />{course.duration}</span>
                    )}
                  </div>
                  {course.url ? (
                    <Button variant="outline" className="border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white gap-2" asChild>
                      <a href={course.url} target="_blank" rel="noopener noreferrer" data-testid={`button-view-sample-${course.id}`}>
                        View Course <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>Preview coming soon</Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p>&copy; {new Date().getFullYear()} Shawny Hargrove</p>
      </footer>
    </div>
  );
}
