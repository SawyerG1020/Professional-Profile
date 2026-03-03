"use client";

import { useProjects } from "@/hooks/useProjects";
import { useProjectsDB } from "@/hooks/useProjectsDB";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProjectsPage() {
  const { projects: staticProjects, loading: staticLoading } = useProjects();
  const { projects: dbProjects, loading: dbLoading } = useProjectsDB();

  return (
    // Changed: used 'items-start' and 'max-w-5xl' for more width
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black py-20 px-4">
      <main className="w-full max-w-5xl flex flex-col gap-12 bg-white dark:bg-zinc-950 p-8 md:p-12 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Project Portfolio</h1>
          <p className="text-muted-foreground text-lg">Hybrid view: Static JSON & Live SQLite Database</p>
        </header>

        {/* --- DATABASE SECTION (The Table) --- */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-600">SQLite Database</h2>
          </div>
          
          {dbLoading ? (
            <div className="h-32 w-full bg-zinc-100 animate-pulse rounded-md" />
          ) : (
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-zinc-50 dark:bg-zinc-900">
                  <TableRow>
                    <TableHead className="font-bold text-zinc-900 dark:text-zinc-100">Project Name</TableHead>
                    <TableHead className="font-bold text-zinc-900 dark:text-zinc-100">Tech Stack</TableHead>
                    <TableHead className="text-right font-bold text-zinc-900 dark:text-zinc-100">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dbProjects.map((p: any) => (
                    <TableRow key={p.id} className="hover:bg-zinc-50/50">
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>
                        <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                          {p.tech_stack}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                          {p.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* --- STATIC PROJECTS SECTION --- */}
        <section className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-600">Hardcoded Records</h2>
          <div className="grid gap-6">
            {staticProjects.map((project: any) => (
              <div key={project.id} className="group p-4 rounded-lg border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">      
                  {project.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Link href="/">
          <Button variant="outline" className="w-fit">← Back to Home</Button>
        </Link>
      </main>
    </div>
  );
}