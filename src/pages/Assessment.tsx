import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Brain, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  category: "memory" | "problem-solving" | "speech";
  type: "multiple-choice" | "sequence" | "pattern" | "recall";
  question: string;
  options?: string[];
  correctAnswer?: string;
  sequence?: string[];
  image?: string;
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSequence, setShowSequence] = useState(true);
  const [sequenceMemory, setSequenceMemory] = useState<string[]>([]);

  // Sample questions for the assessment
  const questions: Question[] = [
    {
      id: 1,
      category: "memory",
      type: "recall",
      question: "Memorize the following sequence of items. You'll be asked to recall them.",
      sequence: ["Apple", "Chair", "Blue", "Seven", "Garden"]
    },
    {
      id: 2,
      category: "memory",
      type: "multiple-choice",
      question: "Which items were in the previous sequence?",
      options: ["Apple, Chair, Blue", "Orange, Table, Red", "Apple, Door, Green", "Banana, Sofa, Yellow"]
    },
    {
      id: 3,
      category: "problem-solving",
      type: "pattern",
      question: "What comes next in this sequence: 2, 4, 8, 16, ?",
      options: ["20", "24", "32", "64"]
    },
    {
      id: 4,
      category: "problem-solving",
      type: "multiple-choice",
      question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
      options: [
        "All roses fade quickly",
        "Some roses might fade quickly",
        "No roses fade quickly",
        "Only roses fade quickly"
      ]
    },
    {
      id: 5,
      category: "problem-solving",
      type: "pattern",
      question: "Which number doesn't belong: 3, 5, 7, 9, 12, 15",
      options: ["3", "9", "12", "15"]
    },
    {
      id: 6,
      category: "memory",
      type: "multiple-choice",
      question: "What was the FIRST item in the sequence you memorized earlier?",
      options: ["Apple", "Chair", "Blue", "Seven"]
    },
    {
      id: 7,
      category: "problem-solving",
      type: "multiple-choice",
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["0 degrees", "7.5 degrees", "15 degrees", "30 degrees"]
    },
    {
      id: 8,
      category: "speech",
      type: "multiple-choice",
      question: "Choose the word that best completes: 'Hot is to Cold as Day is to ___'",
      options: ["Night", "Sun", "Morning", "Bright"]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = questions[currentQuestion];

  // Handle sequence display for recall questions
  useEffect(() => {
    if (question.type === "recall" && question.sequence) {
      setShowSequence(true);
      const timer = setTimeout(() => setShowSequence(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, question.type, question.sequence]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "memory": return "text-primary";
      case "problem-solving": return "text-secondary";
      case "speech": return "text-accent";
      default: return "text-primary";
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "memory": return "bg-primary/10";
      case "problem-solving": return "bg-secondary/10";
      case "speech": return "bg-accent/10";
      default: return "bg-primary/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/screening")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Assessment
          </Button>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Cognitive Assessment</h1>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-2 mb-6">
          <CardContent className="p-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getCategoryBg(question.category)} ${getCategoryColor(question.category)} text-sm font-medium mb-6 capitalize`}>
              <Brain className="w-4 h-4" />
              {question.category.replace("-", " ")}
            </div>

            <h2 className="text-xl font-semibold mb-8">
              {question.question}
            </h2>

            {/* Sequence Display (for memory questions) */}
            {question.type === "recall" && question.sequence && showSequence && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {question.sequence.map((item, idx) => (
                      <div 
                        key={idx}
                        className="px-6 py-3 bg-card border-2 border-primary rounded-lg text-lg font-semibold animate-pulse"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Memorize these items. They will disappear in a few seconds...
                </p>
              </div>
            )}

            {/* Multiple Choice Options */}
            {question.options && (!showSequence || question.type !== "recall") && (
              <div className="grid gap-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                      answers[currentQuestion] === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {answers[currentQuestion] === option ? (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-base">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Waiting state for sequence memorization */}
            {question.type === "recall" && showSequence && (
              <div className="mt-8 text-center">
                <Button disabled className="opacity-50">
                  Please memorize the sequence...
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {!showSequence && (
            <Button
              variant="default"
              onClick={handleNext}
              disabled={!answers[currentQuestion] && question.type !== "recall"}
              className="min-w-32"
            >
              {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Question Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                idx === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : answers[idx]
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
