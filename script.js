// ═══════════════════════════════════════════════════════════════════
// GALAXY BACKGROUND
// ═══════════════════════════════════════════════════════════════════
(function initGalaxy() {
  const canvas = document.getElementById('galaxy-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', () => { resize(); stars.forEach(s => { s.ox = s.x = Math.random()*W; s.oy = s.y = Math.random()*H; }); });
  let mouseX = -9999, mouseY = -9999;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  const STAR_COUNT = 280;
  const stars = Array.from({ length: STAR_COUNT }, () => {
    const x = Math.random()*window.innerWidth, y = Math.random()*window.innerHeight;
    return { ox:x,oy:y,x,y,vx:0,vy:0,r:Math.random()*1.7+0.3,alpha:Math.random()*0.6+0.3,twinkleSpeed:Math.random()*0.9+0.3,twinkleOffset:Math.random()*Math.PI*2,hue:190+Math.random()*45,mass:Math.random()*0.4+0.6 };
  });
  const NEBULAS=[{cx:.18,cy:.28,rx:.32,ry:.22,color:'91,200,245',alpha:.042},{cx:.76,cy:.65,rx:.28,ry:.20,color:'100,160,255',alpha:.035},{cx:.50,cy:.50,rx:.42,ry:.30,color:'60,100,200',alpha:.022},{cx:.86,cy:.18,rx:.20,ry:.16,color:'120,200,255',alpha:.032},{cx:.12,cy:.76,rx:.22,ry:.18,color:'80,140,230',alpha:.028}];
  const ORBS=[{cx:.20,cy:.35,r:95,color:'80,160,255',alpha:.055},{cx:.80,cy:.62,r:75,color:'91,200,245',alpha:.065},{cx:.50,cy:.18,r:60,color:'130,190,255',alpha:.048}];
  const shooters=[];
  function spawnShooter(){shooters.push({x:Math.random()*.65,y:Math.random()*.45,len:90+Math.random()*130,speed:.0016+Math.random()*.002,progress:0,alpha:.65+Math.random()*.35,angle:Math.PI/5+(Math.random()-.5)*.3});}
  setInterval(()=>{if(shooters.length<3)spawnShooter();},3000); spawnShooter();
  const REPEL_RADIUS=120,REPEL_FORCE=6.5,FRICTION=.88,RETURN_FORCE=.045; let t=0;
  function draw(){
    requestAnimationFrame(draw); t+=.005;
    const bg=ctx.createLinearGradient(0,0,W*.5,H);
    bg.addColorStop(0,'#07070a'); bg.addColorStop(.5,'#080810'); bg.addColorStop(1,'#07070a');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    NEBULAS.forEach(n=>{
      const g=ctx.createRadialGradient(n.cx*W,n.cy*H,0,n.cx*W,n.cy*H,Math.max(n.rx*W,n.ry*H));
      g.addColorStop(0,`rgba(${n.color},${n.alpha})`); g.addColorStop(.5,`rgba(${n.color},${n.alpha*.4})`); g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.save(); ctx.scale(1,n.ry/n.rx); ctx.beginPath(); ctx.arc(n.cx*W,(n.cy*H)*(n.rx/n.ry),n.rx*W,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); ctx.restore();
    });
    ORBS.forEach(o=>{
      const g=ctx.createRadialGradient(o.cx*W,o.cy*H,0,o.cx*W,o.cy*H,o.r);
      g.addColorStop(0,`rgba(${o.color},${o.alpha})`); g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(o.cx*W,o.cy*H,o.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    });
    stars.forEach(s=>{
      const dx=mouseX-s.x,dy=mouseY-s.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<REPEL_RADIUS&&d>0){const f=(1-d/REPEL_RADIUS)*REPEL_FORCE;s.vx-=(dx/d)*f;s.vy-=(dy/d)*f;}
      s.vx+=(s.ox-s.x)*RETURN_FORCE; s.vy+=(s.oy-s.y)*RETURN_FORCE;
      s.vx*=FRICTION; s.vy*=FRICTION; s.x+=s.vx; s.y+=s.vy;
      const tw=Math.sin(t*s.twinkleSpeed+s.twinkleOffset)*.5+.5;
      const a=s.alpha*(0.6+tw*0.4);
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${s.hue},80%,85%,${a})`; ctx.fill();
    });
    for(let i=shooters.length-1;i>=0;i--){
      const sh=shooters[i]; sh.progress+=sh.speed;
      const sx=sh.x*W+Math.cos(sh.angle)*sh.progress*W*1.5,sy=sh.y*H+Math.sin(sh.angle)*sh.progress*H*1.5;
      const ex=sx-Math.cos(sh.angle)*sh.len,ey=sy-Math.sin(sh.angle)*sh.len;
      const g=ctx.createLinearGradient(ex,ey,sx,sy);
      g.addColorStop(0,'rgba(91,200,245,0)'); g.addColorStop(1,`rgba(91,200,245,${sh.alpha*(1-sh.progress)})`);
      ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(sx,sy);
      ctx.strokeStyle=g; ctx.lineWidth=1.2; ctx.stroke();
      if(sh.progress>1)shooters.splice(i,1);
    }
  }
  draw();
})();

// ═══════════════════════════════════════════════════════════════════
// CINEMATIC VIDEO LOADER
// ═══════════════════════════════════════════════════════════════════
function initVideoLoader() {
  const loader   = document.getElementById('loader');
  const video    = document.getElementById('ld-video');
  const text1    = document.getElementById('ldText1');   // "ENTERING THE UNIVERSE..."
  const text2    = document.getElementById('ldText2');   // "WELCOME TO MY UNIVERSE"
  const boot1    = document.getElementById('ldBoot1');
  const boot2    = document.getElementById('ldBoot2');
  const boot3    = document.getElementById('ldBoot3');
  const boot4    = document.getElementById('ldBoot4');

  if (!loader || !video) return;

  // Play video — muted first (browser requires it), unmute on first interaction
  if (video) {
    video.muted = true;
    video.loop = true;
    video.play().catch(function() {});
    // Unmute as soon as user touches anything
    var unmute = function() {
      video.muted = false;
      video.volume = 1.0;
      document.removeEventListener('click', unmute);
      document.removeEventListener('keydown', unmute);
    };
    document.addEventListener('click', unmute);
    document.addEventListener('keydown', unmute);
  }
  startLoaderTimers();

  // All timers start AFTER user clicks enter (so they're in sync with video)
  function startLoaderTimers() {
    var bl = [boot1, boot2, boot3, boot4];
    [0, 200, 400, 650].forEach(function(d, i) {
      if (!bl[i]) return;
      setTimeout(function() { bl[i].classList.add('ld-boot-visible'); }, d);
    });
    setTimeout(function() { if (text2) text2.classList.add('ld-visible'); }, 900);
    setTimeout(launch, 2000);

    // Progress bar — grows in steps matching boot lines + launch
    var bar = document.getElementById('ld-progress-bar');
    if (bar) {
      bar.style.width = '0%';
      setTimeout(function(){ bar.style.transition='width 0.4s ease'; bar.style.width='20%'; }, 0);
      setTimeout(function(){ bar.style.width='40%'; }, 200);
      setTimeout(function(){ bar.style.width='60%'; }, 400);
      setTimeout(function(){ bar.style.width='75%'; }, 650);
      setTimeout(function(){ bar.style.transition='width 0.6s ease'; bar.style.width='88%'; }, 900);
    }
  }

}

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const TECH_LINKS = {
  'Java':'https://www.java.com',
  'Spring Boot':'https://spring.io/projects/spring-boot',
  'React':'https://react.dev',
  'MySQL':'https://www.mysql.com',
  'REST APIs':'https://restfulapi.net',
  'JWT':'https://jwt.io',
  'Redux':'https://redux.js.org',
  'Stripe':'https://stripe.com',
  'Python':'https://www.python.org',
  'Scikit-learn':'https://scikit-learn.org',
  'Pandas':'https://pandas.pydata.org',
  'NLP':'https://www.nltk.org',
  'OpenCV':'https://opencv.org',
  'Deep Learning':'https://www.tensorflow.org'
};

const PROJECTS=[
  {name:'Campus Digital Complaint Management System',category:'Full Stack',desc:'Built a role-based complaint management system with JWT authentication, SLA tracking, and real-time notifications using Server-Sent Events.',stack:['Spring Boot','React','MySQL','JWT'],github:'https://github.com/codedbyshashi/Campus-Digital-Complaint-Management',demo:'#',screenshot:'images/project1.png'},
  {name:'Full Stack E-commerce Platform',category:'Full Stack',desc:'Developed a scalable e-commerce platform with authentication, cart, order management, and Stripe payment integration.',stack:['Spring Boot','React','MySQL','Redux','Stripe'],github:'https://github.com/codedbyshashi/sb-ecom',demo:'#',screenshot:'images/project2.png'},
  {name:'Fake News Detection System',category:'Machine Learning',desc:'Built an ML model to classify news as real or fake using NLP techniques and supervised learning.',stack:['Python','Scikit-learn','Pandas','NLP'],github:'https://github.com/codedbyshashi/Fake-new-detection',demo:'#',screenshot:'images/project3.png'},
  {name:'AI Image Enhancer',category:'AI',desc:'Developed an AI-based tool to enhance image quality using deep learning and computer vision techniques.',stack:['Python','OpenCV','Deep Learning'],github:'https://github.com/codedbyshashi/AI-IMAGE-ENHANCER',demo:'#',screenshot:'images/project4.png'},
];

// ═══════════════════════════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════════════════════════
const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const curEl=document.getElementById('cur'), curDot=document.getElementById('curDot');
let mx=0,my=0,tx=0,ty=0,cursorVisible=false;
if(!isTouchDevice){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    curDot.style.left=mx+'px'; curDot.style.top=my+'px';
    if(!cursorVisible){cursorVisible=true;curEl.classList.add('visible');curDot.classList.add('visible');}
  });
  (function animCursor(){tx+=(mx-tx)*.12;ty+=(my-ty)*.12;curEl.style.left=tx+'px';curEl.style.top=ty+'px';requestAnimationFrame(animCursor);})();
}
function bindHover(){
  if(isTouchDevice) return;
  document.querySelectorAll('a,button,.nav-email,.hr-skill,.proj-card,.pd-btn,.icon-back-btn,.pd-back,.social-item,.cv-side,.pd-stack-tag,.ab-contact-email,.ab-contact-social,.proj-h-screenshot,.proj-see-all-btn,.proj-h-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>curEl.classList.add('hover'));
    el.addEventListener('mouseleave',()=>curEl.classList.remove('hover'));
  });
}

// ═══════════════════════════════════════════════════════════════════
// LOGO
// ═══════════════════════════════════════════════════════════════════
const smLogo=document.getElementById('smLogo'); let smHovered=false;
function buildLetters(text,visible){
  smLogo.innerHTML=''; [...text].forEach((ch,i)=>{
    const s=document.createElement('span'); s.className='logo-letter'+(visible?' vis':'');
    s.textContent=ch===' '?'\u00A0':ch; s.style.transitionDelay=visible?(i*40)+'ms':'0ms'; smLogo.appendChild(s);
  });
}
smLogo.addEventListener('mouseenter',()=>{smHovered=true;buildLetters('KOTA SHASHIDHAR REDDY',false);requestAnimationFrame(()=>requestAnimationFrame(()=>{smLogo.querySelectorAll('.logo-letter').forEach(l=>l.classList.add('vis'));}));});
smLogo.addEventListener('mouseleave',()=>{smHovered=false;smLogo.querySelectorAll('.logo-letter').forEach(l=>{l.style.transitionDelay='0ms';l.classList.remove('vis');});setTimeout(()=>{if(!smHovered)buildLetters('KSR',true);},200);});

// ═══════════════════════════════════════════════════════════════════
// LAUNCH — reveal portfolio after loader
// ═══════════════════════════════════════════════════════════════════
function launch() {
  const loader = document.getElementById('loader');
  const app    = document.getElementById('app');
  const vid    = document.getElementById('ld-video');
  if (!loader) return;

  if (vid) { vid.pause(); vid.src = ''; }
  // Complete progress bar to 100%
  const bar = document.getElementById('ld-progress-bar');
  if (bar) { bar.style.transition = 'width 0.4s ease'; bar.style.width = '100%'; }

  // Fade loader out
  setTimeout(() => {
    loader.style.transition = 'opacity 0.8s cubic-bezier(.4,0,.2,1)';
    loader.style.opacity = '0';
  }, 300);

  setTimeout(() => {
    loader.style.display = 'none';
    if (app) { app.style.display = 'block'; app.style.opacity = '0'; }
    initCardThumbs(); buildProjectCards(); initScrollSystem();
    initScrollReveal(); initGlobe(); buildQuote(); bindHover(); initCareerLine();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (app) { app.style.transition = 'opacity 0.7s ease'; app.style.opacity = '1'; }
    }));
  }, 1150);
}

// ═══════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════
function copyEmail(){navigator.clipboard.writeText('kotakshashidharreddy@gmail.com').then(()=>{const b=document.getElementById('emailBtn');b.classList.add('copied');setTimeout(()=>b.classList.remove('copied'),2000);});}
function downloadCV(e){
  if(e)e.preventDefault();
  let modal=document.getElementById('cvComingSoon');
  if(!modal){
    modal=document.createElement('div');
    modal.id='cvComingSoon';
    modal.innerHTML=`<div class="cv-popup-bg"></div><div class="cv-popup-card"><button class="cv-popup-close" onclick="closeCVPopup()">&#10005;</button><div class="cv-popup-label">CV</div><div class="cv-popup-title">Coming Soon</div><div class="cv-popup-text">Resume download will be available here once the final version is added.</div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.cv-popup-bg').addEventListener('click',closeCVPopup);
    if(!isTouchDevice){
      const closeBtn=modal.querySelector('.cv-popup-close');
      closeBtn.addEventListener('mouseenter',()=>curEl.classList.add('hover'));
      closeBtn.addEventListener('mouseleave',()=>curEl.classList.remove('hover'));
    }
  }
  modal.classList.add('cv-popup-open');
  document.body.style.overflow='hidden';
}
window.closeCVPopup=function(){
  const modal=document.getElementById('cvComingSoon');
  if(modal)modal.classList.remove('cv-popup-open');
  document.body.style.overflow='';
};
window.copyAbEmail=function(e){
  e.preventDefault();
  navigator.clipboard.writeText('kotakshashidharreddy@gmail.com').then(()=>{
    const c=document.getElementById('abEmailCopied'); if(!c)return;
    c.classList.add('show'); setTimeout(()=>c.classList.remove('show'),2000);
  }).catch(()=>{});
};

// ═══════════════════════════════════════════════════════════════════
// QUOTE
// ═══════════════════════════════════════════════════════════════════
const FULL_QUOTE=`I am a Full Stack Developer focused on building scalable web applications using Spring Boot and React. I enjoy designing backend systems that handle real-world workflows efficiently, while also creating clean and responsive user interfaces.

My work includes developing systems like a role-based complaint management platform and a full-stack e-commerce application, where I implemented authentication, API design, and structured data handling.

I am currently preparing for product-based software engineering roles, with a strong focus on improving problem-solving skills, system design thinking, and writing clean, maintainable code.`;
function buildQuote(){
  const el=document.getElementById('abQuoteText');
  if(!el||el.dataset.built)return; el.dataset.built='1'; el.textContent=FULL_QUOTE;
}

// ═══════════════════════════════════════════════════════════════════
// BUILD HORIZONTAL PROJECT CARDS
// ═══════════════════════════════════════════════════════════════════
function buildProjectCards(){
  const track=document.getElementById('projHscrollTrack'); if(!track)return;
  track.innerHTML='';
  PROJECTS.forEach((p,i)=>{
    const card=document.createElement('div'); card.className='proj-h-card';
    const tags=p.stack.map(t=>{const url=TECH_LINKS[t];return url?`<a class="pd-stack-tag" href="${url}" target="_blank" rel="noopener">${t}</a>`:`<span class="pd-stack-tag">${t}</span>`;}).join('');
    const demoDisabled=p.demo==='#';
    card.innerHTML=`
      <div class="proj-h-num">${String(i+1).padStart(2,'0')}</div>
      <div class="proj-h-top">
        <div class="proj-h-category">${p.category}</div>
        <div class="proj-h-name">${p.nameStyle||(()=>{const w=p.name.split(' ');return w.length>1?w[0]+' <span style="color:var(--blue)">'+w.slice(1).join(' ')+'</span>':p.name;})()} </div>
      </div>
      <div class="proj-h-tools-label">Tools and features</div>
      <div class="proj-h-tags">${tags}</div>
      <div class="proj-h-screenshot" data-idx="${i}">
        <img src="${p.screenshot}" alt="${p.name}" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
        <div class="proj-h-corner tl"></div><div class="proj-h-corner tr"></div>
        <div class="proj-h-corner bl"></div><div class="proj-h-corner br"></div>
      </div>
      <div class="proj-h-actions">
        <a class="proj-h-btn proj-h-btn-primary" href="${p.demo}" ${!demoDisabled?'target="_blank" rel="noopener"':''} ${demoDisabled?'onclick="return false;" style="opacity:.4;pointer-events:none;"':''}>
          <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live Demo
        </a>
        <a class="proj-h-btn proj-h-btn-outline" href="${p.github}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>GitHub
        </a>
      </div>
    `;
    const ss=card.querySelector('.proj-h-screenshot');
    ss.style.cursor='zoom-in';
    ss.onclick=()=>window.openScreenshot&&window.openScreenshot(p.screenshot);
    track.appendChild(card);
  });
  initHorizontalScroll();
  bindHover();
}

// ═══════════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL
// ═══════════════════════════════════════════════════════════════════
function initHorizontalScroll(){
  const wrapper=document.getElementById('projHscrollWrapper');
  const track=document.getElementById('projHscrollTrack');
  if(!wrapper||!track)return;
  let hPos=0;
  function getMax(){ return Math.max(0,track.scrollWidth-wrapper.clientWidth); }
  wrapper.addEventListener('wheel',e=>{
    const max=getMax(); if(max<=0)return;
    if((e.deltaY>0&&hPos<max)||(e.deltaY<0&&hPos>0)){
      e.preventDefault(); hPos=Math.max(0,Math.min(max,hPos+e.deltaY*1.5));
      track.style.transform=`translateX(-${hPos}px)`;
    }
  },{passive:false});
  let tStartX=0,tStartH=0;
  wrapper.addEventListener('touchstart',e=>{tStartX=e.touches[0].clientX;tStartH=hPos;},{passive:true});
  wrapper.addEventListener('touchmove',e=>{
    const dx=tStartX-e.touches[0].clientX;
    hPos=Math.max(0,Math.min(getMax(),tStartH+dx));
    track.style.transform=`translateX(-${hPos}px)`;
  },{passive:true});
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL SYSTEM — progress bar + active nav
// ═══════════════════════════════════════════════════════════════════
// FIXED: About Me + Tech Stack + Strengths → navAbout
const SECTION_NAV_MAP = {
  'section-home':     'navHome',
  'section-whatido':  'navAbout',
  'section-about':    'navAbout',
  'section-career':   'navAbout',
  'section-techstack':'navAbout',
  'section-strengths':'navAbout',
  'section-projects': 'navProjects',
  'section-contact':  'navContact',
};

function initScrollSystem(){
  const sc=document.getElementById('scroll-container');
  const pt=document.getElementById('progress-top');
  if(!sc)return;

  sc.addEventListener('scroll',()=>{
    // Progress bar
    const max=sc.scrollHeight-sc.clientHeight;
    const pct=max>0?(sc.scrollTop/max*100):0;
    if(pt)pt.style.setProperty('--progress',pct+'%');

    // Active nav — find which section is most in view
    const scrollMid=sc.scrollTop+sc.clientHeight*0.4;
    let activeSection=null;
    Object.keys(SECTION_NAV_MAP).forEach(id=>{
      const el=document.getElementById(id);
      if(!el)return;
      if(el.offsetTop<=scrollMid) activeSection=id;
    });
    const activeNav=activeSection?SECTION_NAV_MAP[activeSection]:null;
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    if(activeNav){ const el=document.getElementById(activeNav); if(el)el.classList.add('active'); }
  },{passive:true});

  document.getElementById('navHome')?.classList.add('active');
}

// ═══════════════════════════════════════════════════════════════════
// SMOOTH SCROLL TO SECTION — FIXED: now truly smooth
// ═══════════════════════════════════════════════════════════════════
function scrollToSection(name){
  const sc=document.getElementById('scroll-container');
  const map={
    home:'section-home',
    about:'section-whatido',
    techstack:'section-techstack',
    projects:'section-projects',
    contact:'section-contact'
  };
  const id=map[name]||('section-'+name);
  const el=document.getElementById(id);
  if(!el||!sc)return;

  const targetScrollTop = el.offsetTop;
  const startScrollTop = sc.scrollTop;
  const distance = targetScrollTop - startScrollTop;
  const duration = Math.min(1200, Math.max(500, Math.abs(distance) * 0.6));
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    sc.scrollTop = startScrollTop + distance * ease;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ═══════════════════════════════════════════════════════════════════
// BIDIRECTIONAL SCROLL REVEAL
// ═══════════════════════════════════════════════════════════════════
function initScrollReveal(){
  const sc=document.getElementById('scroll-container');
  const sections = [...document.querySelectorAll('.scroll-section:not(.section-home)')];
  const innerEls = [...document.querySelectorAll('.ab-big-title,.ab-quote-wrap,.ab-globe-wrap,.ab-strength-card,.wid-cards-anim')];

  // Track section visibility state
  const sectionStates = new Map(); // id -> 'above' | 'visible' | 'below'
  sections.forEach(el => sectionStates.set(el.id, 'below'));

  function updateSections() {
    const viewTop = sc.scrollTop;
    const viewBottom = viewTop + sc.clientHeight;
    const threshold = sc.clientHeight * 0.15;

    sections.forEach(el => {
      const elTop = el.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      const prevState = sectionStates.get(el.id);

      // Determine new state
      let newState;
      if (elBottom < viewTop + threshold) {
        newState = 'above';
      } else if (elTop > viewBottom - threshold) {
        newState = 'below';
      } else {
        newState = 'visible';
      }

      if (newState === prevState) return;
      sectionStates.set(el.id, newState);

      // Remove all state classes first
      el.classList.remove('section-visible', 'section-exit-up', 'section-exit-down');

      if (newState === 'visible') {
        // Small delay so transition fires
        requestAnimationFrame(() => el.classList.add('section-visible'));
      } else if (newState === 'above') {
        // Was visible, now scrolled past upward — exit up
        el.classList.add('section-exit-up');
      } else if (newState === 'below') {
        // Was visible or above, now scrolled down past — reset to below
        el.classList.add('section-exit-down');
      }
    });
  }

  // Inner element intersection observer (bidirectional)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target;
      if (e.isIntersecting) {
        // Entering view
        if (el.classList.contains('ab-strength-card')) {
          const cards = [...document.querySelectorAll('.ab-strength-card')];
          const delay = cards.indexOf(el) * 110;
          setTimeout(() => {
            el.classList.remove('ab-exit');
            el.classList.add('ab-visible');
          }, delay);
        } else {
          el.classList.remove('ab-exit');
          requestAnimationFrame(() => el.classList.add('ab-visible'));
        }
      } else {
        // Leaving view — reset for re-animation
        el.classList.remove('ab-visible');
        el.classList.add('ab-exit');
        // After exit transition, fully reset
        setTimeout(() => {
          el.classList.remove('ab-exit');
        }, 500);
      }
    });
  }, { root: sc, threshold: 0.1 });

  innerEls.forEach(el => io.observe(el));

  // Listen to scroll for section bidirectional
  sc.addEventListener('scroll', updateSections, { passive: true });
  // Initial check
  setTimeout(updateSections, 100);
}

