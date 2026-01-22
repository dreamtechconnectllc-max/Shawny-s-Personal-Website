import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Mail, Linkedin, ExternalLink, Palette, Layout, Code } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import shawnyImage from "@assets/Untitled_design_(4)_1769115041947.png";
import logoImage from "@assets/ChatGPT_Image_Jan_22,_2026,_04_04_22_PM_1769116122953.png";

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

const services = [
  {
    icon: Palette,
    title: "Branding",
    description: "Create strong impressions. A 'brand' is the gut feeling about a product or company, impacting overall success. It's more than just visuals; it's how they combine to build trust."
  },
  {
    icon: Layout,
    title: "Web Design",
    description: "Effective design shapes first impressions and user experiences. Our custom, research-driven approach ensures your digital presence is both visually appealing and goal-oriented."
  },
  {
    icon: Code,
    title: "Development",
    description: "We use modern web technologies for speed and scalability, allowing faster builds and better performance, making it easy for teams to manage without complex setups."
  }
];

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { scrollY } = useScroll();
  const shawnyX = useTransform(scrollY, [0, 500], [0, 80]);
  const hargroveX = useTransform(scrollY, [0, 500], [0, -80]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-foreground text-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center" data-testid="link-home" aria-label="Go to top of page">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" data-testid="img-logo" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-background/70 hover:text-background transition-colors" data-testid="link-about">About</a>
            <a href="#services" className="text-sm text-background/70 hover:text-background transition-colors" data-testid="link-services">Services</a>
            <a href="#projects" className="text-sm text-background/70 hover:text-background transition-colors" data-testid="link-projects">Projects</a>
            <a href="#contact" className="text-sm text-background/70 hover:text-background transition-colors" data-testid="link-contact">Contact</a>
          </div>
          <Button variant="outline" className="bg-background text-foreground hover:bg-background/90 border-background" asChild data-testid="button-cta-header">
            <a href="#contact">Lets Connect!</a>
          </Button>
        </nav>
      </header>

      <section id="top" className="relative h-screen bg-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-32 h-full relative">
          <div className="relative z-10">
            <motion.h1 
              style={{ x: shawnyX }}
              className="text-[5rem] md:text-[8rem] lg:text-[11rem] xl:text-[14rem] font-bold leading-none tracking-tight text-background"
              data-testid="text-hero-shawny"
            >
              Shawny
            </motion.h1>
            <motion.h1 
              style={{ x: hargroveX }}
              className="text-[5rem] md:text-[8rem] lg:text-[11rem] xl:text-[14rem] font-bold leading-none tracking-tight text-background -mt-4 md:-mt-8 lg:-mt-12 xl:-mt-16"
              data-testid="text-hero-hargrove"
            >
              Hargrove
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -right-32 md:-right-48 lg:-right-64 xl:-right-80 bottom-0 z-20 h-[70vh] md:h-[80vh] lg:h-[85vh]"
          >
            <img 
              src={shawnyImage}
              alt="Shawny Hargrove"
              className="h-full w-auto object-contain object-bottom"
              data-testid="img-profile"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-12 left-6 z-30 max-w-md"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-background mb-6" data-testid="text-hero-title">
              Scaling teams with strategic learning solutions that meet measurable goals businesses care about. Let's Connect!
            </p>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild data-testid="button-cta-hero">
              <a href="#contact">
                Let's work together
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-relaxed mb-8" data-testid="text-about-intro">
              Hey, <span className="font-serif italic">Shawny</span> here. I'm a web designer, brand strategist based in Atlanta, GA. I love helping good folks do good things with memorable brands & websites—<em className="font-serif">enjoying life</em> all the while.
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-description">
              If you need help bringing a dream, idea, or business to life with pro visuals like websites & branding, or want to take an existing project to the next level—give me a shout.
            </p>
            <Button variant="outline" size="lg" className="group" asChild data-testid="button-start-project">
              <a href="#contact">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 bg-muted/30 text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-services-title">Services</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-services-description">What I can help you with.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover-elevate" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6">
                    <service.icon className="h-8 w-8 mb-4 text-foreground" aria-hidden="true" />
                    <h3 className="text-xl font-semibold mb-3" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-service-desc-${index}`}>{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-projects-title">Featured projects</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-projects-description">A selection of recent work across branding, web design, and development.</p>
          </motion.div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
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
                        View Project <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0" data-testid="button-carousel-prev" />
              <CarouselNext className="static translate-y-0" data-testid="button-carousel-next" />
            </div>
          </Carousel>
        </div>
      </section>

      <section className="py-24 bg-muted/30 text-foreground">
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
                A <em className="font-serif">little</em> about me.
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-bio-1">
                I've been in the world of creative development for almost a decade now. Most of my work today is through independent projects and collaborations with amazing teams. My personal mission is to help good folks that are doing good things for the good of others.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="text-bio-2">
                When I'm not designing or coding, you'll find me exploring new coffee shops, hiking trails, or spending time with family and friends.
              </p>
              <Button variant="outline" size="lg" className="group" asChild data-testid="button-work-together">
                <a href="#contact">
                  Let's work together
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted rounded-xl p-6 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-serif italic text-muted-foreground/50" data-testid="text-initial-s">S</span>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-medium mb-1" data-testid="text-trait-creative">Creative</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-trait-creative-sub">Problem Solver</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-medium mb-1" data-testid="text-trait-detail">Detail</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-trait-detail-sub">Oriented</p>
                </div>
                <div className="bg-muted rounded-xl p-6 aspect-square flex items-center justify-center">
                  <span className="text-6xl font-serif italic text-muted-foreground/50" data-testid="text-initial-h">H</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 overflow-hidden bg-background text-foreground">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 gap-8 px-4">
              {["Creative Thinker", "Web Designer", "Brand Strategist", "Problem Solver", "Detail Oriented", "Collaborative"].map((trait) => (
                <span key={`${setIndex}-${trait}`} className="text-4xl md:text-5xl font-medium text-muted-foreground/30 whitespace-nowrap">
                  {trait} <span className="text-muted-foreground/20 mx-4" aria-hidden="true">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 bg-muted/30 text-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6" data-testid="text-contact-title">
                Let's create something <em className="font-serif">beautiful</em> together.
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-contact-description">
                Have a project in mind? I'd love to hear about it. Send me a message and let's start the conversation.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@shawnyhargrove.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                  aria-label="Send email to hello@shawnyhargrove.com"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  hello@shawnyhargrove.com
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-linkedin"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
            <Card className="border-border/50" data-testid="card-contact-form">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-2 block">Name</label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="input-name" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-2 block">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="text-sm font-medium mb-2 block">Subject</label>
                    <Input 
                      id="subject" 
                      placeholder="Project inquiry" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      data-testid="input-subject" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project..." 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      data-testid="input-message"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-contact">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>
              </CardContent>
            </Card>
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
    </div>
  );
}
