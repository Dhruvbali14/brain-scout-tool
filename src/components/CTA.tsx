import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-1">
          <div className="bg-card rounded-[calc(1.5rem-1px)] p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join us in the fight against late-stage dementia diagnosis. Whether you're seeking screening 
                or a healthcare professional looking for diagnostic tools, we're here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group"
                  onClick={() => navigate("/screening")}
                >
                  Start Free Screening
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Stethoscope className="w-5 h-5" />
                  Healthcare Professional Access
                </Button>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-8 border-t border-border">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">55M+</div>
                  <div className="text-sm text-muted-foreground mt-1">People with dementia worldwide</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">75%</div>
                  <div className="text-sm text-muted-foreground mt-1">Remain undiagnosed globally</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Early</div>
                  <div className="text-sm text-muted-foreground mt-1">Detection saves lives</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
