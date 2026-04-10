import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight, Star, Clock } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/New_DreamTech_Logos_1769121798107.png";

const books = [
  {
    id: 1,
    title: "From Chaos to Curriculum",
    subtitle: "A Practical Guide to Building L&D from Scratch",
    description:
      "Whether you're the first L&D hire at a startup or rebuilding a broken program, this book walks you through every step — from assessing what you have, to designing what you need, to getting buy-in from leadership.",
    status: "Coming Soon",
    genre: "Instructional Design",
    featured: true,
    pages: "Est. 220 pages",
    audience: "L&D Professionals & HR Leaders",
  },
  {
    id: 2,
    title: "The ROI Playbook for L&D",
    subtitle: "How to Prove the Value of Learning to Any Stakeholder",
    description:
      "A straight-talking guide to measuring, reporting, and communicating learning impact. Packed with frameworks, real examples, and scripts you can actually use in stakeholder conversations.",
    status: "Coming Soon",
    genre: "Analytics & Strategy",
    featured: false,
    pages: "Est. 180 pages",
    audience: "L&D Leaders & CLOs",
  },
  {
    id: 3,
    title: "Lead the Learning",
    subtitle: "Building and Managing High-Performing L&D Teams",
    description:
      "For L&D practitioners stepping into leadership for the first time. Learn how to hire, develop, and retain a great team — and how to position L&D as a strategic business function, not a cost center.",
    status: "Coming Soon",
    genre: "Leadership",
    featured: false,
    pages: "Est. 200 pages",
    audience: "Aspiring & New L&D Leaders",
  },
];

const genreColors: Record<string, string> = {
  "Instructional Design": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Analytics & Strategy": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Leadership": "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

export default function Books() {
  return (
    <div className="min-h-screen bg-foreground text-background">

      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-home-books">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" data-testid="img-logo-books" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-back-home-books">
              ← Back to Portfolio
            </Link>
          </div>
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white" asChild data-testid="button-browse-books">
            <a href="#books-list">Browse Books</a>
          </Button>
        </nav>
      </header>

      {/* Hero — dark, matches Courses and Events */}
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
          >
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1 text-sm" data-testid="badge-books">
              Coming Soon
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight mb-6" data-testid="text-books-heading">
              Books Written{" "}
              <span className="text-pink-500">for Practitioners</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl leading-relaxed mb-10" data-testid="text-books-subheading">
              No fluff. No filler. Just practical, experience-backed guides for L&D professionals who want to do great work and prove it.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <BookOpen className="h-4 w-4 text-pink-500" />
                <span data-testid="text-stat-books">{books.length} Books in the Works</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Star className="h-4 w-4 text-pink-500" />
                <span>Early access for waitlist members</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Clock className="h-4 w-4 text-pink-500" />
                <span>Launching in phases</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books list — light section, matches Courses */}
      <section id="books-list" className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-books-list-title">Upcoming Books</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-books-list-desc">
              All three books are in development. Join the waitlist to get early access and a launch discount when each one drops.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                data-testid={`card-book-${book.id}`}
              >
                <Card className="border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-400 transition-opacity duration-300 ${book.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-8">

                      {/* Book cover placeholder */}
                      <div className="shrink-0">
                        <div className="w-32 h-44 bg-foreground rounded-lg flex flex-col items-center justify-center gap-2 relative overflow-hidden shadow-md">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
                          <BookOpen className="h-8 w-8 text-pink-400 relative z-10" />
                          <span className="text-background/60 text-xs text-center px-2 relative z-10 leading-tight font-medium">
                            {book.title}
                          </span>
                        </div>
                      </div>

                      {/* Book details */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {book.featured && (
                            <Badge className="bg-pink-500 text-white border-0 text-xs">Featured</Badge>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${genreColors[book.genre]}`}>
                            {book.genre}
                          </span>
                          <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
                            {book.status}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-semibold mb-1 text-foreground" data-testid={`text-book-title-${book.id}`}>
                          {book.title}
                        </h3>
                        <p className="text-pink-500 text-sm font-medium mb-4" data-testid={`text-book-subtitle-${book.id}`}>
                          {book.subtitle}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`text-book-desc-${book.id}`}>
                          {book.description}
                        </p>

                        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-pink-500" />
                            {book.pages}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-pink-500" />
                            For: {book.audience}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          className="border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
                          asChild
                          data-testid={`button-notify-book-${book.id}`}
                        >
                          <Link href="/">
                            Join Waitlist for Early Access
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA — matches Courses bottom CTA style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 bg-foreground rounded-2xl p-12 text-center text-background"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4" data-testid="text-books-cta-heading">
              Be first when they drop.
            </h3>
            <p className="text-background/70 mb-8 max-w-lg mx-auto">
              Waitlist members get early access and a launch discount on every book. Sign up once, stay in the loop for all of them.
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white group" asChild data-testid="button-books-waitlist">
              <Link href="/">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p data-testid="text-books-footer">&copy; {new Date().getFullYear()} Shawny Hargrove</p>
      </footer>
    </div>
  );
}
