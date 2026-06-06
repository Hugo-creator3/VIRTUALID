import { Component, AfterViewInit, OnDestroy } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.html',
  styleUrls: ['./conocenos.css']
})
export class Conocenos implements AfterViewInit, OnDestroy {

  private revealObserver!: IntersectionObserver;
  private sectionObserver!: IntersectionObserver;
  private counterObserver!: IntersectionObserver;
  private animFrameId!: number;
  private tiltListeners: { el: HTMLElement; fn: (e: MouseEvent) => void; leave: () => void }[] = [];

  ngAfterViewInit(): void {
    this.initRevealObserver();
    this.initSectionObserver();
    this.initDotClicks();
    this.initParticles();       // Efecto 1
    this.initTypewriter();      // Efecto 2
    this.initCounters();        // Efecto 3
    this.initTiltCards();       // Efecto 4 + 5 (tilt + glow)
  }

  /* ─── SCROLL REVEAL ─── */
  private initRevealObserver(): void {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => this.revealObserver.observe(r));
  }

  /* ─── SECTION DOTS ─── */
  private initSectionObserver(): void {
    const sections = document.querySelectorAll<HTMLElement>('.hero, .about, .tech, .ventajas');
    const dots = document.querySelectorAll<HTMLElement>('.dot');
    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = [...sections].indexOf(e.target as HTMLElement);
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => this.sectionObserver.observe(s));
  }

  private initDotClicks(): void {
    const sections = document.querySelectorAll<HTMLElement>('.hero, .about, .tech, .ventajas');
    const dots = document.querySelectorAll<HTMLElement>('.dot');
    dots.forEach(d => {
      d.addEventListener('click', () => {
        const idx = parseInt(d.dataset['sec'] ?? '0');
        sections[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ─── EFECTO 1: PARTICLE CANVAS ─── */
  private initParticles(): void {
    const canvas = document.querySelector<HTMLCanvasElement>('.particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const hero = canvas.parentElement!;
    const resize = () => { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 55;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24,95,165,0.18)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(24,95,165,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      this.animFrameId = requestAnimationFrame(draw);
    };
    draw();
  }

  /* ─── EFECTO 2: TYPEWRITER ─── */
  private initTypewriter(): void {
    const el = document.querySelector<HTMLElement>('.typewriter');
    if (!el) return;
    const text = 'VIRTUALID?';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 110);
      }
    };
    setTimeout(type, 600);
  }

  /* ─── EFECTO 3: CONTADORES ANIMADOS ─── */
  private initCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('.stat-num');
    this.counterObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseInt(el.dataset['target'] ?? '0');
        const suffix = el.dataset['suffix'] ?? '';
        if (target === 0) { el.textContent = '0' + suffix; return; }
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 35);
        this.counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => this.counterObserver.observe(c));
  }

  /* ─── EFECTO 4 + 5: TILT 3D + GLOW BORDER ─── */
  private initTiltCards(): void {
    const cards = document.querySelectorAll<HTMLElement>('.tilt-card');
    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `perspective(700px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.03)`;
      };
      const onLeave = () => {
        card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      this.tiltListeners.push({ el: card, fn: onMove, leave: onLeave });
    });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.sectionObserver?.disconnect();
    this.counterObserver?.disconnect();
    cancelAnimationFrame(this.animFrameId);
    this.tiltListeners.forEach(({ el, fn, leave }) => {
      el.removeEventListener('mousemove', fn);
      el.removeEventListener('mouseleave', leave);
    });
  }
}