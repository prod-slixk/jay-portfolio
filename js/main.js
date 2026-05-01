/* ===================================
   DEDSEC PORTFOLIO - MAIN.JS
   Typing Effect | Modal | Animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    init3DTilt();
    initHeroParallax();
    initTypingEffect();
    initMobileMenu();
    initModal();
    initSmoothScroll();
    initSkillBars();
    initStatCounters();
    initScrollAnimations();
    initHackerPopup();
    initHackerTerminal();
    initGlitchHover();
});

/* ===================================
   Hacker System Alert Popup
   =================================== */
function initHackerPopup() {
    const popup = document.getElementById('hackerPopup');
    const message = document.getElementById('popupMessage');
    const closeBtn = document.getElementById('popupClose');
    const btn1 = document.getElementById('popupBtn1');
    const btn2 = document.getElementById('popupBtn2');
    const btn3 = document.getElementById('popupBtn3');
    
    if (!popup || !message) return;
    
    const alerts = [
        { icon: '⚠', msg: 'SYSTEM BREACH DETECTED...' },
        { icon: '☠', msg: 'FIREWALL BYPASSED SUCCESSFULLY' },
        { icon: '⚡', msg: 'DOWNLOADING USER_DATA.exe...' },
        { icon: '🔓', msg: 'ACCESS GRANTED: LEVEL 5' },
        { icon: '📡', msg: 'ESTABLISHING SECURE CONNECTION...' },
        { icon: '💀', msg: 'WELCOME TO THE UNDERGROUND' },
        { icon: '🖥', msg: 'INJECTING PAYLOAD: 69% COMPLETE' },
        { icon: '⚙', msg: 'RECOMPILING MAINFRAME...' },
        { icon: '🔍', msg: 'SCANNING FOR VULNERABILITIES...' },
        { icon: '✓', msg: 'HACK COMPLETE. HAVE A NICE DAY.' }
    ];
    
    const responses = [
        'NICE TRY, HUMAN.',
        'ERROR: BUTTON NOT FOUND',
        'ACCESS DENIED... JUST KIDDING',
        'INITIATING SELF-DESTRUCT...',
        'LOL OKAY SURE',
        'THAT TICKLES',
        '*BEEP BOOP*',
        'PROCESSING REQUEST...',
        'DID YOU REALLY THINK THAT WOULD WORK?',
        'SYSTEM OVERRIDE ACCEPTED'
    ];
    
    let alertIndex = 0;
    let isHidden = false;
    
    // Cycle through alerts
    function cycleAlert() {
        if (isHidden) return;
        
        const alert = alerts[alertIndex];
        const iconEl = popup.querySelector('.popup-icon');
        
        // Glitch effect
        popup.style.transform = 'translateY(-50%) skewX(-2deg)';
        setTimeout(() => {
            popup.style.transform = 'translateY(-50%)';
            iconEl.textContent = alert.icon;
            message.textContent = alert.msg;
        }, 100);
        
        alertIndex = (alertIndex + 1) % alerts.length;
    }
    
    // Start cycling every 4 seconds
    setInterval(cycleAlert, 4000);
    
    // Button click responses
    function showResponse() {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.textContent = randomResponse;
        
        // Flash effect
        popup.style.background = '#ffffff';
        setTimeout(() => {
            popup.style.background = '';
        }, 100);
    }
    
    btn1.addEventListener('click', showResponse);
    btn2.addEventListener('click', showResponse);
    btn3.addEventListener('click', showResponse);
    
    // Close button - hide then show after delay
    closeBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        isHidden = true;
        
        // Respawn after 8 seconds
        setTimeout(() => {
            popup.classList.remove('hidden');
            isHidden = false;
            message.textContent = 'YOU CAN\'T GET RID OF ME THAT EASILY...';
        }, 8000);
    });
}

/* ===================================
   Typing Effect
   =================================== */
