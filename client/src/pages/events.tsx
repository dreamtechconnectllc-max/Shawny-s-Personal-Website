import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Video, Users, ArrowRight, Bell, Clock, Mic } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/New_DreamTech_Logos_1769121798107.png";

const upcomingEvents = [
  {
    id: 1,
    title: "ATD International Conference & Expo 2026",
    description:
      "Catch me at ATD ICE — the world's largest L&D conference. I'll be attending sessions, connecting with fellow practitioners, and sharing insights from the floor. Come say hi if you're there!",
    date: "June 5, 2026",
    time: "All Day",
    type: "In-Person",
    location: "Washington, D.C.",
    seats: "Open to attendees",
    category: "Conference",
    featured: true,
  },
  {
    id: 2,
    title: "Panel: The Future of AI in Corporate Learning",
    description:
      "I'll be joining a panel of L&D leaders to talk about where AI is actually making a difference in workplace learning — and where the hype doesn't match the reality. Come with your questions.",
    date: "July 22, 2026",
    time: "2:00 PM – 3:30 PM EST",
    type: "Virtual",
    location: "Online — registration link coming soon",
    seats: "Open to all",
    category: "Panel",
    featured: false,
  },
  {
    id: 3,
    title: "Guest Speaker: NYC L&D Leaders Meetup",
    description:
      "I'm speaking at this month's NYC L&D Leaders Meetup on building L&D teams from the ground up — what I've learned, what I'd do differently, and what actually moves the needle.",
    date: "August 14, 2026",
    time: "6:30 PM – 8:30 PM EST",
    type: "In-Person",
    location: "New York City, NY (Venue TBA)",
    seats: "RSVP required",
    category: "Speaking",
    featured: false,
  },
  {
    id: 4,
    title: "Podcast Recording: The Learning Leaders Show",
    description:
      "I'll be a guest on The Learning Leaders Show talking about instructional design, proving L&D ROI, and building a personal brand as an L&D professional. Episode drops shortly after — stay tuned.",
    date: "September 9, 2026",
    time: "11:00 AM – 12:00 PM EST",
    type: "Virtual",
    location: "Recorded via Zoom",
    seats: "Recording — public episode after",
    category: "Podcast",
    featured: false,
  },
];

const pastEvents = [
  {
    id: 101,
    title: "DevLearn Conference & Expo",
    date: "October 2025",
    type: "In-Person",
    category: "Conference",
  },
  {
    id: 102,
    title: "Panel: Women Leading in L&D",
    date: "March 2026",
    type: "Virtual",
    category: "Panel",
  },
  {
    id: 103,
    title: "Guest Lecturer — Columbia University",
    date: "January 2026",
    type: "In-Person",
    category: "Speaking",
  },
];