// ═══════════════════════════════════════════════════════════════════
// FULL PROJECTS OVERLAY
// ═══════════════════════════════════════════════════════════════════
function openProjectsFull(){
  const o=document.getElementById('page-projects-full'); if(!o)return;
  o.style.display='flex'; requestAnimationFrame(()=>o.classList.add('visible'));
  document.getElementById('proj-detail-view').style.display='none';
  document.getElementById('proj-grid-view').style.display='flex';
  initCardThumbs();
}
function closeProjectsFull(){
  const o=document.getElementById('page-projects-full'); if(!o)return;
  o.classList.remove('visible'); setTimeout(()=>o.style.display='none',400);
}
window.closeProjectsFull=closeProjectsFull;

function initCardThumbs(){
  PROJECTS.forEach((p,i)=>{
    if(!p.screenshot)return;
    const img=document.getElementById('pc-ti-'+i);
    const fb=document.getElementById('pc-fb-'+i); if(!img)return;
    img.className='pc-thumb-img'; img.src=p.screenshot;
    img.onload=()=>{img.classList.add('loaded');if(fb)fb.style.display='none';};
    img.onerror=()=>{img.style.display='none';};
  });
}

function openDetail(i){
  const p=PROJECTS[i];
  document.getElementById('pd-crumb-name').textContent=p.name;
  document.getElementById('pd-index').textContent='PROJECT '+String(i+1).padStart(2,'0');
  const parts=p.name.split(' ');
  document.getElementById('pd-name').innerHTML=p.nameStyle||(()=>{const w=p.name.split(' ');return w.length>1?w[0]+' <span style="color:var(--blue)">'+w.slice(1).join(' ')+'</span>':p.name;})();
  document.getElementById('pd-desc').textContent=p.desc;
  document.getElementById('pd-stack').innerHTML=p.stack.map(t=>{const url=TECH_LINKS[t];return url?`<a class="pd-stack-tag" href="${url}" target="_blank" rel="noopener">${t}</a>`:`<span class="pd-stack-tag">${t}</span>`;}).join('');
  document.getElementById('pd-demo').href=p.demo;
  document.getElementById('pd-github').href=p.github;
  const imgEl=document.getElementById('pd-screenshot-img'),ph=document.getElementById('pd-shot-placeholder');
  if(p.screenshot){imgEl.style.display='block';imgEl.classList.remove('loaded');imgEl.src=p.screenshot;imgEl.onload=()=>imgEl.classList.add('loaded');ph.style.display='none';imgEl.style.cursor='zoom-in';imgEl.onclick=()=>window.openScreenshot&&window.openScreenshot(p.screenshot);}
  else{imgEl.style.display='none';imgEl.src='';ph.style.display='flex';imgEl.onclick=null;}
  document.getElementById('proj-grid-view').style.display='none';
  const dv=document.getElementById('proj-detail-view');
  dv.style.display='flex'; dv.classList.remove('animating'); void dv.offsetWidth; dv.classList.add('animating');
  setTimeout(()=>dv.classList.remove('animating'),800); bindHover();
}
function closeDetail(){document.getElementById('proj-detail-view').style.display='none';document.getElementById('proj-grid-view').style.display='flex';}

