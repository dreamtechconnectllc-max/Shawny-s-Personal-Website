import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowRight, ExternalLink, Sparkles, BarChart3, Target, Play, TrendingUp, FileSearch, ClipboardCheck, GraduationCap, Star, CalendarDays } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import shawnyImage from "@assets/Untitled_design_(4)_1769115041947.png";
import logoImage from "@assets/New_DreamTech_Logos_1769121798107.png";

const projects = [
  {
    id: "bloom-co",
    title: "Bloom & Co",
    category: "E-Commerce",
    tags: ["Branding", "Design", "Development"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: "apex-ventures",
    title: "Apex Ventures",
    category: "Finance",
    tags: ["Design", "Development", "Migration"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    id: "horizon-health",
    title: "Horizon Health",
    category: "Healthcare",
    tags: ["Branding", "Design", "Support"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
  }
];


const aiProducts = [
  {
    id: "connect-roi",
    title: "ConnectROI",
    description: "Measure and demonstrate proof of ROI for learning solutions provided to stakeholders and decision makers. Show the real business impact of your L&D investments.",
    icon: TrendingUp,
  },
  {
    id: "connect-analysis",
    title: "ConnectAnalysis",
    description: "Conduct comprehensive training needs analysis with AI-powered insights. Get detailed reports on whether training is needed and recommended next steps.",
    icon: FileSearch,
  },
  {
    id: "connect-observation",
    title: "ConnectObservation",
    description: "A reinforcement tool for managers to conduct certification observations, demonstrating how to perform specific duties or jobs to reinforce learning.",
    icon: ClipboardCheck,
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const shawnyX = useTransform(scrollY, [0, 500], [0, 80]);
  const hargroveX = useTransform(scrollY, [0, 500], [0, -80]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [email, setEmail] = useState("");

  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const [coursesEmail, setCoursesEmail] = useState("");
  const [wantsDiscount, setWantsDiscount] = useState(false);

  const waitlistMutation = useMutation({
    mutationFn: async (data: { email: string; product: string }) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: `We'll notify you when ${selectedProduct} is ready.`,
      });
      setWaitlistOpen(false);
      setEmail("");
      setSelectedProduct("");
    },
    onError: (error: Error) => {
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const coursesWaitlistMutation = useMutation({
    mutationFn: async (data: { email: string; product: string; wantsDiscount: string }) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: wantsDiscount
          ? "We'll reach out with your exclusive early-bird discount when courses launch!"
          : "We'll let you know as soon as our courses go live.",
      });
      setCoursesModalOpen(false);
      setCoursesEmail("");
      setWantsDiscount(false);
      setLocation("/courses");
    },
    onError: (error: Error) => {
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJoinWaitlist = (product: string) => {
    setSelectedProduct(product);
    setWaitlistOpen(true);
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedProduct) {
      waitlistMutation.mutate({ email, product: selectedProduct });
    }
  };

  const handleCoursesNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoursesModalOpen(true);
  };

  const handleCoursesWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coursesEmail) {
      coursesWaitlistMutation.mutate({
        email: coursesEmail,
        product: "courses",
        wantsDiscount: wantsDiscount ? "yes" : "no",
      });
    }
  };

  const handleSkipToCoursesPage = () => {
    setCoursesModalOpen(false);
    setLocation("/courses");
  };

  return (
    <div className="min-h-screen bg-foreground text-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center" data-testid="link-home" aria-label="Go to top of page">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" data-testid="img-logo" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-about">About</a>
            <a href="https://dreamtechconnect.io" target="_blank" rel="noopener noreferrer" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-services">Services</a>
            <a href="#projects" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-projects">Projects</a>
            <a href="#ld-ai-products" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-ld-ai-products">L&D AI Products</a>
            <a href="/courses" onClick={handleCoursesNavClick} className="text-sm text-pink-500 hover:text-pink-400 font-medium transition-colors flex items-center gap-1" data-testid="link-courses">
              <GraduationCap className="h-4 w-4" />
              Courses
            </a>
            <a href="/events" className="text-sm text-pink-500 hover:text-pink-400 font-medium transition-colors flex items-center gap-1" data-testid="link-events">
              <CalendarDays className="h-4 w-4" />
              Events
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative min-h-screen pb-16 bg-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-32 h-full relative">
          <div className="relative z-10">
            <motion.h1 
              style={{ x: shawnyX }}
              className="text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold leading-none tracking-tight text-background"
              data-testid="text-hero-shawny"
            >
              Shawny
            </motion.h1>
            <motion.h1 
              style={{ x: hargroveX }}
              className="text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold leading-none tracking-tight text-background -mt-2 md:-mt-4 lg:-mt-6 xl:-mt-8"
              data-testid="text-hero-hargrove"
            >
              Hargrove
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl font-medium italic text-pink-500 mt-4"
              data-testid="text-hero-title"
            >
              Founder & CEO | Director | Instructional Designer
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-background mt-6 max-w-md"
              data-testid="text-hero-subtitle"
            >
              Scaling teams with strategic learning solutions that meet measurable goals businesses care about.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild data-testid="button-cta-hero">
                <a href="#contact">
                  Let's Connect!
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>
          
          </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -right-64 md:-right-56 lg:-right-48 xl:-right-40 bottom-0 z-20 h-[75vh] md:h-[85vh] lg:h-[90vh]"
        >
          <img 
            src={shawnyImage}
            alt="Shawny Hargrove"
            className="h-full w-auto object-contain object-bottom"
            data-testid="img-profile"
          />
        </motion.div>
      </section>

      <section id="about" className="py-24 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6" data-testid="text-about-section">
                Hey, I'm <em className="font-serif text-pink-500">Shawny.</em>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-bio-1">
                I'm a Learning & Development strategist and instructional designer based in New York City.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-bio-2">
                I help startups and growing teams turn knowledge into impact, through scalable learning systems, smart design, and AI-powered tools that actually show ROI.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-bio-3">
                If you're building training from scratch, leveling up your people, or need proof that L&D is moving the business forward, let's connect.
              </p>
            </div>
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden" data-testid="video-about-container">
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                  <Play className="h-8 w-8 text-white ml-1" fill="white" />
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">About Me Video Coming Soon</p>
            </div>
          </motion.div>
        </div>
      </section>


      <section id="projects" className="py-24 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-projects-title">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-projects-description">A selection of learning solutions I've designed and delivered for organizations.</p>
          </motion.div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 30,
            }}
            className="w-full"
            data-testid="carousel-projects"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-visible border-border/50 hover-elevate" data-testid={`card-project-${project.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-project-${project.id}`}
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-semibold" data-testid={`text-project-title-${project.id}`}>{project.title}</h3>
                        <span className="text-xs text-muted-foreground" data-testid={`text-project-year-${project.id}`}>{project.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3" data-testid={`text-project-category-${project.id}`}>{project.category}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-project-${project.id}-tag-${tagIndex}`}>{tag}</Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full gap-2" data-testid={`button-view-project-${project.id}`} aria-label={`View ${project.title} project`}>
                        View Course <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" data-testid="button-carousel-prev" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" data-testid="button-carousel-next" />
            </div>
          </Carousel>
        </div>
      </section>

      <section id="ld-ai-products" className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-background" data-testid="text-ld-ai-title">L&D AI Products</h2>
            <p className="text-background/70 max-w-2xl" data-testid="text-ld-ai-description">AI-powered learning and development solutions to scale your team.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {aiProducts.map((product, index) => (
              <Card key={product.id} className="h-full border-2 border-border/50 hover:border-pink-500 transition-colors duration-300 flex flex-col" data-testid={`card-ld-product-${index}`}>
                <CardContent className="p-6 flex flex-col flex-1">
                  <product.icon className="h-8 w-8 mb-4 text-foreground" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-3" data-testid={`text-ld-product-title-${index}`}>{product.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1" data-testid={`text-ld-product-desc-${index}`}>{product.description}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                    onClick={() => handleJoinWaitlist(product.title)}
                    data-testid={`button-waitlist-${index}`}
                  >
                    Join Waitlist
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6" data-testid="text-contact-title">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
              Ready to transform your team's learning experience? Book a 15-minute discovery call to discuss your L&D goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/shawny-dreamtechconnect/15-minute-fit-check-clone-clone-clone"
              data-testid="calendly-embed"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Shawny Hargrove. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#top" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy</a>
            <a href="#top" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms</a>
          </div>
        </div>
      </footer>

      <Dialog open={waitlistOpen} onOpenChange={setWaitlistOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join the {selectedProduct} Waitlist</DialogTitle>
            <DialogDescription>
              Be the first to know when {selectedProduct} launches. Enter your email below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitWaitlist} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-waitlist-email"
            />
            <Button 
              type="submit" 
              className="bg-pink-500 hover:bg-pink-600 text-white"
              disabled={waitlistMutation.isPending}
              data-testid="button-submit-waitlist"
            >
              {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={coursesModalOpen} onOpenChange={setCoursesModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <div className="bg-foreground p-8 text-background">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-pink-400" />
              </div>
              <Badge className="bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs">
                Coming Soon
              </Badge>
            </div>
            <DialogTitle className="text-2xl font-bold text-background mt-4 mb-2">
              Courses are on the way!
            </DialogTitle>
            <DialogDescription className="text-background/70 text-sm leading-relaxed">
              We're building practical L&D courses you can actually use. Join the waitlist to be first in line — and optionally reserve your early-bird discount.
            </DialogDescription>
          </div>

          <div className="p-8 bg-background">
            <form onSubmit={handleCoursesWaitlistSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block" htmlFor="courses-email">
                  Your email address
                </label>
                <Input
                  id="courses-email"
                  type="email"
                  placeholder="you@example.com"
                  value={coursesEmail}
                  onChange={(e) => setCoursesEmail(e.target.value)}
                  required
                  data-testid="input-courses-email"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group" data-testid="label-wants-discount">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={wantsDiscount}
                    onChange={(e) => setWantsDiscount(e.target.checked)}
                    className="peer sr-only"
                    data-testid="checkbox-wants-discount"
                  />
                  <div className="h-5 w-5 rounded border-2 border-border peer-checked:bg-pink-500 peer-checked:border-pink-500 transition-colors flex items-center justify-center">
                    {wantsDiscount && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-pink-500" />
                    Yes! Reserve my early-bird discount
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Get an exclusive discount when courses launch. No payment needed now.
                  </p>
                </div>
              </label>

              <div className="flex flex-col gap-3 pt-1">
                <Button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white w-full"
                  disabled={coursesWaitlistMutation.isPending || !coursesEmail}
                  data-testid="button-submit-courses-waitlist"
                >
                  {coursesWaitlistMutation.isPending ? "Joining..." : "Join the Waitlist"}
                </Button>
                <button
                  type="button"
                  onClick={handleSkipToCoursesPage}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                  data-testid="button-skip-courses"
                >
                  Skip — just show me the courses
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
