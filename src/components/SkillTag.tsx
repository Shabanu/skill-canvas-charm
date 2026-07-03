import { motion } from "framer-motion";

interface SkillTagProps {
  label: string;
  delay?: number;
}

export function SkillTag({ label, delay = 0 }: SkillTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg cursor-default"
    >
      {label}
    </motion.span>
  );
}
