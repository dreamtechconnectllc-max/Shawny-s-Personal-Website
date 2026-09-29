import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Rocket, TrendingUp, Users, Settings, Lightbulb, CheckCircle2, CreditCard, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { book, bookFormats, preorderSchema } from "@shared/book";
import logoImage from "@assets/SH_logo_pink.png";
import coverImage from "@assets/ld-strategic-partner-cover.jpg";

// Themes from the book cover. DRAFT copy — edit to match the manuscript.
const pillars = [
  { icon: Rocket, title: "Built for Startups", description: "How to stand up L&D when there's no playbook, no team and no time — and make it matter from day one." },
  { icon: TrendingUp, title: "Drive Impact. Fuel Growth.", description: "Tie learning directly to the business metrics leaders care about, and prove it." },
  { icon: Users, title: "People First", description: "Build a culture where people grow with the company instead of being left behind by it." },
  { icon: Settings, title: "Systems That Scale", description: "Design onboarding, enablement and development systems that hold up as headcount multiplies." },
  { icon: Lightbulb, title: "Learn. Adapt. Innovate.", description: "Stay ahead of constant change — including how to put AI to work across your L&D function." },
];

// Photo-real 3D book: the cover is the front face, with a page block on the
// right edge, a spine crease, a gloss highlight and a floor shadow.
function BookMockup() {
  const W = 280;
  const H = 420;
  const T = 34; // thickness
  const face = { position: "absolute" as const, backfaceVisibility: "hidden" as const };

  return (
    <div className="relative flex justify-center items-center py-10 scale-[0.85] sm:scale-100" style={{ perspective: "1600px" }} data-testid="img-book-mockup">
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[340px] h-10 rounded-[50%] bg-black/70 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="relative transition-transform duration-700 ease-out [transform:rotateY(-30deg)_rotateX(4deg)] hover:[transform:rotateY(-14deg)_rotateX(2deg)]"
        style={{ width: W, height: H, transformStyle: "preserve-3d" }}
      >
        {/* Front cover */}
        <div style={{ ...face, inset: 0, transform: `translateZ(${T / 2}px)` }} className="rounded-r-[4px] overflow-hidden shadow-2xl">
          <img src={coverImage} alt={`${book.title} book cover`} className="w-full h-full object-cover" />
          {/* Spine hinge crease */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.55) 1.8%, rgba(255,255,255,0.14) 3.2%, rgba(0,0,0,0.25) 5%, transparent 8%)",
            }}
          />
          {/* Gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 30%, transparent 45%, rgba(0,0,0,0.08) 100%)" }}
          />
        </div>

        {/* Page block (right edge) */}
        <div
          style={{
            ...face,
            width: T,
            height: H - 8,
            top: 4,
            left: W - T / 2,
            transform: "rotateY(90deg)",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.25), transparent 30%, transparent 70%, rgba(0,0,0,0.2)), repeating-linear-gradient(to right, #f7f5ef 0px, #f7f5ef 1px, #d9d6cc 1px, #d9d6cc 2px)",
          }}
        />

        {/* Spine (left edge) */}
        <div style={{ ...face, width: T, height: H, left: -T / 2, transform: "rotateY(-90deg)", background: "#0a0a0a" }} />

        {/* Top edge */}
        <div
          style={{
            ...face,
            width: W - 4,
            height: T,
            top: -T / 2,
            left: 0,
            transform: "rotateX(90deg)",
            background: "repeating-linear-gradient(to bottom, #f7f5ef 0px, #f7f5ef 1px, #d9d6cc 1px, #d9d6cc 2px)",
          }}
        />

        {/* Back cover */}
        <div style={{ ...face, inset: 0, transform: `translateZ(${-T / 2}px) rotateY(180deg)`, background: "#0a0a0a" }} className="rounded-l-[4px]" />
      </div>
    </div>
  );
}

