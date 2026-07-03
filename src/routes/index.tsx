import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SkillBar } from "../components/SkillBar";
import { SkillTag } from "../components/SkillTag";
import { SectionCard } from "../components/SectionCard";
import { ThemeToggle } from "../components/ThemeToggle";
import heroBg from "../assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shabanu Aliahmad — Skill Growth Tracker" },
      {
        name: "description",
        content:
          "Personal skill growth tracker for Shabanu Aliahmad — programmer, coder, and creative storyteller.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shabanu Aliahmad",
          url: "https://skill-canvas-charm.lovable.app/",
          description:
            "Learning professional programmer, coder and website creator tracking her skill growth.",
          knowsAbout: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "Java",
            "Canva",
            "Website Creation",
            "UI/UX Design",
            "AI Tools",
          ],
        }),
      },
    ],
  }),
});

const languages = ["HTML", "CSS", "JavaScript", "Python", "Java"];

// Skills auto-progress: +1% twice per week (every ~3.5 days), capped at 100%.
// Anchor date is when the tracker was set up; adjust as time passes.
const START_DATE = new Date("2026-07-03T00:00:00Z").getTime();
const HALF_WEEK_MS = 3.5 * 24 * 60 * 60 * 1000;

function computeLevel(startLevel: number): number {
  const elapsed = Date.now() - START_DATE;
  const increments = Math.max(0, Math.floor(elapsed / HALF_WEEK_MS));
  return Math.min(100, startLevel + increments);
}

const skills = [
  { name: "Coding", startLevel: 72 },
  { name: "Creating Stories", startLevel: 65 },
  { name: "Designing", startLevel: 60 },
  { name: "Canva", startLevel: 80 },
  { name: "Website Creation", startLevel: 68 },
];

const learningGoals = [
  { icon: "🎨", label: "UI / UX Design", desc: "Crafting beautiful, user-centred interfaces" },
  { icon: "🤖", label: "AI Tools", desc: "Exploring artificial intelligence platforms" },
  { icon: "🧠", label: "Advanced AI Skills", desc: "Building deeper AI expertise" },
];

const iconHover =
  "inline-block transition-transform duration-300 hover:scale-125 hover:-rotate-6 cursor-default";

function Index() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <ThemeToggle />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-20"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-24 text-center md:pt-32 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Skill Growth Tracker
              </p>
              <h1 className="text-4xl font-bold leading-tight text-old-pink md:text-5xl lg:text-6xl">
                Shabanu Aliahmad — Skill Growth Tracker
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Learning professional programmer, coder &amp; website creator — fuelled by curiosity and a love for elegant design.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {languages.map((lang, i) => (
                <SkillTag key={lang} label={lang} delay={0.1 * i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <div className="mx-auto max-w-4xl space-y-8 px-6 pb-24">
          <SectionCard title="What I'm Good At" icon="✨" delay={0.1}>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className={`mt-1 text-primary ${iconHover}`}>▸</span>
                I love learning languages — HTML, CSS, JavaScript, Python &amp; Java
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1 text-primary ${iconHover}`}>▸</span>
                Quite skilled in Canva for visual storytelling
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1 text-primary ${iconHover}`}>▸</span>
                I enjoy creating websites from scratch
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="My Skills" icon="📊" delay={0.2}>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={computeLevel(skill.startLevel)}
                  delay={0.15 * i}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Auto-tracks growth: +1% twice a week until 100%.
            </p>
          </SectionCard>

          <SectionCard title="What I Want to Learn" icon="🚀" delay={0.3}>
            <div className="grid gap-4 sm:grid-cols-3">
              {learningGoals.map((goal, i) => (
                <motion.div
                  key={goal.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="group rounded-xl border border-border bg-muted/40 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-accent/60 hover:shadow-xl cursor-pointer"
                >
                  <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                    {goal.icon}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">{goal.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{goal.desc}</p>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Where I Want to Be in 1 Year" icon="🎯" delay={0.4}>
            <div className="rounded-xl bg-accent/50 p-6">
              <p className="text-foreground leading-relaxed">
                In one year I want to <strong>develop my AI skills</strong> and master new tools — it's both my passion and my hobby. I'd love to <strong>create visual stories</strong> that captivate people, and take my <strong>writing</strong> to the next level. The journey of learning never stops, and that's what makes it exciting.
              </p>
            </div>
          </SectionCard>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-8 text-center"
          >
            <p
              className="text-2xl font-semibold text-old-pink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Every line of code is a step closer to the creator I'm becoming."
            </p>
            <p className="mt-3 text-sm text-muted-foreground">— Shabanu Aliahmad</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
