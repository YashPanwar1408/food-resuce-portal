import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let hideTimeout;
   
  const {user,signOut}=useAuth();
  const handleLogout = () => {
    signOut();
  };
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container-custom flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-primary rounded-md p-1">
              <span className="text-white font-bold text-xl">FR</span>
            </span>
            <span className="font-medium hidden sm:inline-block text-lg">
              <span>Food</span>
              <span className="text-primary">Rescue</span>
              <span>Connect</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="space-x-6 flex items-center">
  <Link to="/" className="text-foreground hover:text-primary transition-colors">
    Home
  </Link>

  

  <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
    How It Works
  </Link>
</div>

          <div className="flex items-center space-x-3">
            {user ? (
              <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
            
             
            <Link to="/donate">
              <Button variant="ghost" className="text-primary">Donate Us</Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="flex flex-col space-y-3 pt-2 pb-3">
            <Link 
              to="/" 
              className="px-3 py-2 text-foreground hover:text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-3 py-2 text-foreground hover:text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>

            <div className="pt-4 flex flex-col space-y-3">
              <div className="px-3">
              
              </div>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
              <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-primary">Donate Us</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export { Layout };
