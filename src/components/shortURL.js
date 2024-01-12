import { motion } from "framer-motion";

export default function ShortURL({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-[300px] py-4 px-2 mt-4 rounded-xl text-white drop-shadow-lg">
        <div className="text-center mx-2 py-2 rounded-lg">
          <div className="font-semibold text-[1.5em]">
            Your <span className="text-cyan-100">TinyClicks URL</span> is:
          </div>
          <a href={children} target="_blank" className="text-cyan-100">
            {children}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
