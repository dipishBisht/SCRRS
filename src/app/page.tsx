import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import TrustStats from "@/components/home/trust-stats";
import Testimonials from "@/components/home/testimonials";
import CTA from "@/components/home/cta";
import Footer from "@/components/home/footer";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import Preview from "@/components/home/preview";
import Benefits from "@/components/home/benefits";
import { checkIsAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();
  
  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <main>
        <Hero />
        <TrustStats />
        <Features />
        <HowItWorks />
        <Preview />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
