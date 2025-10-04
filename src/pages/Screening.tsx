import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Brain, Gamepad2, Mic, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Screening = () => {
  const navigate = useNavigate();

  const assessments = [
    {
      icon: Brain,
      title: "Memory Assessment",
      description: "Interactive games testing short-term and long-term memory recall",
      duration: "5-7 min",
      color: "text-primary"
    },
    {
      icon: Gamepad2,
      title: "Problem Solving",
      description: "Pattern recognition and logical reasoning challenges",
      duration: "8-10 min",
      color: "text-secondary"
    },
    {
      icon: Mic,
      title: "Speech Analysis",
      description: "Voice pattern and verbal fluency evaluation",
      duration: "3-5 min",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Free Cognitive Screening
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete our comprehensive assessment in 15-20 minutes. Available in multiple languages 
              with results provided immediately.
            </p>
          </div>
        </div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {assessments.map((assessment, index) => {
            const Icon = assessment.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className={`p-3 bg-primary/10 rounded-xl w-fit mb-4 ${assessment.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{assessment.title}</h3>
                  <p className="text-muted-foreground mb-4">{assessment.description}</p>
                  <div className="text-sm font-medium text-primary">
                    Duration: {assessment.duration}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Trophy className="w-4 h-4" />
                Confidential & Secure
              </div>
              
              <h2 className="text-3xl font-bold">
                Ready to Begin Your Assessment?
              </h2>
              
              <p className="text-muted-foreground">
                Your results are private and will help identify if further clinical evaluation is recommended. 
                This screening takes approximately 15-20 minutes to complete.
              </p>

              <div className="pt-4">
                <Button variant="hero" size="lg" className="text-lg px-8">
                  Start Assessment Now
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                No sign-up required • Available in multiple languages • Results provided immediately
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Interactive cognitive games and assessments</li>
                <li>• Speech pattern analysis</li>
                <li>• Memory and problem-solving challenges</li>
                <li>• Immediate risk score and recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">Your Privacy</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All data is encrypted and secure</li>
                <li>• No personal information required to start</li>
                <li>• Results are confidential</li>
                <li>• Optional: Save results for healthcare provider</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Screening;
