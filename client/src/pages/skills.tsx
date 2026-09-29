import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { skills, skillRequestSchema } from "@shared/skills";
import logoImage from "@assets/SH_logo_pink.png";

export default function Skills() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", organization: "", role: "" });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const toggleSkill = (id: string, checked: boolean) =>
    setSelectedIds((ids) => (checked ? [...ids, id] : ids.filter((i) => i !== id)));

  const requestMutation = useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch("/api/skill-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      return json;
    },
    onSuccess: () => setSentTo(form.email),
    onError: (err: Error) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = skillRequestSchema.safeParse({ ...form, skillIds: selectedIds, consent });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    requestMutation.mutate(parsed.data);
  };

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-foreground text-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-border/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-home-skills">
            <img src={logoImage} alt="SH Logo" className="h-14 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-background/70 hover:text-pink-500 transition-colors" data-testid="link-back-home-skills">
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
              Free Download
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight mb-6" data-testid="text-skills-heading">
              Downloadable <span className="text-pink-500">Skill.md's</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl leading-relaxed mb-10">
              Ready-to-use instruction files that teach your AI assistant how to handle real L&D work. Choose the skills you want and they'll be delivered straight to your inbox.
            </p>
            <div className="flex items-center gap-2 text-background/60 text-sm">
              <Mail className="h-4 w-4 text-pink-500" />
              <span>Delivered by email as .md attachments</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background text-foreground px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Choose your skills</h2>
            <p className="text-muted-foreground mb-8">Select one or more. You can request more at any time.</p>
            <div className="flex flex-col gap-4">
              {skills.map((skill) => {
                const checked = selectedIds.includes(skill.id);
                return (
                  <label key={skill.id} htmlFor={`skill-${skill.id}`} className="cursor-pointer">
                    <Card className={`border transition-all duration-300 ${checked ? "border-pink-500 shadow-lg shadow-pink-500/5" : "border-border hover:border-pink-500/50"}`} data-testid={`card-skill-${skill.id}`}>
                      <CardContent className="p-6 flex gap-4">
                        <Checkbox
                          id={`skill-${skill.id}`}
                          checked={checked}
                          onCheckedChange={(v) => toggleSkill(skill.id, v === true)}
                          disabled={!!sentTo}
                          className="mt-1 border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:text-white"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-pink-500" aria-hidden="true" />
                            <h3 className="text-lg font-semibold">{skill.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{skill.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {skill.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border border-border lg:sticky lg:top-28">
              <CardContent className="p-8">
                {sentTo ? (
                  <div className="text-center py-6" data-testid="text-skill-success">
                    <CheckCircle2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Check your inbox</h3>
                    <p className="text-muted-foreground">
                      Your {selectedIds.length > 1 ? "skills are" : "skill is"} on the way to <strong className="text-foreground">{sentTo}</strong>. If you don't see it within a few minutes, check your spam folder.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">Get your download</h3>
                      <p className="text-sm text-muted-foreground">Tell me a little about yourself and I'll email your selected skills.</p>
                    </div>
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
                      <Label htmlFor="email">Work email *</Label>
                      <Input id="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} data-testid="input-email" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" autoComplete="organization" value={form.organization} onChange={update("organization")} data-testid="input-organization" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="role">Job title</Label>
                      <Input id="role" autoComplete="organization-title" value={form.role} onChange={update("role")} data-testid="input-role" />
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
                        I agree to receive the selected skills by email, and to Shawny Hargrove keeping my details to follow up.
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedIds.length === 0 ? "No skills selected yet." : `${selectedIds.length} skill${selectedIds.length > 1 ? "s" : ""} selected.`}
                    </p>
                    {error && <p className="text-sm text-destructive" role="alert" data-testid="text-skill-error">{error}</p>}
                    <Button type="submit" size="lg" className="bg-pink-500 hover:bg-pink-600 text-white group" disabled={requestMutation.isPending} data-testid="button-send-skills">
                      {requestMutation.isPending ? "Sending…" : "Email Me the Skills"}
                      {!requestMutation.isPending && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-border/20 text-center text-background/50 text-sm">
        <p>&copy; {new Date().getFullYear()} Shawny Hargrove</p>
      </footer>
    </div>
  );
}
