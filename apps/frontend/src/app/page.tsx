import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl font-bold">Welcome to the Next.js + AdonisJs Starter</h1>
      <div className="flex gap-8">
        <Image alt="Next.js Logo" src="/next.svg" width={200} height={200} />
        <Image alt="AdonisJs Logo" src="/adonis.svg" width={200} height={200} />
      </div>
    </main>
  );
}