function initTypingEffect() {
    const roles = [
        'FRONTEND_DEVELOPER',
        'UI/UX_ENTHUSIAST',
        'CODE_ARTIST',
        'PROBLEM_SOLVER',
        'CREATIVE_HACKER'
    ];
    
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileContactBtn = document.getElementById('mobileContactBtn');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on contact button click
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

/* ===================================
   Contact Modal
   =================================== */
function initModal() {
    const openModalBtn = document.getElementById('openModal');
    const navContactBtn = document.getElementById('navContactBtn');
    const mobileContactBtn = document.getElementById('mobileContactBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = modalOverlay ? modalOverlay.querySelector('.modal') : null;
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (!modalOverlay || !modal) return;

    let lastFocusedElement = null;
    let removeFocusTrap = null;

    function trapFocus(modalEl) {
        const focusable = modalEl.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first.focus();

        function onKeyDown(e) {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        modalEl.addEventListener('keydown', onKeyDown);
        return () => modalEl.removeEventListener('keydown', onKeyDown);
    }

    // Open modal functions
    const openModal = () => {
        lastFocusedElement = document.activeElement;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        removeFocusTrap = trapFocus(modal);
    };

    const closeModal = () => {
        if (removeFocusTrap) { removeFocusTrap(); removeFocusTrap = null; }
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocusedElement) { lastFocusedElement.focus(); lastFocusedElement = null; }

        // Reset form after animation
        setTimeout(() => {
            if (contactForm) {
                contactForm.classList.remove('hidden');
                contactForm.reset();
            }
            if (successMessage) {
                successMessage.classList.remove('show');
            }
        }, 300);
    };
    
    // Event listeners
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (navContactBtn) navContactBtn.addEventListener('click', openModal);
    if (mobileContactBtn) mobileContactBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit');
            const submitText = submitBtn.querySelector('.submit-text');
            const errorMessage = document.getElementById('errorMessage');

            // Loading state
            submitBtn.disabled = true;
            submitText.textContent = 'SENDING_...';
            if (errorMessage) errorMessage.classList.remove('show');

            const formData = new FormData(contactForm);
            formData.append('access_key', '3bb8bd3a-8ee7-46a7-b7dc-5c2cacbcc0c1');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    contactForm.classList.add('hidden');
                    if (successMessage) successMessage.classList.add('show');
                    setTimeout(closeModal, 2500);
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch {
                submitText.textContent = 'SEND_MESSAGE';
                submitBtn.disabled = false;
                if (errorMessage) errorMessage.classList.add('show');
            }
        });
    }
}

/* ===================================
   Smooth Scroll
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ===================================
   Skill Bars Animation
   =================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
                observer.unobserve(bar);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

/* ===================================
   Stat Counter Animation
   =================================== */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count);
                animateCounter(element, target);
                observer.unobserve(element);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    
    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(fadeInOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'perspective(1200px) rotateX(8deg) translateY(50px) translateZ(-40px)';
        section.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(section);
    });

    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .section.visible {
            opacity: 1 !important;
            transform: perspective(1200px) rotateX(0deg) translateY(0) translateZ(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.05)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
}

/* ===================================
   Glitch Effect on Hover
   =================================== */
function initGlitchHover() {
    // Seed data-text once so CSS attr(data-text) is always ready
    const glitchElements = document.querySelectorAll('.project-title, .skill-name');

    glitchElements.forEach(el => {
        // Set once at init — textContent won't change after paint
        el.dataset.text = el.textContent;

        el.addEventListener('mouseenter', () => el.classList.add('glitch'));
        el.addEventListener('mouseleave', () => el.classList.remove('glitch'));
    });
}

/* ===================================
   Hacker Terminal Typing Effect
   =================================== */
