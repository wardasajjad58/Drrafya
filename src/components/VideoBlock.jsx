import { motion } from "framer-motion";
import introVideo from "../assets/intro.mp4";

export default function VideoBlock() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl overflow-hidden border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.10)] bg-black/5"
        >
          <video src={introVideo} controls className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
}
