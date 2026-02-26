
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function getProjects() {
    const res = await fetch('http://localhost:8080/projects',{
      cache: 'no-store'
    });

    if(!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return res.json();
  }

  export default async function ProjectsPage() {
    const projects = await getProjects();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        

        <title>Projects</title>


        <div>
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Summary and Detail Regarding Projects</p>
      </div>


      <div className = "w-full flex flex-col gap-6">
        {projects.map((project: any) =>(
          <div key={project.id} className="group border-b border-zinc-100 pb-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">      
          {project.name}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            {project.description}
          </p>
          </div>
        ))}
        </div>

        <Link href="/">
            <Button>
              Go Home
            </Button>
        </Link>


            

        
        
      </main>
    </div>
  );
}
