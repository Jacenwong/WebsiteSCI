import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const navItems = [
  { id: "product", label: "Features" },
  { id: "technology", label: "Technology" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface NavigationProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const Navigation = ({ containerRef }: NavigationProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastActiveId, setLastActiveId] = useState<string | null>(null); // Track last valid section
  const navRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  // Track active section inside the scroll container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;

      let currentId: string | null = null;
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top - containerTop;
          if (offsetTop <= 80 && offsetTop + rect.height >= 80) {
            currentId = item.id;
          }
        }
      });

      if (currentId) setLastActiveId(currentId); // Remember last valid section
      setActiveId(currentId);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  // Update highlight box position
  useEffect(() => {
    const idToUse = activeId || lastActiveId; // Use lastActiveId if no current active
    if (!navRef.current || !idToUse) return;

    const links = Array.from(navRef.current.querySelectorAll<HTMLAnchorElement>("a"));
    const activeLink = links.find((link) => link.getAttribute("href") === `#${idToUse}`);
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setHighlightStyle({
        left: rect.left - navRect.left,
        top: rect.top - navRect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [activeId, lastActiveId]);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -8, backgroundColor: "rgba(255, 240, 220, 0.35)" }}
          animate={{ opacity: 1, y: 0, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="
            pointer-events-auto
            flex items-center justify-between h-16
            backdrop-blur-xl
            border border-white/20
            shadow-lg
            rounded-xl
            px-6
            relative
          "
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Logo size="xl" className="text-foreground" />
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            ref={navRef}
            className="hidden md:flex items-center space-x-6 relative"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {/* Glass Box Highlight */}
            {lastActiveId && (
              <motion.div
                className="absolute rounded-xl pointer-events-none"
                style={{
                  left: highlightStyle.left - 6,
                  top: highlightStyle.top - 4,
                  width: highlightStyle.width + 12,
                  height: highlightStyle.height + 8,
                }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className="w-full h-full
                             bg-white/5
                             backdrop-blur-md
                             border border-white/30
                             rounded-xl
                             shadow-[inset_0_2px_6px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(255,255,255,0.1)]"
                />
              </motion.div>
            )}

            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted-foreground hover:text-primary transition-colors relative z-10 px-3 py-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden flex items-center space-x-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Button variant="ghost" size="sm">
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className="block w-4 h-0.5 bg-foreground mb-1"></span>
                <span className="block w-4 h-0.5 bg-foreground mb-1"></span>
                <span className="block w-4 h-0.5 bg-foreground"></span>
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
};
