import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, TrendingUp, Shield } from "lucide-react";

const Impact = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Early Intervention",
      description: "Timely detection enables treatment when it's most effective, significantly improving patient outcomes and quality of life.",
      stat: "70%",
      statLabel: "Better Outcomes"
    },
    {
      icon: Users,
      title: "Accessible Screening",
      description: "User-friendly public interface removes barriers to initial assessment, reaching communities in multiple languages.",
      stat: "Multi",
      statLabel: "Language Support"
    },
    {
      icon: TrendingUp,
      title: "Clinical Precision",
      description: "98% accurate deep learning model provides healthcare professionals with reliable diagnostic support.",
      stat: "98%",
      statLabel: "Accuracy"
    },
    {
      icon: Shield,
      title: "Comprehensive Care",
      description: "Two-layer system ensures thorough evaluation from initial screening to clinical confirmation.",
      stat: "2-Layer",
      statLabel: "Validation"
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Making a Real
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            By bridging early screening with clinical diagnosis, we're transforming dementia care and saving lives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                    <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Impact;
