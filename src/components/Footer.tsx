import demencarelogo from "@/assets/demencare-logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={demencarelogo} alt="DEMENCARE Logo" className="h-16 w-auto" />
          </div>
          
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>© 2025 DEMENCARE. All rights reserved.</p>
            <p className="mt-1">Empowering early diagnosis through AI innovation</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
