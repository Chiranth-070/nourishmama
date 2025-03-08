
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-sage-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white font-poppins">NourishMama</h3>
            <p className="text-sage-100">
              Personalized nutrition guides for women at every life stage. Empowering women to nourish their bodies with science-backed nutrition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-peach-200 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-peach-200 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-peach-200 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Life Stages</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Adolescence</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Young Adulthood</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Pregnancy & Postpartum</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Perimenopause & Menopause</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Senior Women</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Nutrition Guides</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Recipe Database</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Nutrition Calculator</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-sage-200 hover:text-white transition-colors">Expert Articles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sage-200 mb-4">Get weekly nutrition tips, recipes, and wellness advice tailored to your life stage.</p>
            <div className="space-y-2">
              <div className="flex">
                <Input 
                  placeholder="Your email address" 
                  className="rounded-r-none bg-sage-700 border-sage-600 text-white placeholder:text-sage-300 focus:border-peach-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-l-none bg-peach-500 hover:bg-peach-600 border-0">Subscribe</Button>
              </div>
              <p className="text-xs text-sage-300">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sage-300 text-sm">
            &copy; {new Date().getFullYear()} NourishMama. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sage-300 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-sage-300 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-sage-300 hover:text-white text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
