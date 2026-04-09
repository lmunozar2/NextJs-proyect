import { StackHandler } from "@stackframe/stack";
import BackHomeButton from "@/components/BackHome";


export default function Handler() {
  return (
    <div className="hero min-h-screen">
      <div className="absolute inset-0 bg-[url(/imgs/bg-home.jpeg)] bg-cover bg-center blur-sm scale-99 -z-10" />
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="bg-black/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          <StackHandler fullPage={false} />
          <BackHomeButton />
        </div>
      </div>
    </div>

  );
}