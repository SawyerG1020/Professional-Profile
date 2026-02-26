import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function getRole() {
  const res = await fetch('http://localhost:8080/role', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Role');
  }

  return res.json();
}

export default async function RolePage() {
  const roles = await getRole();

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black ">
      
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-12 py-32 px-16 bg-white dark:bg-black">
        
        <title>Roll</title>

        
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Roll</h1>
            <p className="text-muted-foreground">Roles and Responsibilities</p>
          </div>
          
        </div>

        

        {/* Roles List */}
        <div className="w-full flex flex-col gap-10">
          {roles.map((role: any) => (
            <div key={role.id} className="group border-b border-zinc-100 pb-8 last:border-0 dark:border-zinc-800">
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">      
                {role.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                {role.description}
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