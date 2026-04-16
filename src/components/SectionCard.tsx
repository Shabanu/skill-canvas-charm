import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  delay?: number;
}

export function SectionCard({ title, icon, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg">
          {icon}
        </span>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
