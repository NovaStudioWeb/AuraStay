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
            updateCopyrightYear();
        })
        .catch(err => console.error('Error cargando footer:', err));


    // --- 2. FUNCIONALIDADES ---

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
        // 1. Obtener el nombre del archivo actual de la URL
        let currentPath = window.location.pathname.split('/').pop();

        // 2. Si está vacío (estás en la raíz), asumir que es index.html
        if (currentPath === '') currentPath = 'index.html';

        // 3. Esperar un momento a que el Header se inyecte (importante por el fetch)
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                // Limpiamos clases previas por seguridad
                link.classList.remove('active');

                // Obtener el href del enlace
                const linkHref = link.getAttribute('href');

                // 4. Comparación flexible (funciona con "./index.html" o "index.html")
                if (linkHref === currentPath || linkHref === './' + currentPath) {
                    link.classList.add('active');
                }
            });
        }, 50); // Pequeño retraso de 50ms para asegurar que el DOM existe
    }

    // C. Menú Móvil
    function initMobileMenu() {
        // Usamos delegación de eventos por si el header tarda en cargar
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

    // D. Año Automático
    function updateCopyrightYear() {
        const yearSpan = document.querySelector('.footer-bottom p');
        if (yearSpan) {
            const currentYear = new Date().getFullYear();
            if (!yearSpan.innerHTML.includes(currentYear)) {
                 // Lógica opcional
            }
        }
    }

    // --- 3. ANIMACIONES AL SCROLL (CORREGIDO) ---
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // LISTA MAESTRA DE ELEMENTOS A ANIMAR
// LISTA MAESTRA ACTUALIZADA
    const selector = 'section, .room-card, .room-detail-card, .service-block, .exp-row, .stat-item, .contact-form-box, .services-img, .services-content, .info-bar, .legal-content, .contact-info';    
    const animatedElements = document.querySelectorAll(selector);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-up'); // Prepara el elemento (opacity: 0)
        observer.observe(el); // Empieza a vigilarlo
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