// ═══════════════════════════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════════════════════════
window.openScreenshot=function(src){
  if(!src)return;
  let lb=document.getElementById('screenshotLightbox');
  if(!lb){
    lb=document.createElement('div'); lb.id='screenshotLightbox';
    lb.innerHTML=`<div class="slb-bg"></div><div class="slb-inner"><img id="slbImg" src=""><button class="slb-close" onclick="closeScreenshot()">&#10005;</button></div>`;
    document.body.appendChild(lb);
    lb.querySelector('.slb-bg').addEventListener('click',closeScreenshot);
    if(!isTouchDevice){const cl=lb.querySelector('.slb-close');cl.addEventListener('mouseenter',()=>curEl.classList.add('hover'));cl.addEventListener('mouseleave',()=>curEl.classList.remove('hover'));}
  }
  document.getElementById('slbImg').src=src;
  lb.classList.add('slb-open'); document.body.style.overflow='hidden';
};
window.closeScreenshot=function(){
  const lb=document.getElementById('screenshotLightbox'); if(lb)lb.classList.remove('slb-open');
  document.body.style.overflow='';
};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeScreenshot();});

// ═══════════════════════════════════════════════════════════════════
// GLOBE — 3D tech stack (unchanged)
// ═══════════════════════════════════════════════════════════════════
const SKILLS=[
  {name:'Java',color:'#f89820',url:'https://www.java.com',svg:'<path fill="#f89820" d="M12 2c1.3 1.1 2 2.2 2 3.4 0 1.4-.8 2.5-2.2 3.7-1.1.9-1.4 1.5-1.4 2.2 0 .8.5 1.4 1.7 2.1 1.9 1.1 2.9 2.3 2.9 4 0 2.8-2.4 4.6-6.1 4.6-1.8 0-3.5-.4-4.9-1.1l.9-2c1.2.6 2.6.9 4 .9 2.1 0 3.5-.8 3.5-2.1 0-.9-.5-1.5-1.9-2.3-1.8-1-2.7-2.1-2.7-3.7 0-1.4.6-2.6 2.2-3.9 1.1-.9 1.4-1.4 1.4-2.1 0-.6-.3-1.1-1.2-1.9z"/><path fill="#5382a1" d="M6 17.5c1.2.7 3.2 1.1 5.2 1.1 4 0 7.2-1.3 7.2-2.8 0-.5-.4-1-1.2-1.4.3.3.4.5.4.8 0 1.4-2.7 2.4-6.4 2.4-2.1 0-4-.3-5.2-1.1z"/>'},
  {name:'Spring Boot',color:'#6db33f',url:'https://spring.io/projects/spring-boot',svg:'<path fill="#6db33f" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.7 6.2c-.5 2.8-3.1 5.1-6 6-1.4.4-2.8.5-3.9.2 1.3-1.1 2.8-2.1 4.6-2.7.8-.3 1.7-.5 2.6-.6-.7-.4-1.6-.6-2.6-.6-1.5 0-3 .4-4.3 1.2 1-2.3 3.6-3.9 6.4-3.9 1.1 0 2.2.2 3.2.4z"/>'},
  {name:'React',color:'#61dafb',url:'https://react.dev',svg:'<path fill="#61dafb" d="M12 9.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5S13.4 9.5 12 9.5z"/><path fill="#61dafb" d="M12 3.5c-2.2 0-4.3.5-5.9 1.3C3.9 6 2.8 7.5 2.8 9.1c0 1.7 1.2 3.2 3.3 4.2 1.7.8 3.8 1.2 5.9 1.2s4.3-.4 5.9-1.2c2.1-1 3.3-2.5 3.3-4.2 0-1.6-1.1-3.1-3.3-4.3-1.6-.8-3.7-1.3-5.9-1.3zm0 2c3.7 0 7 1.4 7 3.6s-3.3 3.4-7 3.4-7-1.2-7-3.4 3.3-3.6 7-3.6z"/><path fill="#61dafb" d="M7.2 6.3c-1.1 1.9-1.9 4-2.2 5.9-.4 2.4-.1 4.4 1 5.5.8.8 1.9 1.1 3.2 1.1 1 0 2.2-.2 3.4-.7 1.9-.7 3.8-1.9 5.3-3.3 1.5-1.4 2.7-3.2 3.4-5 .8-2 .8-3.8-.2-4.8-.7-.8-1.8-1.1-3.1-1.1-1.1 0-2.3.3-3.6.8-1.9.8-3.7 1.9-5.2 3.6zm1.7 1.1c1.3-1.3 2.8-2.3 4.4-3 1-.4 1.9-.7 2.8-.7.8 0 1.4.2 1.7.5.8.8.2 2.7-.7 4.6-.8 1.7-2 3.3-3.4 4.5-1.3 1.3-2.9 2.4-4.5 3-1.9.8-3.8 1.2-4.5.5-.8-.8-.4-2.8.4-4.7.6-1.6 1.7-3.1 3-4.7z"/>'},
  {name:'MySQL',color:'#00758f',url:'https://www.mysql.com',svg:'<path fill="#00758f" d="M2 5.5C2 4.1 6.5 3 12 3s10 1.1 10 2.5v13c0 1.4-4.5 2.5-10 2.5S2 19.9 2 18.5v-13z"/><path fill="#f29111" d="M2 9c0 1.4 4.5 2.5 10 2.5S22 10.4 22 9"/><path fill="#f29111" d="M2 13c0 1.4 4.5 2.5 10 2.5S22 14.4 22 13"/><ellipse fill="#f29111" cx="12" cy="5.5" rx="10" ry="2.5"/>'},
  {name:'REST APIs',color:'#5bc8f5',url:'https://restfulapi.net',svg:'<rect x="3" y="5" width="18" height="14" rx="2" fill="#5bc8f5"/><path fill="#071018" d="M7 9h10v2H7zm0 4h7v2H7z"/>'},
  {name:'JWT',color:'#d63aff',url:'https://jwt.io',svg:'<circle cx="12" cy="6" r="2.5" fill="#d63aff"/><circle cx="6.5" cy="12" r="2.5" fill="#00c4cc"/><circle cx="17.5" cy="12" r="2.5" fill="#f7df1e"/><circle cx="12" cy="18" r="2.5" fill="#ff6b6b"/><path fill="none" stroke="#ffffff" stroke-width="1.2" d="M12 8.5v7M9 12h6"/>'},
  {name:'Redux',color:'#764abc',url:'https://redux.js.org',svg:'<path fill="#764abc" d="M16.6 15.1c.5.4.7.9.7 1.5 0 1.2-1 2.1-2.2 2.1-.8 0-1.5-.4-1.9-1.1l-2.4.2c-.5.9-1.4 1.5-2.4 1.5-1.6 0-2.8-1.3-2.8-2.8 0-1.2.8-2.3 2-2.7l.4-2.8C6.7 10.5 6 9.4 6 8.1 6 6.4 7.4 5 9.1 5c1.3 0 2.4.8 2.8 2l2.5.4c.5-.9 1.4-1.5 2.4-1.5 1.6 0 2.8 1.3 2.8 2.8 0 1.2-.8 2.3-1.9 2.7zm-7.3-8.4c-.8 0-1.5.6-1.5 1.5S8.5 9.7 9.3 9.7s1.5-.6 1.5-1.5-.7-1.5-1.5-1.5zm7.1.7c-.8 0-1.5.6-1.5 1.5s.6 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM8.5 14.5c-.8 0-1.5.6-1.5 1.5s.6 1.5 1.5 1.5S10 16.8 10 16s-.7-1.5-1.5-1.5zm6.4.5c-.8 0-1.5.6-1.5 1.5s.6 1.5 1.5 1.5 1.5-.6 1.5-1.5-.7-1.5-1.5-1.5z"/>'},
  {name:'Stripe',color:'#635bff',url:'https://stripe.com',svg:'<rect width="24" height="24" rx="4" fill="#635bff"/><path fill="#fff" d="M13.1 9.3c-1.2 0-2 .5-2 1.2 0 .8.6 1.1 1.9 1.4 1.8.4 3 .9 3 2.7 0 1.9-1.5 3.1-3.9 3.1-1 0-2-.2-2.9-.7v-2.1c.9.5 1.9.9 2.9.9.9 0 1.4-.3 1.4-.8 0-.6-.5-.8-1.7-1.1-1.9-.4-3.2-1-3.2-3 0-1.8 1.5-3.1 3.8-3.1.9 0 1.8.2 2.6.6v2c-.9-.4-1.4-.6-1.9-.6z"/>'},
  {name:'Python',color:'#3776ab',url:'https://www.python.org',svg:'<path fill="#3776ab" d="M12 2c-4.1 0-3.8 1.8-3.8 1.8v1.9H12v.6H6.8S4 6 4 9.6 6.4 13 6.4 13h1.4v-2S7.7 8.6 10.2 8.6H14c2.1 0 3.8-1.7 3.8-3.8V3.8S18.4 2 12 2z"/><circle cx="9.8" cy="4.2" r=".8" fill="#fff"/><path fill="#ffd43b" d="M12 22c4.1 0 3.8-1.8 3.8-1.8v-1.9H12v-.6h5.2s2.8-.3 2.8-3.9-2.4-3.4-2.4-3.4h-1.4v2s.1 2.4-2.4 2.4H10c-2.1 0-3.8 1.7-3.8 3.8v1.1S5.6 22 12 22z"/><circle cx="14.2" cy="19.8" r=".8" fill="#fff"/>'},
  {name:'Scikit-learn',color:'#f7931e',url:'https://scikit-learn.org',svg:'<circle cx="8" cy="9" r="4" fill="#f7931e"/><circle cx="16" cy="15" r="4" fill="#29abe2"/><path fill="none" stroke="#fff" stroke-width="1.5" d="M10.5 11.5l3 1"/>'},
  {name:'Pandas',color:'#150458',url:'https://pandas.pydata.org',svg:'<rect x="4" y="4" width="4" height="16" fill="#150458"/><rect x="10" y="4" width="4" height="16" fill="#e70488"/><rect x="16" y="4" width="4" height="16" fill="#150458"/>'},
  {name:'NLP',color:'#00b894',url:'https://www.nltk.org',svg:'<path fill="#00b894" d="M4 18V6h3l5 7V6h3v12h-3l-5-7v7z"/><path fill="#55efc4" d="M16 6h4v12h-4z"/>'},
  {name:'OpenCV',color:'#ff4d4f',url:'https://opencv.org',svg:'<circle cx="9" cy="8" r="4" fill="#ff4d4f"/><circle cx="15" cy="8" r="4" fill="#52c41a" fill-opacity=".9"/><circle cx="12" cy="14" r="4" fill="#1890ff" fill-opacity=".9"/>'},
  {name:'Deep Learning',color:'#ff6f00',url:'https://www.tensorflow.org',svg:'<path fill="#ff6f00" d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6L12 2zm0 3.1L7 7.9v8.2l5 2.8 5-2.8V7.9l-5-2.8z"/><path fill="#fff" d="M8.5 9H15v2H13v5h-2v-5H8.5z"/>'}
];

