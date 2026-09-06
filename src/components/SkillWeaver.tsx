import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { useWeavedProjects, type Project, type Status } from "../lib/weavedProjects";

const SKILLS = ["Coding", "Vibe Coding", "Canva", "Designing", "Creating Stories", "Website Creation"];
const GOALS = ["UI / UX Design", "AI Tools", "Advanced AI Skills"];

export function SkillWeaver() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);
  const [goal, setGoal] = useState<string | null>(null);
  const [projects, setProjects] = useWeavedProjects();

  const toggleSkill = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const canWeave = selected.length > 0 && goal !== null;

  const weave = () => {
    if (!canWeave || !goal) return;
    setProjects((p) => [{ id: Date.now(), skills: selected, goal, status: "idea" }, ...p]);
    setSelected([]);
    setGoal(null);
  };

  const cycleStatus = (id: number) =>
    setProjects((p) =>
      p.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              status:
                proj.status === "idea" ? "progress" : proj.status === "progress" ? "done" : "idea",
            }
          : proj,
      ),
    );

  const statusLabel = (s: Status) =>
    s === "idea" ? t.statusIdea : s === "progress" ? t.statusProgress : t.statusDone;

  const statusClass = (s: Status) =>
    s === "idea"
      ? "bg-muted text-muted-foreground"
      : s === "progress"
        ? "bg-accent text-accent-foreground"
        : "bg-primary text-primary-foreground";

  const describe = (proj: Project) =>
    t.weave(
      proj.skills.map((s) => t.skills[s] ?? s),
      t.goals[proj.goal] ?? proj.goal,
    );

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{t.weaverIntro}</p>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t.currentSkills}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((s) => {
            const active = selected.includes(s);
            return (
              <motion.button
                key={s}
                onClick={() => toggleSkill(s)}
                aria-pressed={active}
                whileTap={{ scale: 0.94 }}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow"
                    : "border-border bg-card text-foreground hover:border-primary"
                }`}
              >
                {t.skills[s] ?? s}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          animate={{ opacity: canWeave ? 1 : 0.3, height: 28 }}
          className="w-px bg-gradient-to-b from-transparent via-primary to-transparent"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t.futureGoal}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {GOALS.map((g) => {
            const active = goal === g;
            return (
              <motion.button
                key={g}
                onClick={() => setGoal(active ? null : g)}
                aria-pressed={active}
                whileTap={{ scale: 0.97 }}
                className={`rounded-xl border p-4 text-left text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  active
                    ? "border-primary bg-accent/70 text-foreground shadow"
                    : "border-border bg-muted/40 text-foreground hover:border-primary"
                }`}
              >
                {t.goals[g] ?? g}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.button
          onClick={weave}
          disabled={!canWeave}
          whileTap={canWeave ? { scale: 0.96 } : undefined}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
          {t.weaveProject}
        </motion.button>
        {!canWeave && <p className="text-xs text-muted-foreground">{t.selectHint}</p>}
      </div>

      <div className="pt-2">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t.weavedProjects}
        </h3>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.emptyProjects}</p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {projects.map((proj) => (
                <motion.li
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-border bg-muted/40 p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-relaxed text-foreground">{describe(proj)}</p>
                    <button
                      onClick={() => setProjects((p) => p.filter((x) => x.id !== proj.id))}
                      aria-label={t.remove}
                      className="shrink-0 rounded-full p-1 text-muted-foreground transition-all duration-300 hover:scale-125 hover:rotate-90 hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => cycleStatus(proj.id)}
                    className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 hover:scale-110 ${statusClass(proj.status)}`}
                  >
                    {statusLabel(proj.status)}
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
