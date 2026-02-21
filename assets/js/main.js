document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CARGA DINÁMICA DE COMPONENTES ---

    // Cargar Header
    fetch('assets/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Una vez cargado, iniciamos funcionalidades:
            initHeaderScroll(); 
            highlightActiveLink(); 
            initMobileMenu(); 
        })
        .catch(err => console.error('Error cargando header:', err));

    // Cargar Footer
    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            
            // Una vez cargado, iniciamos funcionalidades del footer:
            updateCopyrightYear();
            initNewsletter(); // NUEVO: Iniciamos el script del newsletter aquí
        })
        .catch(err => console.error('Error cargando footer:', err));


    // --- 2. FUNCIONALIDADES PRINCIPALES ---

    // A. Efecto Scroll en Header
    function initHeaderScroll() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        if (window.scrollY > 50) header.classList.add('header-scrolled');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // B. Marcar Enlace Activo
    function highlightActiveLink() {
        let currentPath = window.location.pathname.split('/').pop();
        if (currentPath === '') currentPath = 'index.html';

        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');

                if (linkHref === currentPath || linkHref === './' + currentPath) {
                    link.classList.add('active');
                }
            });
        }, 50);
    }

    // C. Menú Móvil
    function initMobileMenu() {
        document.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.mobile-menu-toggle');
            if (toggleBtn) {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    navMenu.classList.toggle('active');
                    toggleBtn.classList.toggle('open');
                    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                    toggleBtn.setAttribute('aria-expanded', !isExpanded);
                }
            }
        });
    }

    // D. Año Automático en Footer
    function updateCopyrightYear() {
        const yearSpan = document.querySelector('.footer-bottom p');
        if (yearSpan) {
            const currentYear = new Date().getFullYear();
            if (!yearSpan.innerHTML.includes(currentYear)) {
                 // Lógica opcional
            }
        }
    }

    // E. FUNCIONALIDAD DEL NEWSLETTER / WHATSAPP COMMUNITY
    function initNewsletter() {
        const nlForm = document.getElementById('newsletter-form');
        
        if (nlForm) {
            nlForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Evita recarga de página
                
                const btn = document.getElementById('newsletter-btn');
                const successMsg = document.getElementById('nl-success-msg');
                const originalIcon = '<i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>';
                
                // 1. Estado de carga visual (Spinner)
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; 
                btn.disabled = true;

                // OPCIONAL: Si aún quieres guardar el correo en EmailJS antes de mandarlos a WhatsApp,
                // descomenta la línea de abajo y pon tu template ID. Si no, bórrala.
                // emailjs.sendForm('service_4xjpd4h', 'TU_TEMPLATE_AQUI', this);

                // 2. Simulamos una breve carga de 1 segundo para que se vea premium y redirigimos
                setTimeout(() => {
                    // Mostrar mensaje
                    successMsg.style.display = 'block';
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    
                    // --- AQUÍ PONES EL ENLACE DE TU COMUNIDAD DE WHATSAPP ---
                    const whatsappGroupUrl = "https://chat.whatsapp.com/TU_CODIGO_DE_INVITACION";
                    
                    // Abrir WhatsApp en una nueva pestaña
                    window.open(whatsappGroupUrl, '_blank');
                    
                    // Limpiar el formulario
                    nlForm.reset();
                    
                    // Volver el botón a la normalidad después de unos segundos
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                        btn.disabled = false;
                        successMsg.style.display = 'none';
                    }, 4000);
                    
                }, 1000); // 1000ms = 1 segundo de espera
            });
        }
    }


    // --- 3. ANIMACIONES AL SCROLL ---
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const selector = 'section, .room-card, .room-detail-card, .service-block, .exp-row, .stat-item, .contact-form-box, .services-img, .services-content, .info-bar, .legal-content, .contact-info';    
    const animatedElements = document.querySelectorAll(selector);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-up'); 
        observer.observe(el); 
    });

});

/* =========================================
   6. SEGURIDAD Y PREVENCIÓN
   ========================================= */

// Deshabilitar menú contextual
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloquear atajos de teclado de herramientas de desarrollador
document.onkeydown = function(e) {
    if(e.keyCode == 123 || 
      (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || 
      (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
}