const categoryColors: Record<string, string> = {
  Conference: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Panel: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Speaking: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Podcast: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const categoryColorsLight: Record<string, string> = {
  Conference: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Panel: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Speaking: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  Podcast: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export default function Events() {
  const { toast } = useToast();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const notifyMutation = useMutation({
    mutationFn: async (data: { email: string; product: string }) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're registered!",
        description: "We'll send event details and reminders to your inbox.",
      });
      setNotifyOpen(false);
      setNotifyEmail("");
      setSelectedEvent("");
    },
    onError: (error: Error) => {
      toast({
        title: "Oops!",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRegister = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setNotifyOpen(true);
  };

  const handleSubmitNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail && selectedEvent) {
      notifyMutation.mutate({ email: notifyEmail, product: `event-${selectedEvent}` });
    }
  };

  const featuredEvent = upcomingEvents.find((e) => e.featured);
  const regularEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <div className="min-h-screen bg-foreground text-background">

      {/* Header — matches Courses */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-home-events">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" data-testid="img-logo-events" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-back-home-events">
              ← Back to Portfolio
            </Link>
          </div>
          <Button
            size="sm"
            className="bg-pink-500 hover:bg-pink-600 text-white"
            onClick={() => { setSelectedEvent("All Events"); setNotifyOpen(true); }}
            data-testid="button-notify-nav"
          >
            Get Notified
          </Button>
        </nav>
      </header>

      {/* Hero — dark, left-aligned, matches home/courses pattern */}
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
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1 text-sm" data-testid="badge-events">
              Appearances & Speaking
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight mb-6" data-testid="text-events-heading">
              Where You Can{" "}
              <span className="text-pink-500">Find Me</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl leading-relaxed mb-10" data-testid="text-events-subheading">
              Conferences, panels, speaking engagements, and podcast appearances. If you'll be at any of these — come find me. I love connecting with fellow L&D professionals in person.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Calendar className="h-4 w-4 text-pink-500" />
                <span data-testid="text-stat-upcoming">{upcomingEvents.length} Upcoming Appearances</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Mic className="h-4 w-4 text-pink-500" />
                <span>Speaking & Panels</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span>NYC & Nationwide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events — light section, matches courses list section */}
      <section id="upcoming" className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-upcoming-title">Upcoming Appearances</h2>
            <p className="text-muted-foreground max-w-2xl" data-testid="text-upcoming-desc">
              Here's where I'll be. If you're attending any of these, reach out — I'd love to connect.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">

            {/* Featured event — larger card with pink accent bar, same hover treatment as courses */}
            {featuredEvent && (
              <motion.div
                key={featuredEvent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                data-testid={`card-event-${featuredEvent.id}`}
              >
                <Card className="border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-400" />
                  <CardContent className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge className="bg-pink-500 text-white border-0 text-xs" data-testid={`badge-featured-${featuredEvent.id}`}>
                        Featured Event
                      </Badge>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${categoryColorsLight[featuredEvent.category]}`}>
                        {featuredEvent.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        {featuredEvent.type === "Virtual"
                          ? <><Video className="h-3 w-3" /> Virtual</>
                          : <><MapPin className="h-3 w-3" /> In-Person</>}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-3 text-foreground" data-testid={`text-event-title-${featuredEvent.id}`}>
                          {featuredEvent.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5" data-testid={`text-event-desc-${featuredEvent.id}`}>
                          {featuredEvent.description}
                        </p>
                        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-pink-500" />
                            {featuredEvent.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-pink-500" />
                            {featuredEvent.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-pink-500" />
                            {featuredEvent.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-pink-500" />
                            {featuredEvent.seats}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <Button
                          size="lg"
                          className="bg-pink-500 hover:bg-pink-600 text-white group/btn"
                          onClick={() => handleRegister(featuredEvent.title)}
                          data-testid={`button-register-${featuredEvent.id}`}
                        >
                          Register Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Regular event cards — same hover/border treatment as courses */}
            {regularEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                data-testid={`card-event-${event.id}`}
              >
                <Card className="border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="shrink-0 md:w-32">
                      <div className="text-pink-500 font-bold text-lg leading-tight" data-testid={`text-event-date-${event.id}`}>
                        {event.date.split(",")[0]}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {event.date.split(", ")[1]}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">{event.time.split(" – ")[0]}</div>
                    </div>

                    <div className="w-px bg-border hidden md:block self-stretch" />

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${categoryColorsLight[event.category]}`}>
                          {event.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {event.type === "Virtual"
                            ? <><Video className="h-3 w-3" /> Virtual</>
                            : <><MapPin className="h-3 w-3" /> In-Person</>}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid={`text-event-title-${event.id}`}>
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3" data-testid={`text-event-desc-${event.id}`}>
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.seats}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Button
                        variant="outline"
                        className="border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
                        onClick={() => handleRegister(event.title)}
                        data-testid={`button-register-${event.id}`}
                      >
                        Register
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events — dark section, matches courses bottom CTA section */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-background" data-testid="text-past-title">Past Appearances</h2>
            <p className="text-background/60 max-w-2xl">A few places I've spoken, taught, and shown up.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                data-testid={`card-past-event-${event.id}`}
              >
                <Card className="border border-border/20 bg-background/5 hover:border-pink-500/30 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${categoryColors[event.category]}`}>
                        {event.category}
                      </span>
                      <span className="text-xs text-background/50">{event.date}</span>
                    </div>
                    <h3 className="font-medium text-sm text-background mb-2" data-testid={`text-past-title-${event.id}`}>{event.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-background/50">
                      <span className="flex items-center gap-1">
                        {event.type === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        {event.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA — inline with the dark section, same as courses bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background/5 border border-border/20 rounded-2xl p-12 text-center"
          >
            <Bell className="h-10 w-10 text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-background" data-testid="text-notify-heading">
              Want to know where I'll be next?
            </h2>
            <p className="text-background/70 mb-8 max-w-lg mx-auto">
              Drop your email and I'll keep you in the loop on new appearances, speaking dates, and events I'll be attending.
            </p>
            <Button
              size="lg"
              className="bg-pink-500 hover:bg-pink-600 text-white group"
              onClick={() => { setSelectedEvent("All Events"); setNotifyOpen(true); }}
              data-testid="button-notify-footer"
            >
              Keep Me Updated
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p data-testid="text-events-footer">&copy; {new Date().getFullYear()} Shawny Hargrove · DreamTech Connect</p>
      </footer>

      <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-pink-500" />
              {selectedEvent === "All Events" ? "Stay in the Loop" : "I'll See You There!"}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent === "All Events"
                ? "Drop your email and I'll notify you when I add new appearances and speaking dates."
                : `Drop your email and I'll send you details about "${selectedEvent}" — including any updates or reminders as it gets closer.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNotify} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              required
              data-testid="input-notify-email"
            />
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white"
              disabled={notifyMutation.isPending}
              data-testid="button-submit-notify"
            >
              {notifyMutation.isPending
                ? "Registering..."
                : selectedEvent === "All Events" ? "Notify Me" : "Register"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
