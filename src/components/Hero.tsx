import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBrain from "@/assets/hero-brain.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      {/* Hero image overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img 
          src={heroBrain} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Brain className="w-4 h-4" />
              AI-Powered Early Detection
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Detecting Dementia
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Before It's Too Late
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A comprehensive AI tool combining accessible public screening with 98% accurate clinical diagnosis. 
              Early detection saves lives and preserves quality of life for millions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => navigate("/screening")}
              >
                Start Screening
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/clinical")}>
                <Stethoscope className="w-5 h-5" />
                For Healthcare Professionals
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Clinical Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">2-Layer</div>
                <div className="text-sm text-muted-foreground">System Approach</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">Multi</div>
                <div className="text-sm text-muted-foreground">Language Support</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroBrain} 
                alt="AI-powered brain analysis visualization" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">Early Detection Matters</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Timely diagnosis improves patient outcomes by up to 70%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
