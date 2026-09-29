import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
// import Events from "@/pages/events"; // hidden for now
import Books from "@/pages/books";
import CourseSamples from "@/pages/course-samples";
import Skills from "@/pages/skills";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/courses" component={Courses}/>
      {/* <Route path="/events" component={Events}/> — hidden for now */}
      <Route path="/books" component={Books}/>
      <Route path="/course-samples" component={CourseSamples}/>
      <Route path="/skills" component={Skills}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
