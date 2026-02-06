document.addEventListener('DOMContentLoaded', () => {
    // Cargar Header y Footer
    fetch('assets/components/header.html').then(response => response.text()).then(data => {
        document.getElementById('header-container').innerHTML = data;
    });

    fetch('assets/components/footer.html').then(response => response.text()).then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });

    // Efecto de scroll para el header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255,255,255,0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = '#fff';
        }
    });
});