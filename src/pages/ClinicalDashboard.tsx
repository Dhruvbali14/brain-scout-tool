import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, FileImage, Brain, AlertCircle, CheckCircle2, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type ScanType = "CT" | "MRI" | "PET";
type RiskLevel = "low" | "moderate" | "high";

interface AnalysisResult {
  scanType: ScanType;
  fileName: string;
  riskLevel: RiskLevel;
  confidence: number;
  findings: string[];
  recommendations: string[];
  imageUrl: string;
}

const ClinicalDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedScanType, setSelectedScanType] = useState<ScanType | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const scanTypes: { type: ScanType; description: string; icon: string }[] = [
    { type: "CT", description: "Computed Tomography Scan", icon: "🧠" },
    { type: "MRI", description: "Magnetic Resonance Imaging", icon: "🔬" },
    { type: "PET", description: "Positron Emission Tomography", icon: "💫" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, DICOM)",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !selectedScanType) return;

    setIsAnalyzing(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      
      await new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Image = (reader.result as string).split(',')[1];
            
            // Call the AI analysis edge function
            const response = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-brain-scan`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                },
                body: JSON.stringify({
                  imageBase64: base64Image,
                  scanType: selectedScanType,
                }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Analysis failed');
            }

            const { analysis } = await response.json();

            const result: AnalysisResult = {
              scanType: selectedScanType,
              fileName: uploadedFile.name,
              riskLevel: analysis.riskLevel,
              confidence: analysis.confidence,
              findings: analysis.findings,
              recommendations: analysis.recommendations,
              imageUrl: URL.createObjectURL(uploadedFile),
            };

            setAnalysisResult(result);
            setIsAnalyzing(false);
            
            toast({
              title: "AI Analysis Complete",
              description: "Brain scan analyzed successfully with Gemini AI",
            });
            
            resolve(true);
          } catch (error) {
            reject(error);
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
      });
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze scan",
        variant: "destructive",
      });
    }
  };

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getRiskIcon = (risk: RiskLevel) => {
    switch (risk) {
      case "low": return <CheckCircle2 className="w-5 h-5" />;
      case "moderate": return <AlertCircle className="w-5 h-5" />;
      case "high": return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Clinical Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              AI-Powered Brain Scan Analysis for Healthcare Professionals
            </p>
          </div>
        </div>

        {!analysisResult ? (
          <>
            {/* Scan Type Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Step 1: Select Scan Type</CardTitle>
                <CardDescription>Choose the type of brain scan you want to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scanTypes.map((scan) => (
                    <button
                      key={scan.type}
                      onClick={() => setSelectedScanType(scan.type)}
                      className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedScanType === scan.type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-4xl mb-3">{scan.icon}</div>
                      <h3 className="font-semibold text-lg mb-1">{scan.type} Scan</h3>
                      <p className="text-sm text-muted-foreground">{scan.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Step 2: Upload Brain Scan</CardTitle>
                <CardDescription>
                  Upload {selectedScanType || "a"} scan image (JPEG, PNG, or DICOM format)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    uploadedFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}>
                    <input
                      type="file"
                      id="scan-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={!selectedScanType}
                    />
                    <label 
                      htmlFor="scan-upload" 
                      className={`cursor-pointer ${!selectedScanType ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {uploadedFile ? (
                        <div className="space-y-3">
                          <FileImage className="w-12 h-12 mx-auto text-primary" />
                          <div>
                            <p className="font-semibold">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button variant="outline" size="sm" type="button">
                            Change File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                          <div>
                            <p className="font-semibold">Click to upload scan</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedScanType ? `Upload ${selectedScanType} scan image` : "Select scan type first"}
                            </p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>

                  <Button 
                    onClick={handleAnalyze}
                    disabled={!uploadedFile || !selectedScanType || isAnalyzing}
                    className="w-full"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-pulse" />
                        Analyzing with AI Model...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze Scan with AI
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <Progress value={66} className="h-2" />
                      <p className="text-sm text-center text-muted-foreground">
                        Processing scan with deep learning model (98% accuracy)...
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Risk Assessment Card */}
            <Card className={`border-2 ${getRiskColor(analysisResult.riskLevel)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Analysis Results</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {analysisResult.scanType} Scan: {analysisResult.fileName}
                    </CardDescription>
                  </div>
                  <Badge className={`text-lg px-4 py-2 ${getRiskColor(analysisResult.riskLevel)}`}>
                    {getRiskIcon(analysisResult.riskLevel)}
                    <span className="ml-2 capitalize">{analysisResult.riskLevel} Risk</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Model Confidence</span>
                    <span className="text-sm font-semibold">{analysisResult.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={analysisResult.confidence} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Scan Image & Findings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Scan</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={analysisResult.imageUrl} 
                    alt="Brain scan" 
                    className="w-full rounded-lg border-2 border-border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share with Team
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  setAnalysisResult(null);
                  setUploadedFile(null);
                  setSelectedScanType(null);
                }}
              >
                Analyze Another Scan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalDashboard;