function initHackerTerminal() {
    const typedElement = document.querySelector('.terminal-typed');
    if (!typedElement) return;
    
    const commands = [
        'cat /etc/passwd',
        'nmap -sV target.com',
        'ssh root@mainframe',
        'decrypt --all secrets.db',
        'sudo rm -rf /boring_websites',
        'ping -c 666 reality.exe',
        'whoami // LEGEND',
        'hack --target=the_matrix',
        'chmod 777 /dreams',
        'grep -r "talent" /jay',
        'curl https://hire.jay.dev',
        'echo "Hello, World!"',
        './exploit.sh --stealth',
        'traceroute success.com'
    ];
    
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function typeCommand() {
        const currentCmd = commands[cmdIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentCmd.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedElement.textContent = currentCmd.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80 + Math.random() * 50; // Random speed for realism
        }
        
        if (!isDeleting && charIndex === currentCmd.length) {
            // Pause at end
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
            typingSpeed = 800;
        }
        
        setTimeout(typeCommand, typingSpeed);
    }
    
    // Start typing after delay
    setTimeout(typeCommand, 1500);
}

/* ===================================
   Console Easter Egg
   =================================== */
console.log('%c[ DEDSEC ]', 'color: #ffffff; background: #000000; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c> System breach successful...', 'color: #808080; font-family: monospace;');
console.log('%c> Welcome to the underground.', 'color: #ffffff; font-family: monospace;');
console.log('%c> "Everything is connected"', 'color: #a0a0a0; font-style: italic; font-family: monospace;');

/* ===================================
   Three.js 3D Environment
   =================================== */
function initThreeScene() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const mobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.014);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 600);
    camera.position.set(0, 14, 45);
    camera.lookAt(0, 0, 0);

    // ── GRID FLOORS ──
    const grid1 = new THREE.GridHelper(400, 70, 0x252525, 0x131313);
    grid1.position.y = -7;
    scene.add(grid1);

    const grid2 = new THREE.GridHelper(800, 20, 0x181818, 0x0c0c0c);
    grid2.position.y = -7.1;
    scene.add(grid2);

    // ── PARTICLE FIELD ──
    const count = mobile ? 700 : 2200;
    const pPos = new Float32Array(count * 3);
    const pVel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 280;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 280;
        pVel[i]         = Math.random() * 0.012 + 0.003;
    }

    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pmat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: mobile ? 0.22 : 0.13,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(pgeo, pmat);
    scene.add(particles);

    // ── WIREFRAME NODES (data cubes / octahedra) ──
    const nodeCount = mobile ? 8 : 22;
    const nodeShapes = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.OctahedronGeometry(0.75),
        new THREE.TetrahedronGeometry(0.85),
        new THREE.IcosahedronGeometry(0.7)
    ];
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        const base = nodeShapes[Math.floor(Math.random() * nodeShapes.length)];
        const scale = Math.random() * 2.2 + 0.6;
        const edges = new THREE.EdgesGeometry(base);
        const mat = new THREE.LineBasicMaterial({
            color: 0x3a3a3a,
            transparent: true,
            opacity: Math.random() * 0.4 + 0.1
        });
        const node = new THREE.LineSegments(edges, mat);
        node.scale.setScalar(scale);
        node.position.set(
            (Math.random() - 0.5) * 140,
            Math.random() * 22 - 4,
            (Math.random() - 0.5) * 140
        );
        node.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        scene.add(node);
        nodes.push({
            mesh: node,
            rx: (Math.random() - 0.5) * 0.005,
            ry: (Math.random() - 0.5) * 0.007,
            floatAmp: Math.random() * 0.035 + 0.01,
            floatOff: Math.random() * Math.PI * 2,
            baseY: node.position.y
        });
    }

    // ── VERTICAL DATA STREAMS ──
    const streamCount = mobile ? 18 : 40;
    const streams = [];

    for (let i = 0; i < streamCount; i++) {
        const h = Math.random() * 28 + 6;
        const lgeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, h, 0)
        ]);
        const lmat = new THREE.LineBasicMaterial({
            color: 0x303030,
            transparent: true,
            opacity: 0.25
        });
        const line = new THREE.Line(lgeo, lmat);
        line.position.set(
            (Math.random() - 0.5) * 180,
            -7,
            (Math.random() - 0.5) * 180
        );
        scene.add(line);
        streams.push({ line, phase: Math.random() * Math.PI * 2 });
    }

    // ── HORIZONTAL SCAN RINGS ──
    const ringCount = mobile ? 3 : 6;
    const rings = [];

    for (let i = 0; i < ringCount; i++) {
        const r = Math.random() * 40 + 15;
        const rgeo = new THREE.RingGeometry(r, r + 0.08, 128);
        const rmat = new THREE.MeshBasicMaterial({
            color: 0x282828,
            transparent: true,
            opacity: Math.random() * 0.2 + 0.05,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(rgeo, rmat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = Math.random() * 10 - 5;
        scene.add(ring);
        rings.push({ mesh: ring, speed: (Math.random() - 0.5) * 0.001 });
    }

    // ── CAMERA STATE ──
    let camTargetY = 14;
    let tMouseX = 0, tMouseY = 0;
    let cMouseX = 0, cMouseY = 0;

    window.addEventListener('scroll', () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        camTargetY = 14 - ratio * 32;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        tMouseX = (e.clientX / window.innerWidth  - 0.5) * 14;
        tMouseY = (e.clientY / window.innerHeight - 0.5) * -7;
    }, { passive: true });

    // ── RENDER LOOP ──
    let t = 0;
    let rafId = null;

    function pauseRender() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    function resumeRender() { if (!rafId) render(); }

    document.addEventListener('visibilitychange', () => {
        document.hidden ? pauseRender() : resumeRender();
    });

    (function render() {
        rafId = requestAnimationFrame(render);
        t += 0.007;

        // Smooth camera
        cMouseX += (tMouseX - cMouseX) * 0.04;
        cMouseY += (tMouseY - cMouseY) * 0.04;
        camera.position.x  = cMouseX;
        camera.position.y += (camTargetY + cMouseY - camera.position.y) * 0.035;
        camera.lookAt(cMouseX * 0.25, camera.position.y - 9, 0);

        // Drift particles upward
        const pos = pgeo.attributes.position.array;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += pVel[i];
            if (pos[i * 3 + 1] > 45) pos[i * 3 + 1] = -45;
        }
        pgeo.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.00018;

        // Float + rotate nodes
        nodes.forEach(n => {
            n.mesh.rotation.x += n.rx;
            n.mesh.rotation.y += n.ry;
            n.mesh.position.y = n.baseY + Math.sin(t + n.floatOff) * n.floatAmp * 12;
        });

        // Pulse data streams
        streams.forEach(s => {
            s.line.material.opacity = 0.04 + 0.22 * Math.abs(Math.sin(t * 1.4 + s.phase));
        });

        // Rotate scan rings
        rings.forEach(r => {
            r.mesh.rotation.z += r.speed;
        });

        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });
}

