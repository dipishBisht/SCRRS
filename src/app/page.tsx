import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import HeroVisual from "@/components/home/hero/hero-visual";
import TrustCloud from "@/components/home/trust-cloud";
import Department from "@/components/home/department";
import WorkflowSection from "@/components/home/workflow";
import StatPulse from "@/components/home/stat-pulse";
import ImageFeature from "@/components/home/features/image-feature";
import CTA from "@/components/home/cta";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-blue-100">
      <Navbar />
      <div className="pt-24 pb-12 px-6 lg:px-8">
        <Hero />
        <HeroVisual />
      </div>
      
      <TrustCloud />

      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatPulse label="Resolution Rate" value="94.2%" subtext="+2.4% this week" />
            <StatPulse label="Avg. Routing Time" value="1.2s" subtext="Instant automation" />
            <StatPulse label="User Satisfaction" value="4.9/5" subtext="Based on 12k reviews" />
         </div>
         
         <div className="space-y-6">
            <Department />
            <ImageFeature />
         </div>
      </section>

      <WorkflowSection />
      <CTA />
      <Footer />
    </main>
  );
}