export default function Books() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", organization: "", role: "" });
  const [format, setFormat] = useState<string>(bookFormats[0]);
  const [quantity, setQuantity] = useState("1");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const preorderMutation = useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      return json;
    },
    onSuccess: () => setConfirmedEmail(form.email),
    onError: (err: Error) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = preorderSchema.safeParse({ ...form, format, quantity, consent });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    preorderMutation.mutate(parsed.data);
  };

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

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
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white" asChild data-testid="button-header-preorder">
            <a href="#preorder">Pre-Order</a>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-pink-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1 text-sm" data-testid="badge-books">
              Pre-Orders Open · {book.releaseLabel}
            </Badge>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-background leading-[1.05] mb-4" data-testid="text-books-heading">
              {book.title.replace(" Partner", "")} <span className="text-pink-500">Partner</span>
            </h1>
            <p className="text-xl md:text-2xl text-background/80 font-medium mb-6" data-testid="text-books-subtitle">
              {book.subtitle}
            </p>
            {/* DRAFT description — edit to match the book */}
            <p className="text-lg text-background/70 max-w-xl leading-relaxed mb-10" data-testid="text-books-description">
              Startups move fast, and L&D has to move with them. This is a practical field guide for learning professionals building in high-growth environments — how to earn a seat at the table, tie learning to business outcomes, and build people systems that scale with the company.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white group" asChild data-testid="button-hero-preorder">
                <a href="#preorder">
                  Pre-Order Your Copy
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <span className="flex items-center gap-2 text-background/60 text-sm">
                <CreditCard className="h-4 w-4 text-pink-500" />
                No payment until release
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <BookMockup />
          </motion.div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-4" data-testid="text-inside-title">What's Inside</h2>
            <p className="text-muted-foreground max-w-2xl">
              Written by an L&D leader, startup builder and people partner — for practitioners who want to be a true strategic partner to the business.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Card className="h-full border border-border hover:border-pink-500/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <pillar.icon className="h-7 w-7 text-pink-500 mb-4" aria-hidden="true" />
                    <h3 className="font-semibold mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order */}
      <section id="preorder" className="py-24 bg-foreground text-background px-6 relative overflow-hidden" style={{ scrollMarginTop: "88px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-preorder-title">
              Reserve your <span className="text-pink-500">copy</span>
            </h2>
            <p className="text-background/70 leading-relaxed mb-8">
              Join the pre-order list and you'll be first in line when the book is released. You'll receive a confirmation email right away.
            </p>
            <ul className="flex flex-col gap-4 text-sm text-background/80">
              <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 shrink-0" />No payment is taken today</li>
              <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 shrink-0" />Early access before general release</li>
              <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-pink-500 shrink-0" />Team and bulk orders welcome</li>
            </ul>
          </div>

          <Card className="md:col-span-3 border border-border/20">
            <CardContent className="p-8">
              {confirmedEmail ? (
                <div className="text-center py-8" data-testid="text-preorder-success">
                  <CheckCircle2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">You're on the list</h3>
                  <p className="text-muted-foreground">
                    Your pre-order is reserved. A confirmation has been sent to <strong className="text-foreground">{confirmedEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="firstName">First name *</Label>
                      <Input id="firstName" autoComplete="given-name" value={form.firstName} onChange={update("firstName")} data-testid="input-first-name" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input id="lastName" autoComplete="family-name" value={form.lastName} onChange={update("lastName")} data-testid="input-last-name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} data-testid="input-email" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" autoComplete="organization" value={form.organization} onChange={update("organization")} data-testid="input-organization" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="role">Job title</Label>
                      <Input id="role" autoComplete="organization-title" value={form.role} onChange={update("role")} data-testid="input-role" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 items-end">
                    <fieldset className="col-span-2 flex flex-col gap-1.5">
                      <legend className="text-sm font-medium leading-none mb-1.5">Format *</legend>
                      <div className="flex gap-2">
                        {bookFormats.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFormat(f)}
                            aria-pressed={format === f}
                            className={`flex-1 h-9 rounded-md border text-sm transition-colors ${format === f ? "border-pink-500 bg-pink-500/10 text-pink-600 font-medium" : "border-input hover:border-pink-500/50"}`}
                            data-testid={`button-format-${f.toLowerCase()}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input id="quantity" type="number" min={1} max={100} value={quantity} onChange={(e) => setQuantity(e.target.value)} data-testid="input-quantity" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(v) => setConsent(v === true)}
                      className="mt-0.5 border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:text-white"
                      data-testid="checkbox-consent"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal text-muted-foreground leading-snug cursor-pointer">
                      I agree to be contacted by email about my pre-order and the book's release.
                    </Label>
                  </div>
                  {error && <p className="text-sm text-destructive" role="alert" data-testid="text-preorder-error">{error}</p>}
                  <Button type="submit" size="lg" className="bg-pink-500 hover:bg-pink-600 text-white group" disabled={preorderMutation.isPending} data-testid="button-submit-preorder">
                    {preorderMutation.isPending ? "Reserving…" : "Pre-Order Now"}
                    {!preorderMutation.isPending && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> {book.title} by {book.author}
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p data-testid="text-books-footer">&copy; {new Date().getFullYear()} Shawny Hargrove</p>
      </footer>
    </div>
  );
}
