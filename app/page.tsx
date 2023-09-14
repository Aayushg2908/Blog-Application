import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";

export default function Home() {
  return (
    <div className="h-full">
      <LandingHero />
      <LandingContent />
    </div>
  );
}
