
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function getExperience() {
    const res = await fetch('http://localhost:8080/experience',{
      cache: 'no-store'
    });

    if(!res.ok) {
      throw new Error('Failed to fetch experience');
    }
    
    return res.json();
  }


export default async function Home() {
  const experience = await getExperience();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <title>Experience</title>
        
        <div>
        <h1 className="text-4xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground">Summary of Experience</p>
      </div>

      <div className="w-full flex flex-col gap-10">
          {experience.map((exp: any) => (
            <div key={exp.id} className="flex flex-col gap-2 border-l-2 border-zinc-100 pl-6 dark:border-zinc-800 hover:border-orange-500 transition-colors">
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                {exp.company}
              </span>
              <h2 className="text-1xl font-semibold text-zinc-900 dark:text-zinc-100">
                {exp.role}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                {exp.description}
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
