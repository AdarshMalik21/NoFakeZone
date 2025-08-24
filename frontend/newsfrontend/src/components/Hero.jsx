// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import fakeNewsImg from "../assets/fake_news.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden">
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Detect Fake News <br className="hidden sm:block"/> in Seconds 📰
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-100 max-w-xl mx-auto lg:mx-0">
            Stay informed with verified information. Instantly check the authenticity of any news article and explore trending stories from India and across the world.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/verify"
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-7 py-3 rounded-2xl font-semibold hover:bg-gray-100 hover:scale-105 transition transform shadow-xl"
            >
              <Search className="w-5 h-5" />
              Verify News
            </Link>
            <Link
              to="/india"
              className="px-7 py-3 rounded-2xl border-2 border-white/80 hover:bg-white hover:text-indigo-700 hover:scale-105 font-semibold transition transform shadow-lg"
            >
              Explore Trends
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={fakeNewsImg}
            alt="Fake News Detection Illustration"
            className="w-full max-w-lg drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
