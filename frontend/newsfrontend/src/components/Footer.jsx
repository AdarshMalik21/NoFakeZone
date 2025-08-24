import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">NoFakeZone</h2>
          <p className="mt-2 text-sm text-gray-400">
            Detect fake news instantly and stay informed with reliable sources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-blue-500"><Facebook /></a>
            <a href="#" className="hover:text-sky-400"><Twitter /></a>
            <a href="#" className="hover:text-pink-500"><Instagram /></a>
            <a href="#" className="hover:text-blue-600"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NoFakeZone. All rights reserved.
      </div>
    </footer>
  );
}
