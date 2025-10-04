import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-bold text-lg">AI Dementia Detection</div>
              <div className="text-sm text-muted-foreground">Early detection, better outcomes</div>
            </div>
          </div>
          
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>© 2025 AI Dementia Detection Tool. All rights reserved.</p>
            <p className="mt-1">Empowering early diagnosis through AI innovation</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