function initCareerLine(){
  const sc=document.getElementById('scroll-container');
  const section=document.getElementById('section-career');
  const fill=document.getElementById('careerLineFill');
  const dot=document.getElementById('careerLineDot');
  if(!sc||!section||!fill||!dot)return;
  const entries=[...section.querySelectorAll('.career-entry')];
  const titleEls=[...section.querySelectorAll('.career-title-1,.career-title-2,.career-title-ul')];

  // Set transitions
  [...titleEls,...entries].forEach(el=>{
    el.style.transition='opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)';
  });

  function update(){
    const secTop=section.offsetTop,secH=section.offsetHeight,viewH=sc.clientHeight,st=sc.scrollTop;
    const pct=Math.max(0,Math.min(1,(st-(secTop-viewH*.7))/((secTop+secH-viewH*.3)-(secTop-viewH*.7))));

    fill.style.height=(pct*100)+'%';
    dot.style.top=(pct*100)+'%';

    // Section is visible when pct between 0.03 and 0.97
    const visible=pct>0.03&&pct<0.97;

    titleEls.forEach((el,i)=>{
      el.style.transitionDelay=visible?(i*0.08)+'s':'0s';
      el.style.opacity=visible?'1':'0';
      el.style.transform=visible?'translateY(0)':'translateY(20px)';
    });

    entries.forEach((e,i)=>{
      e.style.transitionDelay=visible?(0.1+i*0.07)+'s':'0s';
      e.style.opacity=visible?'1':'0';
      e.style.transform=visible?'translateY(0)':'translateY(16px)';
    });
  }

  // Init hidden
  [...titleEls,...entries].forEach(el=>{ el.style.opacity='0'; el.style.transform='translateY(16px)'; });

  sc.addEventListener('scroll',update,{passive:true});
  update();
}

