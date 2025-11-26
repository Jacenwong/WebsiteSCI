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
    // Add a small delay to ensure DOM is ready (helps with GitHub Pages deployment)
    const initTimeout = setTimeout(() => {
      const handleScroll = () => {
        try {
          // Robust null checking
          if (!containerRef?.current) return;

          const container = containerRef.current;
          const containerRect = container.getBoundingClientRect();
          if (!containerRect) return;

          const containerTop = containerRect.top;

          let currentId: string | null = null;
          navItems.forEach((item) => {
            try {
              const el = document.getElementById(item.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect) {
                  const offsetTop = rect.top - containerTop;
                  if (offsetTop <= 80 && offsetTop + rect.height >= 80) {
                    currentId = item.id;
                  }
                }
              }
            } catch (error) {
              // Silently handle errors for individual items
              console.warn(`Error checking nav item ${item.id}:`, error);
            }
          });

          if (currentId) setLastActiveId(currentId); // Remember last valid section
          setActiveId(currentId);
        } catch (error) {
          // Gracefully handle any scroll tracking errors
          console.warn("Error in scroll handler:", error);
        }
      };

      const container = containerRef?.current;
      if (container) {
        container.addEventListener("scroll", handleScroll, { passive: true });
        // Initial check with a small delay to ensure sections are rendered
        setTimeout(() => handleScroll(), 100);
        
        return () => {
          if (container) {
            container.removeEventListener("scroll", handleScroll);
          }
        };
      }
    }, 50); // Small initialization delay

    return () => {
      clearTimeout(initTimeout);
    };
  }, [containerRef]);

  // Update highlight box position
  useEffect(() => {
    try {
      const idToUse = activeId || lastActiveId; // Use lastActiveId if no current active
      if (!navRef?.current || !idToUse) return;

      const links = Array.from(navRef.current.querySelectorAll<HTMLAnchorElement>("a"));
      if (!links || links.length === 0) return;

      const activeLink = links.find((link) => {
        try {
          return link.getAttribute("href") === `#${idToUse}`;
        } catch {
          return false;
        }
      });

      if (activeLink) {
        try {
          const rect = activeLink.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          
          if (rect && navRect) {
            setHighlightStyle({
              left: rect.left - navRect.left,
              top: rect.top - navRect.top,
              width: rect.width,
              height: rect.height,
            });
          }
        } catch (error) {
          console.warn("Error calculating highlight position:", error);
        }
      }
    } catch (error) {
      // Gracefully handle highlight calculation errors
      console.warn("Error updating highlight:", error);
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
            {lastActiveId && highlightStyle.width > 0 && highlightStyle.height > 0 && (
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
                  try {
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  } catch (error) {
                    console.warn(`Error scrolling to ${item.id}:`, error);
                  }
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
