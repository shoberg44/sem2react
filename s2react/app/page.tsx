import Counter from "./components/Counter";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Heres my counter</h1>
      <Counter />
    </main>
  );
}
