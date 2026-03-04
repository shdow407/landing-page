import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import ThreeBackground from './components/ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Custom Cursor Logic
      const cursor = cursorRef.current;
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      };
      window.addEventListener('mousemove', moveCursor);

      // Magnetic Button Logic
      const magneticWraps = document.querySelectorAll('.magnetic-wrap');
      magneticWraps.forEach((wrap) => {
        const btn = wrap.querySelector('button');
        if (!btn) return;
        
        wrap.addEventListener('mousemove', (e: any) => {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.5,
            y: y * 0.5,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        wrap.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0, 
            y: 0, 
            duration: 0.5, 
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Hero Title Animation
      gsap.from('.hero-title', {
        y: 200,
        skewY: 10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1
      });

      // 4 Column Scroll Animation
      const columns = document.querySelectorAll('.hero-column');
      columns.forEach((col) => {
        const speed = parseFloat(col.getAttribute('data-speed') || '0.1');
        gsap.to(col, {
          yPercent: -20 * speed,
          scrollTrigger: {
            trigger: "#hero-grid",
            start: "top bottom",
            scrub: 1
          }
        });
      });

      // Reveal Animation
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#e5e7eb] font-sans overflow-x-hidden">
      <div id="custom-cursor" ref={cursorRef}></div>
      <div className="noise-overlay"></div>
      <ThreeBackground />

      {/* Vertical Guide Lines */}
      <div className="guide-lines">
        <div className="guide-line"></div>
        <div className="guide-line"></div>
        <div className="guide-line"></div>
        <div className="guide-line"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex justify-between items-end border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Icon icon="solar:planet-3-bold-duotone" className="text-3xl" />
          <span className="font-syncopate tracking-widest text-xl uppercase">AETHER</span>
        </div>
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em] font-light">
          <a href="#" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Studio</a>
        </div>
        <div className="magnetic-wrap">
          <button className="px-6 py-2 border border-white/30 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-none">
            Let's Talk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 overflow-hidden">
        <div className="container mx-auto px-10 relative z-20 mb-20">
          <div className="stagger-text">
            <h1 className="text-[12vw] font-syncopate leading-none tracking-tighter uppercase hero-title">
              Beyond <br /> <span className="pl-[10vw]">Matter</span>
            </h1>
          </div>
          <div className="flex justify-between items-start mt-10">
            <div className="max-w-xs text-xs uppercase tracking-widest leading-relaxed opacity-60">
              <span className="block mb-4 text-white">01 / BRAND ESSENCE</span>
              我們利用演算法與永續材料，將建築轉化為可呼吸的生命體，打破人工與自然的邊界。
            </div>
            <div className="text-right">
              <Icon icon="solar:arrow-down-linear" className="text-4xl animate-bounce" />
            </div>
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="flex h-[120vh] gap-4 px-4 overflow-hidden" id="hero-grid">
          <div className="hero-column flex-1 mt-0" data-speed="0.1">
            <img src="https://images.unsplash.com/photo-1600607687940-47a000dfd39c?auto=format&fit=crop&q=80&w=800" className="column-image" alt="Arch 1" />
            <div className="absolute bottom-10 left-6 text-[10px] uppercase tracking-widest">Minimalist Form</div>
          </div>
          <div className="hero-column flex-1 mt-40" data-speed="0.25">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" className="column-image" alt="Arch 2" />
            <div className="absolute bottom-10 left-6 text-[10px] uppercase tracking-widest">Biophilic Tech</div>
          </div>
          <div className="hero-column flex-1 mt-20" data-speed="0.15">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" className="column-image" alt="Arch 3" />
            <div className="absolute bottom-10 left-6 text-[10px] uppercase tracking-widest">Future Scale</div>
          </div>
          <div className="hero-column flex-1 mt-60" data-speed="0.3">
            <img src="https://images.unsplash.com/photo-1511818330596-09a6a4e68af5?auto=format&fit=crop&q=80&w=800" className="column-image" alt="Arch 4" />
            <div className="absolute bottom-10 left-6 text-[10px] uppercase tracking-widest">Urban Flow</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-40 container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="glass-card p-10 space-y-6 reveal">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-lg">
              <Icon icon="solar:leaf-linear" className="text-2xl text-white" />
            </div>
            <h3 className="font-syncopate text-xl uppercase">Carbon Negative</h3>
            <p className="text-sm leading-loose opacity-60">透過光伏玻璃與碳封存混凝土技術，我們的建築每年產生的能量遠高於消耗。</p>
            <div className="text-[10px] font-bold opacity-30">001</div>
          </div>
          <div className="glass-card p-10 space-y-6 reveal" style={{ transitionDelay: '200ms' }}>
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-lg">
              <Icon icon="solar:cpu-bold-duotone" className="text-2xl text-white" />
            </div>
            <h3 className="font-syncopate text-xl uppercase">Algorithmic</h3>
            <p className="text-sm leading-loose opacity-60">使用生成式設計演算法，根據日照與風場自動優化建築型態，實現極致能效。</p>
            <div className="text-[10px] font-bold opacity-30">002</div>
          </div>
          <div className="glass-card p-10 space-y-6 reveal" style={{ transitionDelay: '400ms' }}>
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-lg">
              <Icon icon="solar:user-rounded-linear" className="text-2xl text-white" />
            </div>
            <h3 className="font-syncopate text-xl uppercase">Human-Centric</h3>
            <p className="text-sm leading-loose opacity-60">以神經科學為基礎的空間佈局，顯著提升居住者的血清素水平與創造力。</p>
            <div className="text-[10px] font-bold opacity-30">003</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative px-10">
        <div className="stagger-text mb-10">
          <h2 className="text-6xl md:text-[8vw] font-syncopate uppercase leading-none">
            The Future is<br /><span className="opacity-30">Waiting.</span>
          </h2>
        </div>
        <div className="magnetic-wrap mt-10">
          <button className="group relative px-16 py-8 bg-white text-black rounded-full font-syncopate text-sm overflow-hidden transition-all hover:scale-110 active:scale-95 cursor-none">
            <span className="relative z-10">Begin Evolution</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Partners */}
        <div className="absolute bottom-20 w-full px-10 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <Icon icon="simple-icons:tesla" className="text-4xl" />
          <Icon icon="simple-icons:spacex" className="text-4xl" />
          <Icon icon="simple-icons:architecturaldigest" className="text-4xl" />
          <Icon icon="simple-icons:dezeen" className="text-4xl" />
          <Icon icon="simple-icons:wallpaper" className="text-4xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 px-10 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.2em] opacity-50">
        <div>© 2024 AETHER Studio. All rights reserved.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
