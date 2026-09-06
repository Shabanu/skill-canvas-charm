import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { useWeavedProjects } from "../lib/weavedProjects";

export function ProjectShowcase() {
  const { t } = useLanguage();
  const [projects] = useWeavedProjects();
  const completed = projects.filter((p) => p.status === "done");

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t.showcaseIntro}</p>
      {completed.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t.showcaseEmpty}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {completed.map((proj) => (
              <motion.li
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group rounded-xl border border-border bg-muted/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm leading-relaxed text-foreground">
                    {t.weave(
                      proj.skills.map((s) => t.skills[s] ?? s),
                      t.goals[proj.goal] ?? proj.goal,
                    )}
                  </p>
                  <BadgeCheck className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {proj.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                    >
                      {t.skills[s] ?? s}
                    </span>
                  ))}
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    {t.statusDone}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
