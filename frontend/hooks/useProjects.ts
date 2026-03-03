import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching static projects:", err);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}