function initGlobe(){
  const canvas=document.getElementById('globeCanvas'); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  function setSize(){canvas.width=canvas.parentElement.clientWidth;canvas.height=canvas.parentElement.clientHeight;}
  setSize(); window.addEventListener('resize',setSize);
  const ICON_SIZE=128;
  function fibSphere(n){const pts=[],G=Math.PI*(3-Math.sqrt(5));for(let i=0;i<n;i++){const y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),t=G*i;pts.push([Math.cos(t)*r,y,Math.sin(t)*r]);}return pts;}
  function renderIcons(size){return SKILLS.map(sk=>{const oc=document.createElement('canvas');oc.width=oc.height=size;const c=oc.getContext('2d');const svgStr=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">${sk.svg}</svg>`;const blob=new Blob([svgStr],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const img=new Image();img.src=url;img.onload=()=>{c.drawImage(img,0,0,size,size);URL.revokeObjectURL(url);};return{img,name:sk.name,color:sk.color,url:sk.url};});}
  const icons=renderIcons(ICON_SIZE),pts=fibSphere(SKILLS.length);
  let rotY=0,rotX=0.3,isDragging=false,lastMX=0,lastMY=0,velX=0,velY=0.005,hoveredIdx=-1;
  canvas.addEventListener('mousedown',e=>{isDragging=true;lastMX=e.clientX;lastMY=e.clientY;velX=0;velY=0;});
  window.addEventListener('mouseup',()=>isDragging=false);
  window.addEventListener('mousemove',e=>{if(!isDragging)return;const dx=e.clientX-lastMX,dy=e.clientY-lastMY;velY=-dx*0.01;velX=-dy*0.01;rotY+=velY;rotX+=velX;lastMX=e.clientX;lastMY=e.clientY;});
  let lastTX=0,lastTY=0;
  canvas.addEventListener('touchstart',e=>{isDragging=true;lastTX=e.touches[0].clientX;lastTY=e.touches[0].clientY;velX=0;velY=0;});
  canvas.addEventListener('touchend',()=>isDragging=false);
  canvas.addEventListener('touchmove',e=>{const dx=e.touches[0].clientX-lastTX,dy=e.touches[0].clientY-lastTY;velY=-dx*0.012;velX=-dy*0.012;rotY+=velY;rotX+=velX;lastTX=e.touches[0].clientX;lastTY=e.touches[0].clientY;e.preventDefault();},{passive:false});
  canvas.addEventListener('mousemove',e=>{if(isDragging){hoveredIdx=-1;return;}const rect=canvas.getBoundingClientRect();const mx=e.clientX-rect.left,my=e.clientY-rect.top;hoveredIdx=-1;const cx=canvas.width/2,cy=canvas.height/2,R=Math.min(canvas.width,canvas.height)*0.48;pts.forEach(([x,y,z],i)=>{const{sx,sy,d}=proj(x,y,z);if(d<0)return;const px=cx+sx*R,py=cy+sy*R;if(Math.hypot(mx-px,my-py)<28){hoveredIdx=i;canvas.style.cursor='pointer';}});if(hoveredIdx===-1)canvas.style.cursor='grab';});
  canvas.addEventListener('click',e=>{if(hoveredIdx>=0&&SKILLS[hoveredIdx].url)window.open(SKILLS[hoveredIdx].url,'_blank');});
  function proj(x,y,z){const cy=Math.cos(rotY),sy=Math.sin(rotY);let x1=x*cy-z*sy,z1=x*sy+z*cy;const cx=Math.cos(rotX),sx2=Math.sin(rotX);let y1=y*cx-z1*sx2,z2=y*sx2+z1*cx;return{sx:x1,sy:y1,d:z2};}
  function drawGrid(cx,cy,R){ctx.save();for(let lat=0;lat<10;lat++){const phi=(lat/10)*Math.PI,yr=Math.cos(phi),xr=Math.sin(phi);ctx.beginPath();let first=true;for(let j=0;j<=80;j++){const t=(j/80)*Math.PI*2;const{sx,sy,d}=proj(xr*Math.cos(t),yr,xr*Math.sin(t));if(d<-0.05){first=true;ctx.stroke();ctx.beginPath();continue;}ctx.strokeStyle=`rgba(91,200,245,${0.08+(d+1)/2*0.1})`;ctx.lineWidth=0.7;const px=cx+sx*R,py=cy+sy*R;if(first){ctx.moveTo(px,py);first=false;}else ctx.lineTo(px,py);}ctx.stroke();}for(let lng=0;lng<16;lng++){const theta=(lng/16)*Math.PI*2;ctx.beginPath();let first=true;for(let j=0;j<=40;j++){const phi=(j/40)*Math.PI;const{sx,sy,d}=proj(Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta));if(d<-0.05){first=true;ctx.stroke();ctx.beginPath();continue;}ctx.strokeStyle=`rgba(91,200,245,${0.07+(d+1)/2*0.09})`;ctx.lineWidth=0.7;const px=cx+sx*R,py=cy+sy*R;if(first){ctx.moveTo(px,py);first=false;}else ctx.lineTo(px,py);}ctx.stroke();}const grd=ctx.createRadialGradient(cx,cy,R*0.85,cx,cy,R*1.15);grd.addColorStop(0,'rgba(91,200,245,0)');grd.addColorStop(0.5,'rgba(91,200,245,0.04)');grd.addColorStop(1,'rgba(91,200,245,0)');ctx.beginPath();ctx.arc(cx,cy,R*1.1,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();ctx.restore();}
  function drawSkills(cx,cy,R){const items=pts.map(([x,y,z],i)=>{const{sx,sy,d}=proj(x,y,z);return{sx,sy,d,i};}).sort((a,b)=>a.d-b.d);items.forEach(({sx,sy,d,i})=>{if(d<-0.1)return;const t=(d+1)/2;if(t<0.05)return;const alpha=Math.pow(t,1.2),scale=0.5+t*0.5;const px=cx+sx*R,py=cy+sy*R;const isHov=(i===hoveredIdx),iconR=R*0.085*scale*(isHov?1.25:1);ctx.save();ctx.globalAlpha=alpha;if(isHov){const grd=ctx.createRadialGradient(px,py,0,px,py,iconR*3);grd.addColorStop(0,'rgba(91,200,245,0.35)');grd.addColorStop(1,'rgba(91,200,245,0)');ctx.beginPath();ctx.arc(px,py,iconR*3,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();}ctx.beginPath();ctx.arc(px,py,iconR,0,Math.PI*2);ctx.fillStyle=SKILLS[i].color+'18';ctx.strokeStyle=isHov?'rgba(91,200,245,0.9)':SKILLS[i].color+'66';ctx.lineWidth=(isHov?2:1.2)*scale;ctx.fill();ctx.stroke();const ic=icons[i];if(ic.img.complete&&ic.img.naturalWidth){const s=iconR*1.35;ctx.drawImage(ic.img,px-s/2,py-s/2,s,s);}else{ctx.beginPath();ctx.arc(px,py,iconR*0.5,0,Math.PI*2);ctx.fillStyle=SKILLS[i].color;ctx.fill();}const fs=Math.max(9,R*0.048*scale*(isHov?1.1:1));ctx.fillStyle=isHov?'#5bc8f5':'#ffffff';ctx.font=`${isHov?'600':'400'} ${fs}px Outfit,sans-serif`;ctx.textAlign='center';ctx.textBaseline='top';ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=4;ctx.fillText(SKILLS[i].name,px,py+iconR+3*scale);ctx.shadowBlur=0;ctx.restore();});}
  let raf;
  function loop(){raf=requestAnimationFrame(loop);const w=canvas.width,h=canvas.height;if(!w||!h)return;ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*0.48;if(!isDragging){rotY+=velY;velY+=(-0.005-velY)*0.02;velX*=0.95;rotX+=velX;rotX+=(0.3-rotX)*0.01;}drawGrid(cx,cy,R);drawSkills(cx,cy,R);}
  loop();
}

// ═══════════════════════════════════════════════════════════════════
// START — called after all functions are defined
// ═══════════════════════════════════════════════════════════════════
initVideoLoader();
