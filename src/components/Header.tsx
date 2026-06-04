/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { LayoutDashboard, Instagram, FileText, Sparkles, LogOut, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentMode: "public" | "admin";
  setMode: (mode: "public" | "admin") => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ currentMode, setMode, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav points for the public view
  const navItems = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Pillars", target: "pillars" },
    { label: "Portfolio", target: "portfolio" },
    { label: "Audit & Hacks", target: "audit" },
    { label: "Media Kit", target: "mediakit" },
    { label: "Newsletter", target: "newsletter" },
    { label: "FAQ & Contact", target: "contact" },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (currentMode !== "public") {
      setMode("public");
      setTimeout(() => {
        scrollToSection(target);
      }, 100);
    } else {
      scrollToSection(target);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-brand-blush/15 px-4 lg:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logotype */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex flex-col items-start cursor-pointer text-left group"
          id="logo-button"
        >
          <span className="font-serif text-lg lg:text-xl font-bold tracking-wider text-brand-dark group-hover:text-brand-rose transition-colors uppercase">
            BLUSH <span className="font-light italic text-brand-rose">With</span> RAKHEE
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-rose/80 uppercase font-medium">
            CREATOR OS & BEAUTY BRAND
          </span>
        </button>

        {/* Desktop Navigation */}
        {currentMode === "public" ? (
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="font-sans text-xs tracking-wide font-medium text-brand-dark/75 hover:text-brand-rose hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative py-1 group"
                id={`nav-${item.target}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-rose group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>
        ) : (
          <div className="hidden xl:flex items-center space-x-3 bg-brand-sand/50 px-3 py-1.5 rounded-full border border-brand-blush/20">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
            <span className="font-mono text-xs text-brand-rose font-medium uppercase tracking-wider">
              Creator Operating System: Active Session
            </span>
          </div>
        )}

        {/* Mode Switch & Primary Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => {
              setMode(currentMode === "public" ? "admin" : "public");
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
              currentMode === "admin"
                ? "bg-brand-dark text-white border-brand-dark hover:bg-brand-rose hover:border-brand-rose"
                : "bg-brand-sand/70 text-brand-rose border-brand-blush/30 hover:bg-brand-blush/20"
            }`}
            id="mode-switch-desktop"
          >
            {currentMode === "admin" ? (
              <>
                <LogOut size={13} />
                <span>Exit OS Dashboard</span>
              </>
            ) : (
              <>
                <LayoutDashboard size={13} />
                <span>Creator OS Portal</span>
              </>
            )}
          </button>

          {currentMode === "public" ? (
            <button
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-1.5 bg-brand-rose text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-dark shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              id="cta-work-with-me"
            >
              <span>Work With Me</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => {
                setMode("public");
                setTimeout(() => scrollToSection("home"), 100);
              }}
              className="flex items-center gap-1.5 bg-brand-rose text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-dark shadow-sm transition-all cursor-pointer"
              id="cta-back-public"
            >
              <span>View Brand Site</span>
            </button>
          )}
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex items-center gap-2 xl:hidden">
          {/* Mode switch for mobile screens */}
          <button
            onClick={() => setMode(currentMode === "public" ? "admin" : "public")}
            className="flex items-center justify-center p-2 rounded-full bg-brand-sand/60 text-brand-rose border border-brand-blush/20 hover:bg-brand-blush/20 transition-all"
            title={currentMode === "admin" ? "Switch to Public Brand View" : "Open Creator OS Portal"}
            id="mode-switch-mobile"
          >
            <LayoutDashboard size={16} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-dark hover:text-brand-rose transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 px-2 py-4 rounded-2xl bg-white/95 border border-brand-blush/20 shadow-xl space-y-4 animate-fadeIn">
          {currentMode === "public" && (
            <div className="grid grid-cols-2 gap-2 text-center pb-2 border-b border-brand-blush/10">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className="py-2.5 px-3 rounded-lg text-xs font-medium text-brand-dark/80 hover:bg-brand-sand/50 hover:text-brand-rose transition-all text-left"
                  id={`mobile-nav-${item.target}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {currentMode === "admin" && (
            <div className="bg-brand-sand/40 p-3 rounded-xl border border-brand-blush/20 mb-2">
              <p className="font-mono text-[10px] text-brand-rose font-bold uppercase tracking-wider">
                Operating System Active
              </p>
              <p className="text-xs text-brand-dark/70 mt-1">
                You are currently inside the private dashboard, viewing CRM pipelines, lead acquisitions, and analytics.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setMode(currentMode === "public" ? "admin" : "public");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold tracking-wider border border-brand-dark/20 text-brand-dark hover:bg-brand-sand transition-all"
              id="mobile-drawer-mode-switch"
            >
              {currentMode === "admin" ? (
                <>
                  <LogOut size={14} />
                  <span>Exit Dashboard Portal</span>
                </>
              ) : (
                <>
                  <LayoutDashboard size={14} />
                  <span>Launch Creator OS Portal</span>
                </>
              )}
            </button>

            {currentMode === "public" && (
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full py-3 rounded-xl bg-brand-rose text-white text-xs font-bold uppercase tracking-wider text-center"
                id="mobile-drawer-cta"
              >
                Work With Me
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
