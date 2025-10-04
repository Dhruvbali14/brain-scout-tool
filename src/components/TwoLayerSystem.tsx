import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Activity, Brain, CheckCircle } from "lucide-react";
import userScreening from "@/assets/user-screening.jpg";
import clinicalProfessional from "@/assets/clinical-professional.jpg";

const TwoLayerSystem = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            Comprehensive Detection System
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Two Powerful Layers,
            <span className="block bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              One Mission
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Bridging the gap between initial screening and clinical diagnosis with cutting-edge AI technology
          </p>
        </div>

        {/* Layer 1: Public Screening */}
        <div className="mb-12">
          <Card className="overflow-hidden border-2 hover:shadow-xl transition-all">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-secondary font-semibold mb-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-sm">1</span>
                    </div>
                    LAYER ONE
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <Smartphone className="w-8 h-8 text-secondary" />
                    Public Screening Tool
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    An accessible mobile and web application serving as a frontline screening tool. 
                    Engage with cognitive games and assessments designed to analyze memory, problem-solving 
                    skills, and speech patterns.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Cognitive Assessments</div>
                        <div className="text-sm text-muted-foreground">Interactive games testing memory and problem-solving</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Multi-Language Support</div>
                        <div className="text-sm text-muted-foreground">Available in multiple vernacular languages</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Risk Score Generation</div>
                        <div className="text-sm text-muted-foreground">Non-invasive baseline analysis and flagging</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={userScreening} 
                    alt="Person using screening application" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 lg:from-background to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layer 2: Clinical Analysis */}
        <div>
          <Card className="overflow-hidden border-2 hover:shadow-xl transition-all border-primary/20">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto order-2 lg:order-1">
                  <img 
                    src={clinicalProfessional} 
                    alt="Healthcare professional with diagnostic tools" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-background/80 lg:from-background to-transparent" />
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 text-primary font-semibold mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm">2</span>
                    </div>
                    LAYER TWO
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <Brain className="w-8 h-8 text-primary" />
                    Clinical Deep Learning Model
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A high-precision deep learning model with 98% accuracy analyzing clinical brain scans. 
                    This robust diagnostic aid helps medical professionals confirm preliminary findings and 
                    make informed decisions.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">98% Diagnostic Accuracy</div>
                        <div className="text-sm text-muted-foreground">Clinically validated deep learning analysis</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Brain Scan Analysis</div>
                        <div className="text-sm text-muted-foreground">Advanced imaging interpretation for professionals</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Clinical Integration</div>
                        <div className="text-sm text-muted-foreground">Seamless workflow for healthcare providers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connection visual */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-card rounded-full shadow-lg border border-border">
            <div className="flex items-center gap-2 text-secondary">
              <Smartphone className="w-5 h-5" />
              <span className="font-medium">Public Screening</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-secondary to-primary" />
            <div className="flex items-center gap-2 text-primary">
              <Brain className="w-5 h-5" />
              <span className="font-medium">Clinical Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoLayerSystem;
