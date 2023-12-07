import { motion } from "framer-motion";

export default function ShortURL({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-[300px] py-4 px-2 mt-4 rounded-xl">
        <div className="text-center mx-2 py-2 rounded-lg">
          <div className="font-semibold text-[1.5em]">
            Your TinyClicks URL is:
          </div>
          <a href={children} target="_blank">
            {children}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
