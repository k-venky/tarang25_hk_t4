
import { cn } from "@/lib/utils";
import { Home, ActivitySquare, BarChart, BookOpen, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface NavBarProps {
  currentPath: string;
}

const NavBar = ({
  currentPath
}: NavBarProps) => {
  const navItems = [{
    icon: <Home className="h-6 w-6" />,
    label: "Home",
    path: "/dashboard"
  }, {
    icon: <ActivitySquare className="h-6 w-6" />,
    label: "Exercises",
    path: "/exercises"
  }, {
    icon: <BarChart className="h-6 w-6" />,
    label: "Progress",
    path: "/progress"
  }, {
    icon: <BookOpen className="h-6 w-6" />,
    label: "Guides",
    path: "/guides"
  }];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t p-2 flex justify-around z-30 bg-zinc-50/95">
      {navItems.map(item => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={cn(
            "nav-item transition-all duration-300 hover:scale-110",
            currentPath === item.path ? 
              "active text-indigo-600 bg-indigo-50 animate-pulse-glow" : 
              "text-gray-500 hover:text-indigo-500"
          )}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
