
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Calendar, BookOpen, Heart, Home } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Nutrition Guides', href: '/guides', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Meal Plans', href: '/meal-plans', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Wellness Tips', href: '/wellness', icon: <Heart className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-sage-100">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-sage-500 to-sage-700 bg-clip-text text-transparent font-poppins">
              NourishMama
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-sage-700 hover:text-sage-900 font-medium flex items-center space-x-1"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center space-x-1 text-sage-700 hover:text-sage-900">
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </Button>
            <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
              Start Your Plan
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-sage-900" />
              ) : (
                <Menu className="h-6 w-6 text-sage-900" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-sage-50 text-sage-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
                  Start Your Plan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
