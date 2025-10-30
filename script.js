// For future more advance added the logics to implement bottom nav, fake form added for future, for filter the projects in future.

// Orbit nav placement
    (function(){
      const orbit = document.getElementById('navOrbit');
      const btns = orbit.querySelectorAll('button');
      const radius = 120; // px
      btns.forEach((b,i)=>{
        const angle = (i/btns.length) * Math.PI*2 - Math.PI/2; // start top
        const x = Math.cos(angle) * radius + 'px';
        const y = Math.sin(angle) * radius + 'px';
        b.style.setProperty('--x', x);
        b.style.setProperty('--y', y);
      });

      const main = document.getElementById('navMain');
      let open = false;
      main.addEventListener('click', ()=>{
        open = !open;
        orbit.classList.toggle('show', open);
        main.querySelector('i').classList.toggle('fa-times', open);
        main.querySelector('i').classList.toggle('fa-bars', !open);
      });

      // click handlers to scroll
      orbit.addEventListener('click', (e)=>{
        const t = e.target.closest('button');
        if(!t) return;
        const sel = t.getAttribute('data-target');
        document.querySelector(sel).scrollIntoView({behavior:'smooth', block:'start'});
        // close
        open = false; orbit.classList.remove('show'); main.querySelector('i').classList.remove('fa-times'); main.querySelector('i').classList.add('fa-bars');
      });
    })();

    // GSAP scroll reveals
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('section, .project, .panel').forEach((el,i)=>{
      gsap.from(el, {
        y: 30, opacity:0, duration:0.9, delay: i*0.06,
        scrollTrigger:{trigger:el, start:'top 90%'}
      });
    });

    // project filter
    document.querySelectorAll('.filter').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const f = btn.getAttribute('data-filter');
        document.querySelectorAll('#projectsGrid .project').forEach(p=>{
          p.style.display = (f==='all' || p.getAttribute('data-type')===f || (f==='gen' && p.getAttribute('data-type')==='gen')) ? 'block' : 'none';
        });
      });
    });

    // playful tilt for card
    const card = document.getElementById('interactive-card');
    if(card){
      card.addEventListener('mousemove', (e)=>{
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width/2) / r.width;
        const dy = (e.clientY - r.top - r.height/2) / r.height;
        card.style.transform = `rotateY(${dx*6}deg) rotateX(${ -dy*6 }deg)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform = 'rotateY(0deg) rotateX(0deg)'; });
    }

    // contact form quick fake handler
   // document.getElementById('contactForm').addEventListener('submit', (e)=>{
   //   e.preventDefault();
   //   alert('Thanks — message received (demo). We will reply at hello@aastudio.ai');
   //   e.target.reset();

   // });
