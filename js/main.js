/* ===================================
   DEDSEC PORTFOLIO - MAIN.JS
   Typing Effect | Modal | Animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
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

        // CSS class handles the skew — no inline transform writes
        popup.classList.add('is-glitching');
        setTimeout(() => {
            popup.classList.remove('is-glitching');
            iconEl.textContent  = alert.icon;
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

    // Time-based — consistent speed at any frame rate
    const animateCounter = (element, target) => {
        const duration  = 2000;
        const startTime = performance.now();

        function update(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const eased    = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else element.textContent = target;
        }

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    // Section reveal — CSS does all the visual work (.section / .section.is-visible in style.css)
    const sections = document.querySelectorAll('.section');
    const nav      = document.querySelector('.nav');

    const sectionObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // Nav scroll state — RAF-throttled, class-based (no inline style writes)
    let scrollRafId = null;
    window.addEventListener('scroll', () => {
        if (scrollRafId) return;
        scrollRafId = requestAnimationFrame(() => {
            nav.classList.toggle('is-scrolled', window.scrollY > 100);
            scrollRafId = null;
        });
    }, { passive: true });
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

/* Three.js environment removed — canvas and scene stripped */

/* ===================================
   3D Card Tilt
   =================================== */
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .stat-card');

    cards.forEach(card => {
        let rafId  = null;
        let rotX   = 0, rotY = 0;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Capture values (read phase — no layout thrash)
            rotX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -10;
            rotY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  10;

            // Batch write into next animation frame
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    card.style.transition = 'transform 0.06s linear, box-shadow 0.06s linear';
                    card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(14px)`;
                    card.style.boxShadow  = `${-rotY * 1.5}px ${rotX * 1.5}px 30px rgba(255,255,255,0.06)`;
                    rafId = null;
                });
            }
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease';
            card.style.transform  = '';
            card.style.boxShadow  = '';
        });
    });
}

/* ===================================
   Hero Depth Parallax
   =================================== */
function initHeroParallax() {
    const hero    = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const ascii   = document.querySelector('.ascii-art');
    if (!hero || !content) return;

    let tX = 0, tY = 0, cX = 0, cY = 0;
    let rafId = null;

    function loop() {
        cX += (tX - cX) * 0.055;
        cY += (tY - cY) * 0.055;

        content.style.transform = `perspective(900px) rotateX(${-cY}deg) rotateY(${cX}deg)`;
        if (ascii) ascii.style.transform = `translate(${cX * 7}px, ${cY * 7}px)`;

        // Stop loop once LERP has settled — restart on next mousemove
        const settled = Math.abs(tX - cX) < 0.001 && Math.abs(tY - cY) < 0.001;
        rafId = settled ? null : requestAnimationFrame(loop);
    }

    function startLoop() {
        if (!rafId) rafId = requestAnimationFrame(loop);
    }

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        tX = (e.clientX - rect.left  - rect.width  / 2) * 0.018;
        tY = (e.clientY - rect.top   - rect.height / 2) * 0.012;
        startLoop();
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
        tX = 0; tY = 0;
        startLoop(); // let LERP ease back to zero
    }, { passive: true });
}