/* ===================================
   3D Card Tilt
   =================================== */
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x  = e.clientX - rect.left;
            const y  = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -10;
            const rotY = ((x - cx) / cx) *  10;
            card.style.transition = 'transform 0.06s linear, box-shadow 0.06s linear';
            card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(14px)`;
            card.style.boxShadow  = `${-rotY * 1.5}px ${rotX * 1.5}px 30px rgba(255,255,255,0.06)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease';
            card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.boxShadow  = '';
        });
    });
}

/* ===================================
   Hero Depth Parallax
   =================================== */
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const ascii   = document.querySelector('.ascii-art');
    if (!hero || !content) return;

    let tX = 0, tY = 0, cX = 0, cY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        tX = (e.clientX - rect.left  - rect.width  / 2) * 0.018;
        tY = (e.clientY - rect.top   - rect.height / 2) * 0.012;
    });

    hero.addEventListener('mouseleave', () => { tX = 0; tY = 0; });

    (function loop() {
        cX += (tX - cX) * 0.055;
        cY += (tY - cY) * 0.055;
        content.style.transform = `perspective(900px) rotateX(${-cY}deg) rotateY(${cX}deg)`;
        if (ascii) ascii.style.transform = `translate(${cX * 7}px, ${cY * 7}px)`;
        requestAnimationFrame(loop);
    })();
}
