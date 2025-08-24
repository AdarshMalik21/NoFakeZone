import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-6 text-center text-white rounded-2xl shadow-2xl mt-12">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Don’t Let Fake News Fool You!
      </motion.h2>

      <motion.p
        className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Verify the authenticity of any news in seconds with our AI-powered Fake News Detection system.  
        Stay informed, stay smart.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition">
          🔍 Try It Now
        </button>

        <button className="px-6 py-3 bg-transparent border-2 border-white font-semibold rounded-xl hover:bg-white hover:text-purple-700 transition">
          📩 Get Updates
        </button>
      </motion.div>
    </section>
  );
}
