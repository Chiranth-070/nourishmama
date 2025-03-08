
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom text-center">
          <h1 className="text-9xl font-bold text-sage-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-sage-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-sage-600 max-w-md mx-auto mb-8">
            Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
