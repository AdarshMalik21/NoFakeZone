// src/components/NewsCard.jsx
import { motion } from "framer-motion";

export default function NewsCard({ title, description, image, link }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
          whileHover={{ scale: 1.1, boxShadow: "0px 6px 20px rgba(59,130,246,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Read More →
        </motion.a>
      </div>
    </motion.div>
  );
}
