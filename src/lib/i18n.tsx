import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "nl";

export const translations = {
  en: {
    kicker: "Skill Growth Tracker",
    heading: "Shabanu Aliahmad — Skill Growth Tracker",
    intro:
      "Learning professional programmer, coder & website creator — fuelled by curiosity and a love for elegant design.",
    goodAt: "What I'm Good At",
    goodAt1: "I love learning languages — HTML, CSS, JavaScript, Python & Java",
    goodAt2: "Quite skilled in Canva for visual storytelling",
    goodAt3: "I enjoy creating websites from scratch",
    mySkills: "My Skills",
    autoTrack: "Auto-tracks growth: +1% twice a week until 100%.",
    wantToLearn: "What I Want to Learn",
    oneYear: "Where I Want to Be in 1 Year",
    oneYearBody:
      "In one year I want to develop my AI skills and master new tools — it's both my passion and my hobby. I'd love to create visual stories that captivate people, and take my writing to the next level. The journey of learning never stops, and that's what makes it exciting.",
    quote: "\"Every line of code is a step closer to the creator I'm becoming.\"",
    weaverTitle: "The Skill Weaver Matrix",
    weaverIntro:
      "Pick the skills you already have, connect them to a learning goal, and weave a brand-new project idea.",
    currentSkills: "Current Skills",
    futureGoal: "Future Learning Goal",
    weaveProject: "Weave Project",
    weavedProjects: "My Weaved Projects",
    emptyProjects: "No woven projects yet — select some skills and weave your first idea.",
    selectHint: "Select at least one skill and one goal.",
    statusIdea: "Idea",
    statusProgress: "In Progress",
    statusDone: "Completed",
    remove: "Remove project",
    skills: {
      Coding: "Coding",
      "Creating Stories": "Creating Stories",
      Designing: "Designing",
      Canva: "Canva",
      "Website Creation": "Website Creation",
      "Vibe Coding": "Vibe Coding",
    } as Record<string, string>,
    goals: {
      "UI / UX Design": "UI / UX Design",
      "AI Tools": "AI Tools",
      "Advanced AI Skills": "Advanced AI Skills",
    } as Record<string, string>,
    goalDesc: {
      "UI / UX Design": "Crafting beautiful, user-centred interfaces",
      "AI Tools": "Exploring artificial intelligence platforms",
      "Advanced AI Skills": "Building deeper AI expertise",
    } as Record<string, string>,
    weave: (skills: string[], goal: string) =>
      `Build a ${goal} project that combines ${skills.join(" + ")} — use ${skills[0]} as the engine, ${
        skills[1] ?? skills[0]
      } for the creative layer, and ${goal} to make it smart and future-proof.`,
  },
  nl: {
    kicker: "Vaardigheidsgroei Tracker",
    heading: "Shabanu Aliahmad — Vaardigheidsgroei Tracker",
    intro:
      "Leren programmeren, coderen & websites maken — gedreven door nieuwsgierigheid en liefde voor elegant design.",
    goodAt: "Waar ik goed in ben",
    goodAt1: "Ik hou van talen leren — HTML, CSS, JavaScript, Python & Java",
    goodAt2: "Behoorlijk vaardig in Canva voor visuele verhalen",
    goodAt3: "Ik maak graag websites vanaf nul",
    mySkills: "Mijn vaardigheden",
    autoTrack: "Volgt automatisch groei: +1% twee keer per week tot 100%.",
    wantToLearn: "Wat ik wil leren",
    oneYear: "Waar ik over 1 jaar wil zijn",
    oneYearBody:
      "Over een jaar wil ik mijn AI-vaardigheden ontwikkelen en nieuwe tools beheersen — het is mijn passie én mijn hobby. Ik zou graag visuele verhalen maken die mensen raken, en mijn schrijven naar een hoger niveau tillen. Leren houdt nooit op, en dat maakt het juist spannend.",
    quote: "\"Elke regel code is een stap dichter bij de maker die ik aan het worden ben.\"",
    weaverTitle: "De Skill Weaver Matrix",
    weaverIntro:
      "Kies de vaardigheden die je al hebt, verbind ze met een leerdoel en weef een gloednieuw projectidee.",
    currentSkills: "Huidige vaardigheden",
    futureGoal: "Toekomstig leerdoel",
    weaveProject: "Project Weven",
    weavedProjects: "Mijn Geweven Projecten",
    emptyProjects: "Nog geen geweven projecten — kies vaardigheden en weef je eerste idee.",
    selectHint: "Kies minstens één vaardigheid en één doel.",
    statusIdea: "Idee",
    statusProgress: "Mee bezig",
    statusDone: "Afgerond",
    remove: "Project verwijderen",
    skills: {
      Coding: "Coderen",
      "Creating Stories": "Verhalen maken",
      Designing: "Ontwerpen",
      Canva: "Canva",
      "Website Creation": "Websites maken",
      "Vibe Coding": "Vibe Coding",
    } as Record<string, string>,
    goals: {
      "UI / UX Design": "UI / UX Ontwerp",
      "AI Tools": "AI-tools",
      "Advanced AI Skills": "Gevorderde AI-vaardigheden",
    } as Record<string, string>,
    goalDesc: {
      "UI / UX Design": "Mooie, gebruiksgerichte interfaces maken",
      "AI Tools": "Kunstmatige-intelligentieplatforms verkennen",
      "Advanced AI Skills": "Diepere AI-expertise opbouwen",
    } as Record<string, string>,
    weave: (skills: string[], goal: string) =>
      `Bouw een ${goal}-project dat ${skills.join(" + ")} combineert — gebruik ${skills[0]} als motor, ${
        skills[1] ?? skills[0]
      } voor de creatieve laag en ${goal} om het slim en toekomstbestendig te maken.`,
  },
} as const;

type Dict = (typeof translations)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "en", setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "nl" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
