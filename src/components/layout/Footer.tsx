const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">FoodRescue Connect</h3>
          <p className="text-gray-600 mt-2 max-w-sm">
            Bridging the gap between food excess and food access to reduce waste and fight hunger.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-primary">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-gray-600 hover:text-primary">Home</a></li>
            <li><a href="/how-it-works" className="text-gray-600 hover:text-primary">How It Works</a></li>
            <li><a href="/about-us" className="text-gray-600 hover:text-primary">About Us</a></li>
            <li><a href="/contact" className="text-gray-600 hover:text-primary">Contact</a></li>
            <li><a href="/faq" className="text-gray-600 hover:text-primary">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        <p>© 2025 FoodRescue Connect. All rights reserved.</p>
        <p>Made with ❤️ for a world without food waste</p>
      </div>
    </footer>
  );
};

export default Footer;
