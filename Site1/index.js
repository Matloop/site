document.addEventListener('DOMContentLoaded', function() {
    // Animação de fade-in para elementos
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Toggle para a seção de experiência
    const experienciaToggle = document.querySelector('.experiencia-toggle');
    const experienciaConteudo = document.querySelector('.experiencia-conteudo');

    experienciaToggle.addEventListener('click', () => {
        experienciaToggle.classList.toggle('ativo');
        if (experienciaConteudo.style.display === 'block') {
            experienciaConteudo.style.display = 'none';
        } else {
            experienciaConteudo.style.display = 'block';
        }
    });

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Atualizar link ativo no menu
    const sections = document.querySelectorAll('.secao');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('ativo');
            }
        });
    });
});