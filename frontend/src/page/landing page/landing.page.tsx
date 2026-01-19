import { useAuthStore } from "@/store/auth.store";
import {  ListTodo } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PriorixLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const {user}=useAuthStore()
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setActiveFeature((p) => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  const features = [
    {
      title: "Prioritize",
      desc: "Focus on what matters most with intelligent task ranking",
      icon: "◆",
    },
    {
      title: "Organize",
      desc: "Structure your tasks with intuitive project grouping",
      icon: "◇",
    },
    {
      title: "Execute",
      desc: "Track progress and hit deadlines without stress",
      icon: "◈",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-body text-kosma-black">
      {/* NAVBAR */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 40 ? "#F9F9F9" : "transparent",
          borderBottom: scrollY > 40 ? "1px solid #C7C7C7" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-kosma-black text-kosma-white rounded-sm flex items-center justify-center">
              <ListTodo size={18} />
            </div>
            <span className="font-logo text-xl">Priorix</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-kosma-dgray">
            <a className="hover:text-black transition">Features</a>
            <a className="hover:text-black transition">How it works</a>
            <a className="hover:text-black transition">Pricing</a>
          </div>

          <div className="flex gap-3">
            {user?(
                <Link to={'/dashboard/tasks'}>
                  <div>
                  
                  <span>Dashboard</span>
                  </div>
                </Link>
            ):(

            <Link to={'/auth/login'} className="px-4 py-2 text-sm hover:text-black transition">
              Sign in
            </Link>

            )}
            <button className="px-4 py-2 text-sm font-button rounded-xl bg-kosma-black text-kosma-white hover:scale-105 hover:shadow-lg transition">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        {/* Abstract glow */}
        <div
          className="absolute left-1/2 top-40 -translate-x-1/2  bg-kosma-dgray/30 blur-[120px]"
          style={{ transform: `translate(-50%, ${scrollY * 0.05}px)` }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm bg-kosma-black text-kosma-white">
            Task management, reimagined
          </span>
            
          <h1
            className="font-logo text-5xl md:text-7xl mb-6 leading-tight"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Stop juggling.
            <br />
            <span className="relative">
              Start achieving.
            </span>
          </h1>
            
            <div className="absolute left-0 w-full h-10 bg-kosma-gray/60 -z-10 rounded-full"></div>

          <p className="text-xl md:text-2xl text-kosma-dgray max-w-3xl mx-auto mb-10 font-paragraph">
            Priorix helps you cut through distractions and focus on what truly
            moves your work forward.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="font-button px-8 py-4 rounded-xl bg-kosma-black text-kosma-white hover:scale-105 hover:shadow-2xl transition">
              Start for free
            </button>
            <button className="font-button px-8 py-4 rounded-xl border-2 border-kosma-black hover:bg-kosma-black hover:text-kosma-white transition">
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-kosma-black text-kosma-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 font-heading">
            Everything you need.<br />Nothing you don’t.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveFeature(i)}
                className={`p-8 rounded-2xl cursor-pointer transition-all duration-300
                ${
                  activeFeature === i
                    ? "bg-kosma-dgray scale-[1.03]"
                    : "border border-kosma-dgray/50"
                }`}
              >
                <div className="text-5xl mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-kosma-lgray">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { n: "10k+", l: "Active users" },
            { n: "98%", l: "Satisfaction rate" },
            { n: "2M+", l: "Tasks completed" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-6xl font-bold mb-2">{s.n}</div>
              <div className="text-kosma-gray">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-kosma-black rounded-3xl p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading text-kosma-white mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl text-kosma-lgray mb-10">
            Join thousands simplifying their daily workflow.
          </p>
          <button className="font-button px-10 py-4 rounded-xl bg-kosma-white text-kosma-black hover:scale-105 hover:shadow-xl transition">
            Get started for free
          </button>
        </div>
      </section>


      <footer className="py-12 px-6 border-t border-kosma-lgray">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-logo text-xl">Priorix</span>
          <div className="flex gap-8 text-sm text-kosma-gray">
            <a className="hover:text-black">Privacy</a>
            <a className="hover:text-black">Terms</a>
            <a className="hover:text-black">Contact</a>
          </div>
          <p className="text-sm text-kosma-gray">
            © 2026 Priorix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
