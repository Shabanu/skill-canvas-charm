import { useCallback, useEffect, useState } from "react";

export type Status = "idea" | "progress" | "done";

export interface Project {
  id: number;
  skills: string[];
  goal: string;
  status: Status;
}

const STORAGE_KEY = "weaved-projects";
const EVENT = "weaved-projects-changed";

function read(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(EVENT));
}

export function useWeavedProjects(): [Project[], (updater: (p: Project[]) => Project[]) => void] {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(read());
    const sync = () => setProjects(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((updater: (p: Project[]) => Project[]) => {
    const next = updater(read());
    write(next);
    setProjects(next);
  }, []);

  return [projects, update];
}
