import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, TrendingUp, AlertCircle, Home, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  // Simulated results - in real app, this would be calculated from answers
  const riskScore = 25; // Low risk score (0-100, lower is better)
  const riskLevel = riskScore < 30 ? "Low" : riskScore < 60 ? "Moderate" : "High";
  const riskColor = riskScore < 30 ? "text-secondary" : riskScore < 60 ? "text-accent" : "text-destructive";
  const riskBg = riskScore < 30 ? "bg-secondary/10" : riskScore < 60 ? "bg-accent/10" : "bg-destructive/10";

  const categoryScores = [
    { name: "Memory", score: 85, maxScore: 100, icon: Brain },
    { name: "Problem Solving", score: 90, maxScore: 100, icon: TrendingUp },
    { name: "Speech Patterns", score: 88, maxScore: 100, icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${riskBg} ${riskColor} text-sm font-medium mb-4`}>
            {riskLevel === "Low" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {riskLevel} Risk Level
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your responses, here's your comprehensive cognitive health assessment
          </p>
        </div>

        {/* Overall Risk Score */}
        <Card className="border-2 mb-8">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div>
                <div className="text-6xl font-bold mb-2">
                  <span className={riskColor}>{riskScore}</span>
                  <span className="text-muted-foreground text-3xl">/100</span>
                </div>
                <div className="text-xl font-semibold text-muted-foreground">Overall Risk Score</div>
              </div>

              <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full ${riskScore < 30 ? "bg-secondary" : riskScore < 60 ? "bg-accent" : "bg-destructive"} transition-all`}
                  style={{ width: `${100 - riskScore}%` }}
                />
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                {riskLevel === "Low" ? (
                  "Your assessment indicates normal cognitive function. Continue maintaining healthy lifestyle habits and consider annual screenings."
                ) : riskLevel === "Moderate" ? (
                  "Your results suggest some areas that may benefit from attention. We recommend consulting with a healthcare professional for a clinical evaluation."
                ) : (
                  "Your assessment indicates concerning patterns. We strongly recommend scheduling a clinical evaluation with a healthcare professional as soon as possible."
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Performance by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categoryScores.map((category, idx) => {
              const Icon = category.icon;
              const percentage = (category.score / category.maxScore) * 100;
              return (
                <Card key={idx} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-2xl font-bold text-primary">
                          {category.score}/{category.maxScore}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="border-2 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-7 h-7 text-primary" />
              Recommended Next Steps
            </h2>
            
            <div className="space-y-4">
              {riskLevel === "Low" ? (
                <>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Continue Healthy Habits</div>
                      <div className="text-sm text-muted-foreground">Maintain regular exercise, balanced diet, and mental stimulation</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Annual Screening</div>
                      <div className="text-sm text-muted-foreground">Consider repeating this assessment annually as a preventive measure</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Stay Informed</div>
                      <div className="text-sm text-muted-foreground">Keep learning about cognitive health and early warning signs</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Clinical Evaluation</div>
                      <div className="text-sm text-muted-foreground">Schedule an appointment with a healthcare professional for comprehensive testing</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Brain Scan Analysis</div>
                      <div className="text-sm text-muted-foreground">Our Layer 2 clinical model can analyze brain scans with 98% accuracy</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Early Intervention</div>
                      <div className="text-sm text-muted-foreground">Early detection significantly improves treatment outcomes</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={() => navigate("/")}>
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
          <Button variant="outline" size="lg">
            <FileText className="w-5 h-5 mr-2" />
            Download Results PDF
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          This screening tool provides an initial assessment but is not a diagnostic tool. 
          Always consult with qualified healthcare professionals for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default Results;
