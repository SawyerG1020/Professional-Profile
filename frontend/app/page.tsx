
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function getBio() {
    const res = await fetch('http://localhost:8080/home',{
      cache: 'no-store'
    });

    if(!res.ok) {
      throw new Error('Failed to fetch Bio');
    }
    
    return res.json();
  }



export default async function Bio() {
  const bio = await getBio();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      
      <title>home</title>

      <div className ="flex gap-20">
        <h1 className="text-2xl font-bold tracking-tight">Sawyer Guarisco's Professional Profile</h1>
      </div>

       
      


      <div>
        <h1 className="text-4xl font-bold tracking-tight">Home</h1>
        <p className="text-muted-foreground">Home page and Bio</p>
      </div>
      
      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">About Me</h2>
          {/* Use bio.message (match the JSON tag in your Go struct) */}
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
            {bio.message}
          </p>
        </div>
    

      
        <div className="flex flex-wrap gap-4">   
          <Link href="/roll">
            <Button variant="outline">View My Roll</Button>
          </Link>
          <Link href="/Experience">
            <Button variant="outline">View My Experience</Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline">View My Projects</Button>
          </Link>
        </div>
        
        



            
    
      </main>
    </div>
  );
}
