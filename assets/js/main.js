document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cargar Header con lógica de scroll integrada
    fetch('assets/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Inicializamos el scroll justo después de cargar el header
            initHeaderScroll();
        })
        .catch(err => console.error('Error cargando el header:', err));

    // 2. Cargar Footer
    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(err => console.error('Error cargando el footer:', err));

    // 3. Función para el efecto de scroll
    function initHeaderScroll() {
        const header = document.querySelector('.main-header');
        
        // Ejecutar una vez al cargar por si la página ya tiene scroll
        handleScroll(header);

        window.addEventListener('scroll', () => {
            handleScroll(header);
        });
    }

    function handleScroll(header) {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});